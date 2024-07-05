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
      <div class="w-full flex justify-between">
        <div>
          <el-checkbox v-if="currentType === TabDataEnum.department" label="hah" value="hi">
            部门节点是否关联
          </el-checkbox>
        </div>
        <el-space>
          <el-button>取消</el-button>
          <el-button type="primary">确认选择</el-button>
        </el-space>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { SelectOrgInfoProps } from './type.ts';
import { ref, provide } from 'vue';
import { ShowTypeEnum, TabDataEnum } from './enum';
import MainContent from './mainContent.vue';
import { flattenDepartments } from './util';

const props = withDefaults(defineProps<SelectOrgInfoProps>(), {
  showType: ShowTypeEnum.dialog,
  width: 800
});

const emit = defineEmits<{
  (e: 'tabChange', type: TabDataEnum): void;
}>();

const dialogVisible = ref(props.showType === ShowTypeEnum.dialog);
// 部门索引信息表
const deptFlatData = flattenDepartments(props.deptData ? props.deptData?.children : []);
// 当前选中的tab
const currentType = ref<TabDataEnum>()
/**
 * tab 切换后的信息
 * @param type 
 */
const tabChange = (type: TabDataEnum) => {
  currentType.value = type
  emit('tabChange', type);
};


provide('propsData', props);
provide('deptFlatData', deptFlatData);
provide('tabChange', tabChange);
</script>