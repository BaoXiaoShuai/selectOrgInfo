<template>
  <div class="h-full flex-1">
    <div class="w-full px-px10 h-[50px] flex items-center">
      <span class="text-[12px]">已选：</span>
      <div class="text-[12px] flex-1">
        <el-tag class="mr-[5px]" closable size="small" type="info">
          人员：10
        </el-tag>
        <el-tag class="mr-[5px]" closable size="small" type="info">
          部门：10
        </el-tag>
        <el-tag closable size="small" type="info">
          角色：10
        </el-tag>
      </div>
      <el-button type="primary" text @click="clearData">
        清空
      </el-button>
    </div>
    <div class="w-full h-less50 overflow-x-hidden overflow-y-auto">
      <template v-for="item in listData" :key="item.id">
        <ListItem :data="item" isResultShow />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useResultListStore } from '../store/resultList'
import ListItem from '../listItem/index.vue';

// store
const resultListStore = useResultListStore();

const listData = computed(() => {
  console.log(resultListStore.resultList)
  return resultListStore.resultList
})

/**
 * 清楚方法
 */
const clearData = () => {
  resultListStore.$reset()
}

</script>