<template>
  <div class="h-full flex-1 border-r-solid border-r-[1px] border-[var(--el-card-border-color)]">
    <div class="w-full h-[50px] flex items-center px-[10px]">
      <el-input placeholder="请输入内容进行搜索" :prefix-icon="Search" />
    </div>
    <el-tabs class="h-less50 w-full [&>div:first-child]:px-[10px] [&>div:first-child]:m-0 [&>div:nth-child(2)]:h-less40">
      <el-tab-pane label="人员">人员</el-tab-pane> 
      <el-tab-pane label="部门">部门</el-tab-pane>
      <el-tab-pane label="角色">角色</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
</script>