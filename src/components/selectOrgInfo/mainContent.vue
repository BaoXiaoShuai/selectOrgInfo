<template>
  <div class="w-full h-[500px] border-solid border-[1px] border-[var(--el-border-color)] rounded-[4px] flex">
    <LeftContent />
    <RightContent/>
  </div>
</template>

<script setup lang="ts">
import LeftContent from './leftContent/index.vue'
import RightContent from './rightContent/index.vue'
</script>