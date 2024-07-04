<template>
  <div class="w-full h-[30px] px-px10 flex items-center">
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="(item, index) in data" :key="item.id" >
        <el-breadcrumb-item @click="itemClick(item, index)" class="text-[12px]">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { DeptDataType } from '../type';
import { computed } from 'vue'

const props = defineProps<{
  data: Array<DeptDataType>;
}>()

const emit = defineEmits<{
  (e: 'update:data', data: Array<DeptDataType>): void,
  (e: 'itemClick', data: DeptDataType): void
}>()

const data = computed({
  get: () => props.data,
  set: (value: Array<DeptDataType>) => emit('update:data', value)
});

const itemClick = (item: DeptDataType, index: number) => {
  data.value.splice(index + 1, data.value.length - index);
  emit('itemClick', item);
};

</script>