<template>
  <div class="h-full flex-1">
    <template v-if="!listData.length">
      <EmptyPanel />
    </template>
    <template v-else>
      <div class="w-full px-px10 h-[50px] flex items-center">
        <span class="text-[12px]">已选：</span>
        <div class="text-[12px] flex-1">
          <template v-for="item in dataCountsArr" :key="item.type">
            <el-tag @close="deleteData(item.type)" v-if="item.count > 0" class="mr-[5px]" closable size="small"
              type="info">
              {{ item?.label }} {{ item?.count }}
            </el-tag>
          </template>
        </div>
        <el-button type="primary" text @click="clearData">
          清空
        </el-button>
      </div>
      <div class="w-full h-less50 overflow-hidden">
        <RecycleScroller :style="{ height: '100%' }" :items="listData" :item-size="50" key-field="id" v-slot="{ item }">
          <ListItem :data="item" isResultShow />
        </RecycleScroller>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useResultListStore } from '../store/resultList';
import ListItem from '../listItem/index.vue';
import { SelectOrgInfoProps, ResultListType } from '../type.ts';
import EmptyPanel from '../common/empty.vue';
import { TabDataEnum } from '../enum';
// 虚拟列表组件
import { RecycleScroller } from 'vue-virtual-scroller';

// 整体的 props 数据
const propsData = inject<SelectOrgInfoProps>('propsData');
// store
const resultListStore = useResultListStore();
// dataChange 
const injectDataChange = inject<((data: Array<ResultListType>) => void)>('dataChange');

// 当前列表数据
const listData = computed(() => {
  // 选择的数据回调
  injectDataChange?.(resultListStore.resultList);
  return resultListStore.resultList;
});
// 已经选择的数据统计
const dataCountsArr = computed(() => {
  return propsData?.tabData?.map(item => {
    return {
      ...item,
      count: resultListStore.resultList.filter(initem => initem.dataType === item.type).length
    };
  });
});

/**
 * 清除方法
 */
const clearData = () => {
  resultListStore.$reset();
};

/**
 * 根据类型来删除数据
 * @param type 
 */
const deleteData = (type: TabDataEnum) => {
  resultListStore.removeResultListItemByType(type);
}

</script>