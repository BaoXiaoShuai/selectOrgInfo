<template>
  <div class="flex-1 px-px10 flex flex-col justify-center">
    <div class="w-full">
      {{ data.name }}
    </div>
    <div v-if="data.isDept && tabData === TabDataEnum.staff"
      class="w-full text-[12px] text-[var(--el-color-info-light-3)]">
      {{ data.allStaffCount }}人
    </div>
    <div v-if="data.isStaff && tabData === TabDataEnum.staff"
      class="w-full text-[12px] text-[var(--el-color-info-light-3)]">
      {{ data.deptNames?.join('、') }}人
    </div>
  </div>
</template>

<script setup lang="ts">
import { TabDataEnum } from '../enum';
import { ListItemProps } from './type.ts';

defineProps<ListItemProps>();
</script>