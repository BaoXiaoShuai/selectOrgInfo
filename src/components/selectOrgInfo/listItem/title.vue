<template>
  <div class="flex-1 px-px10 flex flex-col justify-center">
    <div class="w-full">
      {{ data.name }}
    </div>
    <div v-if="data.isDept && tabData === TabDataEnum.staff "
      class="w-full text-[12px] text-[var(--el-color-info-light-3)]">
      {{ deptSelectStaffCountStr }} {{ data.allStaffCount }}人
    </div>
    <div v-if="(data.isStaff && tabData === TabDataEnum.staff) || isResultShow"
      class="w-full text-[12px] text-[var(--el-color-info-light-3)]">
      {{ data.deptNames?.join('、') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { TabDataEnum } from '../enum';
import { ListItemProps } from './type.ts';
import { computed } from 'vue'
import { useResultListStore } from '../store/resultList';
import { compareData } from '../util'
// store
const resultListStore = useResultListStore();

const props = defineProps<ListItemProps>();

// 显示已经选择的部门人数信息
const deptSelectStaffCountStr = computed(() => {
  const count = compareData(props.data.allStaffIds, resultListStore.resultIds)
  if(count <= 0) return ''
  return compareData(props.data.allStaffIds, resultListStore.resultIds) + ' / ';
})


</script>