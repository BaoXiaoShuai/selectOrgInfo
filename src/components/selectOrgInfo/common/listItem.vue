<template>
  <div class="w-full h-[50px] flex items-center hover:bg-[var(--el-fill-color)] px-px10 text-[14px] cursor-pointer [&>div]:h-full [&>div]:flex [&>div]:items-center">
    <div class="w-[30px] justify-center">
      <el-checkbox />
    </div>
    <div class="w-[30px] !h-[30px] rounded-full justify-center bg-[var(--el-color-primary-light-8)] ">
      <el-icon size="20" color="var(--el-color-primary)">
        <ChromeFilled />
      </el-icon>
    </div>
    <div class="flex-1 px-px10">
      {{ data.name }}
    </div>
    <div class="w-[30px] justify-center">
      <el-icon><ArrowRight /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ChromeFilled } from '@element-plus/icons-vue'
interface Props {
  data: {
    id: string
    name: string
    [key: string]: any
  }
}
defineProps<Props>()
</script>