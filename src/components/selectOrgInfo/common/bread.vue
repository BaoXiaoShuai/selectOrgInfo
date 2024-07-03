<template>
  <div class="w-full h-[30px] px-px10 flex items-center">
    <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item class="text-[12px]">总公司</el-breadcrumb-item>
    <el-breadcrumb-item class="text-[12px]">政企客户事业部</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
</script>