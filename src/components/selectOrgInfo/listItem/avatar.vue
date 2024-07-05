<template>
  <el-avatar v-if="data.isDept" :class="primaryClass" :size="size"
    :icon="ElementPlus" />
  <el-avatar :size="size" v-else-if="data.isStaff" :icon="UserFilled" />
  <el-avatar v-else :size="size" :class="primaryClass" :icon="Opportunity" />
</template>

<script setup lang="ts">
import { ElementPlus, UserFilled, Opportunity } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { ListItemProps } from './type.ts'

defineProps<ListItemProps>();
const size = ref<number>(30);
const primaryClass = ref<string>('!bg-[var(--el-color-primary-light-8)] !text-[var(--el-color-primary)]');
</script>