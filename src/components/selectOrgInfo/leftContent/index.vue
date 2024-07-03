<template>
  <div class="h-full flex-1 border-r-solid border-r-[1px] border-[var(--el-border-color)]">
    <div class="w-full h-[50px] flex items-center px-px10">
      <el-input placeholder="请输入内容进行搜索" :prefix-icon="Search" />
    </div>
    <el-tabs class="h-less50 w-full [&>div:first-child]:px-px10 [&>div:first-child]:m-0 [&>div:nth-child(2)]:h-less40">
      <template v-for="item in propsData?.tabData" :key="item.type">
        <el-tab-pane class="h-full w-full" :label="item.label">
          <template v-if="item.type === TabDataEnum.staff">
            <StaffPanel />
          </template>
          <template v-else-if="item.type === TabDataEnum.department">
            <DeptPanel />
          </template>
          <template v-else-if="item.type === TabDataEnum.role">
            <RolePanel />
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { SelectOrgInfoProps } from '../type.ts'
import { TabDataEnum } from '../enum'
import StaffPanel from './staff.vue'
import DeptPanel from './dept.vue'
import RolePanel from './role.vue'

const propsData = inject<SelectOrgInfoProps>('propsData')

</script>