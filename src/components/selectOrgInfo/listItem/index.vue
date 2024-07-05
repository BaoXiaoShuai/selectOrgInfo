<template>
  <div @click="itemClick"
    class="w-full h-[50px] flex items-center hover:bg-[var(--el-fill-color)] px-px10 text-[14px] cursor-pointer [&>div]:h-full [&>div]:flex [&>div]:items-center">
    <div v-if="tabData === TabDataEnum.staff && !data.isDept" class="w-[30px] justify-center">
      <el-checkbox />
    </div>
    <Avatar :data="data" :tab-data="tabData" />
    <Title :data="data" :tab-data="tabData" />
    <Operate :data="data" :tab-data="tabData" @item-click="$emit('itemClick', data)" />
  </div>
</template>

<script setup lang="ts">
import { TabDataEnum } from '../enum';
import { DeptDataType, StaffDataType } from '../type';
import Avatar from './avatar.vue';
import Title from './title.vue';
import Operate from './operate.vue';
import { ListItemProps } from './type.ts';

const props = defineProps<ListItemProps>();
const emit = defineEmits<{
  (e: 'itemClick', data: DeptDataType | StaffDataType): void;
}>();

const itemClick = () => {
  if (props.data.isStaff || props.tabData !== TabDataEnum.staff) return;
  emit('itemClick', props.data);
}


</script>