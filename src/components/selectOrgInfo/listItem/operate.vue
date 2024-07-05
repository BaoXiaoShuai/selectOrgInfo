<template>
  <div v-if="data.isDept && tabData === TabDataEnum.staff" class="w-[30px] justify-center">
    <el-icon>
      <ArrowRight />
    </el-icon>
  </div>
  <div v-if="tabData !== TabDataEnum.staff && data?.children?.length" class="justify-center">
    <el-tag @click.stop="$emit('itemClick')" type="primary">
      下级
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { TabDataEnum } from '../enum';
import { ListItemProps } from './type.ts';

defineProps<ListItemProps>();

const emit = defineEmits<{
  (e: 'itemClick'): void;
}>();

</script>