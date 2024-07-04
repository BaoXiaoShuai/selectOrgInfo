<template>
  <div class="w-full h-full ">
    <BreadInfo />
    <div class="w-full h-less30 overflow-x-hidden overflow-y-auto">
      <template v-for="item in currentListData" :key="item.id">
        <ListItem @item-click="itemClick" :data="item" :tab-data="TabDataEnum.staff" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { DeptDataType, SelectOrgInfoProps, StaffDataType } from '../type.ts'
import ListItem from '../common/listItem.vue'
import BreadInfo from '../common/bread.vue';
import { makeListData } from '../util/index.ts'
import { TabDataEnum } from '../enum';
// 整体的 props 数据
const propsData = inject<SelectOrgInfoProps>('propsData')
const deptFlatData = inject<Array<DeptDataType>>('deptFlatData')
const currentListData = ref<Array<DeptDataType & StaffDataType>>([])

onMounted(() => {
  // 组装当前列表的数据
  currentListData.value = makeListData(propsData?.deptData?.id, propsData?.deptData?.children, propsData?.staffData, deptFlatData)
})

const itemClick = (itemData: DeptDataType | StaffDataType) => {
  console.log(itemData)
  currentListData.value = makeListData(itemData.id, itemData.children, propsData?.staffData, deptFlatData)
}

</script>