<template>
  <el-dialog v-model="dialogVisible" :title="props.title || '选择组织'" :width="(props.width + 32) + 'px'"
    v-if="props.showType === ShowTypeEnum.dialog">
    <MainContent />
  </el-dialog>
  <el-card size="small" v-else>
    <template #header>
      <div class="card-header">
        <span>{{ props.title || '选择组织' }}</span>
      </div>
    </template>
    <MainContent />
    <template #footer>
      <div class="w-full flex justify-between items-center">
        <div>
          <label class="text-[14px]" v-if="currentType === TabDataEnum.department && props.multiple">
            按住 option 键可快速选取子级
          </label>
        </div>
        <el-space>
          <el-button @click="cancelSelect">取消</el-button>
          <el-button @click="confirmSelect" type="primary">确认选择</el-button>
        </el-space>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { SelectOrgInfoProps, DeptDataType, ResultEntityType, RoleDataType, ResultListType } from './type.ts';
import { ref, provide, onMounted } from 'vue';
import { ShowTypeEnum, TabDataEnum } from './enum';
import MainContent from './mainContent.vue';
import { flattenDepartments, serializeStaffData, flattenRoles } from './util';
import { useResultListStore } from './store/resultList';

// store
const resultListStore = useResultListStore();

const props = withDefaults(defineProps<SelectOrgInfoProps>(), {
  showType: ShowTypeEnum.dialog,
  width: 800
});


const emit = defineEmits<{
  (e: 'tabChange', type: TabDataEnum): void;
  (e: 'dataChange', data: ResultEntityType): void;
  (e: 'confirm', data: {
    currentType: TabDataEnum,
    data: ResultEntityType;
  }): void;
  (e: 'cancel'): void;
}>();

const dialogVisible = ref(props.showType === ShowTypeEnum.dialog);
// 部门索引信息表
const deptFlatMap = flattenDepartments(props.deptData ? props.deptData?.children : []);
// 角色索引信息表
const roleFlatMap = flattenRoles(props.roleData ? props.roleData?.children : []);
// 当前选中的tab
const currentType = ref<TabDataEnum>();
// 当前选中的数据信息
const currentSelectData = ref<ResultEntityType>();

/**
 * tab 切换后的信息
 * @param type 
 */
const tabChange = (type: TabDataEnum) => {
  currentType.value = type;
  emit('tabChange', type);
};

/**
 * 数据的选择回调
 * @param data 
 */
const dataChange = (data: Array<ResultListType>) => {
  currentSelectData.value = {
    all: data,
    [TabDataEnum.staff]: data.filter(item => item.dataType === TabDataEnum.staff),
    [TabDataEnum.department]: data.filter(item => item.dataType === TabDataEnum.department),
    [TabDataEnum.role]: data.filter(item => item.dataType === TabDataEnum.role)
  };
  emit('dataChange', currentSelectData.value);
};

/**
 * 确认
 */
const confirmSelect = () => {
  const info: any = {
    currentType: currentType.value,
    data: currentSelectData.value
  };
  emit('confirm', info);
};


/**
 * 取消
 */
const cancelSelect = () => {
  emit('cancel');
};

// mounted 是否执行，做个兜底
const hasMounted = ref<boolean>(false);
/**
 * 初始化
 */
onMounted(() => {
  // 防止多次执行
  if (!hasMounted.value) {
    hasMounted.value = true;
    let result: Array<ResultListType> = [];
    props?.tabData?.forEach(item => {
      // 如果是有 checklist 的原数据，那么就直接进行数据处理
      if (item.checkIds?.length) {
        // 员工
        if (item.type === TabDataEnum.staff) {
          const checkList = props?.staffData?.filter(inItem => item.checkIds?.includes(inItem.id));
          result = result.concat(serializeStaffData(checkList, deptFlatMap));
        }
        // 部门
        if (item.type === TabDataEnum.department) {
          item.checkIds.forEach(id => {
            result.push(deptFlatMap?.get(id) as DeptDataType);
          });
        }
        // 角色
        else if (item.type === TabDataEnum.role) {
          // 角色只有两级，这里做个双层循环的查找
          item.checkIds.forEach(id => {
            result.push(roleFlatMap?.get(id) as RoleDataType);
          });
        }
      }
    });
    resultListStore.pushResultList(result, props?.multiple);
  }
});

provide('propsData', props);
provide('deptFlatMap', deptFlatMap);
provide('roleFlatMap', roleFlatMap);
provide('tabChange', tabChange);
provide('dataChange', dataChange);
</script>