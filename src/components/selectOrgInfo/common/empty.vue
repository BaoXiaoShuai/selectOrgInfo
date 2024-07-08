<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-empty class="m-0 !p-0" :image-size="size" :description="text" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ text?: string, size?: number }>(), {
  text: '暂无数据',
  size: 100
})
</script>