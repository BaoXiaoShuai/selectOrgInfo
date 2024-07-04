<template>
  <el-dialog v-model="dialogVisible" :title="props.title || '选择组织'" width="800"
    v-if="props.showType === ShowTypeEnum.dialog">
    <MainContent />
  </el-dialog>
  <el-card size="small" v-else style="width: 800px">
    <template #header>
      <div class="card-header">
        <span>{{ props.title || '选择组织' }}</span>
      </div>
    </template>
    <MainContent/>
    <template #footer>
      <div class="w-full flex justify-between">
        <div></div>
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
import { ShowTypeEnum } from './enum';
import MainContent from './mainContent.vue';
import { flattenDepartments } from './util'

const props = withDefaults(defineProps<SelectOrgInfoProps>(), {
  showType: ShowTypeEnum.dialog
});

const dialogVisible = ref(props.showType === ShowTypeEnum.dialog)
// 部门索引信息表
const deptFlatData = flattenDepartments(props.deptData ? props.deptData?.children: [])
console.log(deptFlatData)
console.log(props)
provide('propsData', props)
provide('deptFlatData', deptFlatData)
</script>