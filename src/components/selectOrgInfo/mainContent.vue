<template>
  <div class="w-full h-[500px] border-solid border-[1px] border-[var(--el-card-border-color)] rounded-[var(--el-card-border-radius)] flex">
    <LeftContent />
    <RightContent />
  </div>
</template>

<script setup lang="ts">
import LeftContent from './leftContent/index.vue';
import RightContent from './rightContent/index.vue';
</script>