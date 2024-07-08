<template>
  <div class="w-full h-full ">
    <BreadInfo v-model:data="breadDataList" @itemClick="changeListData" />
    <div v-if="showMultiple" class="w-full px-px10 !h-[25px]">
      <!-- <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"> -->
      <el-checkbox v-model="isSelectedAll" :indeterminate="isIndeterminate"
        @change="selectAll"
        class="!h-[25px] flex items-center">全选</el-checkbox>
    </div>
    <div class="w-full h-less30 overflow-x-hidden overflow-y-auto"
      :class="{ 'flex justify-center items-center': !currentListData.length, '!h-less55': showMultiple }">
      <template v-for="item in currentListData" :key="item.id">
        <ListItem @item-click="changeListData" :data="item" :tab-data="type" @selectedCallback="pushCheckData"
          @selectData="insetResultData" />
      </template>
      <EmptyPanel v-if="!currentListData.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed } from 'vue';
import { DeptDataType, RoleDataType, SelectOrgInfoProps, StaffDataType } from '../type.ts';
import ListItem from '../listItem/index.vue';
import BreadInfo from '../common/bread.vue';
import { makeListData, serializeStaffData } from '../util/index.ts';
import { TabDataEnum } from '../enum';
import EmptyPanel from '../common/empty.vue';
import { SelectedCallbackType } from '../listItem/index.vue';
import { useResultListStore } from '../store/resultList';
// store
const resultListStore = useResultListStore();

interface IProps {
  type: TabDataEnum;
}

/**
 * 参数信息
 */
const currentProps = withDefaults(defineProps<IProps>(), {
  type: TabDataEnum.staff
});

// 整体的 props 数据
const propsData = inject<SelectOrgInfoProps>('propsData');
// 偏平化的部门数据
const deptFlatMap = inject<Map<string, DeptDataType>>('deptFlatMap');
// 当前列表数据信息
const currentListData = ref<Array<DeptDataType | StaffDataType | RoleDataType>>([]);
// 面包屑数据信息
const breadDataList = ref<Array<DeptDataType>>([]);
// 是否显示多选操作
const showMultiple = computed(() => {
  if (!currentListData.value.length) return false;
  // 员工首页不展示多选
  // 因为在此基础上，点击部门选择时会把所有的子级员工都选中
  // 所有在此优化为员工首页不允许进行全部选择的操作
  if (currentProps.type === TabDataEnum.staff) {
    return breadDataList.value.length > 1 && propsData?.multiple;
  }
  return propsData?.multiple;
});
// 子级给返回的选中状态
const itemsCheckMap = ref<Map<string, SelectedCallbackType>>(new Map());
const pushCheckData = (data: SelectedCallbackType) => {
  itemsCheckMap.value.set(data.id, data);
};

// 是否全选
const isSelectedAll = computed(() => {
  return Array.from(itemsCheckMap.value.values()).every(item => item.isSelected);
});
// 是否半选
const isIndeterminate = computed(() => {
  return Array.from(itemsCheckMap.value.values()).some(item => item.isSelected) && !isSelectedAll.value;
});

/**
 * 组装当前列表的数据
 */
const handleCurrentListData = (id: string = '', listData: Array<DeptDataType | RoleDataType> = []) => {
  currentListData.value = makeListData(id, currentProps.type, listData, propsData?.staffData, deptFlatMap);
  itemsCheckMap.value.clear();
};

/**
 * 组装面包屑数据
 * @param data 
 */
const handleBreadDataList = (data: DeptDataType | RoleDataType) => {
  breadDataList.value.push(data);
};

/**
 * 初始化
 */
onMounted(() => {
  // 处理不同 tab 下的数据结构
  if (currentProps.type === TabDataEnum.role) {
    // 角色tab 数据
    handleCurrentListData(propsData?.roleData?.id, propsData?.roleData?.children);
    propsData?.roleData && handleBreadDataList(propsData?.roleData);
  } else if (currentProps.type === TabDataEnum.department) {
    // 部门tab 数据
    let _deptData = propsData?.deptData;
    _deptData = {
      id: 'allCompany',
      name: '公司',
      children: propsData?.deptData && [propsData?.deptData]
    };
    _deptData && handleBreadDataList(_deptData);
    if (_deptData?.children?.length === 1) {
      handleBreadDataList(_deptData?.children[0]);
      handleCurrentListData(_deptData?.children[0].id, _deptData?.children[0].children);
    }
  } else {
    // 人员tab 数据
    handleCurrentListData(propsData?.deptData?.id, propsData?.deptData?.children);
    propsData?.deptData && handleBreadDataList(propsData?.deptData);
  }
});

/**
 * 处理当前列表数据
 */
const changeListData = (itemData: DeptDataType | StaffDataType) => {
  handleCurrentListData(itemData.id, itemData.children);
  if (breadDataList.value.findIndex(item => item.id === itemData.id) == -1) {
    handleBreadDataList(itemData);
  }
};

/**
 * 往结果集合里增加数据
 */
const insetResultData = (data: DeptDataType | StaffDataType | RoleDataType, isIndeterminate: boolean) => {
  if (data.isDept && currentProps.type === TabDataEnum.staff && propsData?.multiple) {
    resultListStore.pushResultList(serializeStaffData(data.allStaffList, deptFlatMap), propsData?.multiple || false, isIndeterminate);
  } else {
    resultListStore.pushResultList([data], propsData?.multiple || false, isIndeterminate);
  }
};

/**
 * 全选操作
 */
const selectAll = () => {
  currentListData.value.forEach(item => {
    insetResultData(item, isIndeterminate.value);
  });
};

</script>