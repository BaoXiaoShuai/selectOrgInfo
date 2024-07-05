<template>
  <div class="w-full h-full ">
    <BreadInfo v-model:data="breadDataList" @itemClick="changeListData" />
    <div class="w-full h-less30 overflow-x-hidden overflow-y-auto"
      :class="{ 'flex justify-center items-center': !currentListData.length }">
      <template v-for="item in currentListData" :key="item.id">
        <ListItem @item-click="changeListData" :data="item" :tab-data="type" />
      </template>
      <el-empty class="m-0 !p-0" v-if="!currentListData.length" :image-size="100" description="暂无数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { DeptDataType, RoleDataType, SelectOrgInfoProps, StaffDataType } from '../type.ts';
import ListItem from '../listItem/index.vue';
import BreadInfo from '../common/bread.vue';
import { makeListData } from '../util/index.ts';
import { TabDataEnum } from '../enum';

interface IProps {
  type: TabDataEnum;
}

/**
 * 参数信息
 */
const currentProps = withDefaults(defineProps<IProps>(), {
  type: TabDataEnum.staff
});

// 整体的 props 数据
const propsData = inject<SelectOrgInfoProps>('propsData');
// 偏平化的部门数据
const deptFlatData = inject<Array<DeptDataType>>('deptFlatData');
// 当前列表数据信息
const currentListData = ref<Array<DeptDataType & StaffDataType>>([]);
// 面包屑数据信息
const breadDataList = ref<Array<DeptDataType>>([]);

/**
 * 组装当前列表的数据
 */
const handleCurrentListData = (id: string = '', deptData: Array<DeptDataType> = []) => {
  currentListData.value = makeListData(id, currentProps.type, deptData, propsData?.staffData, deptFlatData);
};

/**
 * 组装面包屑数据
 * @param data 
 */
const handleBreadDataList = (data: DeptDataType | RoleDataType) => {
  breadDataList.value.push(data);
};


onMounted(() => {
  // 如果是角色信息
  if (currentProps.type === TabDataEnum.role) {
    handleCurrentListData(propsData?.roleData?.id, propsData?.roleData?.children);
    propsData?.roleData && handleBreadDataList(propsData?.roleData);
  } else {
    handleCurrentListData(propsData?.deptData?.id, propsData?.deptData?.children);
    propsData?.deptData && handleBreadDataList(propsData?.deptData);
  }
});

/**
 * 处理当前列表数据
 */
const changeListData = (itemData: DeptDataType | StaffDataType) => {
  handleCurrentListData(itemData.id, itemData.children);
  if (breadDataList.value.findIndex(item => item.id === itemData.id) == -1) {
    handleBreadDataList(itemData);
  }
}

</script>