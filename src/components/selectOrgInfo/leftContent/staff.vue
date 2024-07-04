<template>
  <div class="w-full h-full ">
    <BreadInfo v-model:data="breadDataList" @itemClick="changeListData" />
    <div class="w-full h-less30 overflow-x-hidden overflow-y-auto">
      <template v-for="item in currentListData" :key="item.id">
        <ListItem @item-click="changeListData" :data="item" :tab-data="TabDataEnum.staff" />
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
// 当前列表数据信息
const currentListData = ref<Array<DeptDataType & StaffDataType>>([])
// 面包屑数据信息
const breadDataList = ref<Array<DeptDataType>>([])

/**
 * 组装当前列表的数据
 */
const handleCurrentListData = (id: string = '', deptData: Array<DeptDataType> = []) => {
  currentListData.value = makeListData(id, deptData, propsData?.staffData, deptFlatData)
}

/**
 * 组装面包屑数据
 * @param data 
 */
const handleBreadDataList = (data: DeptDataType) => {
  breadDataList.value.push(data)
}

onMounted(() => {
  // 组装当前列表的数据
  handleCurrentListData(propsData?.deptData?.id, propsData?.deptData?.children)
  propsData?.deptData && handleBreadDataList(propsData?.deptData)
})

const changeListData = (itemData: DeptDataType | StaffDataType) => {
  console.log(itemData)
  handleCurrentListData(itemData.id, itemData.children)
  if(breadDataList.value.findIndex(item => item.id === itemData.id) == -1) {
    handleBreadDataList(itemData)
  }
}

</script>