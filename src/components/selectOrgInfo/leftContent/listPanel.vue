<template>
  <div class="w-full h-full flex flex-col">
    <BreadInfo v-if="!searchVal" v-model:data="breadDataList" @itemClick="changeListData" />
    <div v-if="showAllMultiple" class="w-full px-px10 !h-[25px]" :class="{ 'pt-[5px]': searchVal }">
      <el-checkbox v-model="isSelectedAll" :indeterminate="isIndeterminate" @change="selectAll"
        class="!h-[25px] flex items-center">全选</el-checkbox>
    </div>
    <div class="w-full flex-1 overflow-hidden"
      :class="{ 'flex justify-center items-center': !currentListData.length, 'pt-[5px]': searchVal }">
      <RecycleScroller v-if="currentListData.length > 0" :style="{ height: '100%' }" :items="currentListData"
        :item-size="50" key-field="id" v-slot="{ item }">
        <ListItem :searchVal="searchVal" :showCheck="showCheck" @item-click="changeListData" :data="item"
          :tab-data="type" @selectedCallback="pushCheckData" @selectData="insetResultData" />
      </RecycleScroller>
      <EmptyPanel v-else :text="searchVal ? '没有搜索到该关键字的数据' : '暂无数据'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, watchEffect } from 'vue';
import { DeptDataType, RoleDataType, SelectOrgInfoProps, StaffDataType, ResultListType } from '../type.ts';
import ListItem from '../listItem/index.vue';
import BreadInfo from '../common/bread.vue';
import { makeListData, serializeStaffData, flattenDepartments, searchTabStaff, searchTabDept, searchTabRole } from '../util/index.ts';
import { TabDataEnum } from '../enum';
import EmptyPanel from '../common/empty.vue';
import { SelectedCallbackType } from '../listItem/index.vue';
import { useResultListStore } from '../store/resultList';
// 虚拟列表组件
import { RecycleScroller } from 'vue-virtual-scroller';
// store
const resultListStore = useResultListStore();

interface IProps {
  type: TabDataEnum;
  searchVal?: string;
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
const deptFlatMap = inject<Map<string, DeptDataType>>('deptFlatMap');
// 偏平化的角色数据
const roleFlatMap = inject<Map<string, RoleDataType>>('roleFlatMap');
// 当前列表数据信息
const currentListData = ref<Array<ResultListType>>([]);
// 面包屑数据信息
const breadDataList = ref<Array<DeptDataType>>([]);
// 是否显示选择区域 在角色的情况下第一级不显示选择，代表第一级不可被选择
const showCheck = computed(() => {
  if (currentProps.type === TabDataEnum.role && breadDataList.value.length === 1) {
    return false;
  }
  return true;
});
// 是否显示多选操作
const showAllMultiple = computed(() => {
  if (!currentListData.value.length) return false;
  if (!showCheck.value) return false;
  // 员工首页不展示多选
  // 因为在此基础上，点击部门选择时会把所有的子级员工都选中
  // 所有在此优化为员工首页不允许进行全部选择的操作
  if (currentProps.type === TabDataEnum.staff && !currentProps.searchVal) {
    return breadDataList.value.length > 1 && propsData?.multiple;
  }
  return propsData?.multiple;
});
// 子级给返回的选中状态
const itemsCheckMap = ref<Map<string, SelectedCallbackType>>(new Map());
const pushCheckData = (data: SelectedCallbackType) => {
  itemsCheckMap.value.set(data.id, data);
};

// 是否全选
const isSelectedAll = computed(() => {
  return Array.from(itemsCheckMap.value.values()).every(item => item.isSelected);
});
// 是否半选
const isIndeterminate = computed(() => {
  return Array.from(itemsCheckMap.value.values()).some(item => item.isSelected) && !isSelectedAll.value;
});

/**
 * 组装当前列表的数据
 */
const handleCurrentListData = (id: string = '', listData: Array<DeptDataType | RoleDataType> = []) => {
  currentListData.value = makeListData(id, currentProps.type, listData, propsData?.staffData, deptFlatMap, roleFlatMap);
  itemsCheckMap.value.clear();
};

/**
 * 组装面包屑数据
 * @param data 
 */
const handleBreadDataList = (data: DeptDataType | RoleDataType) => {
  breadDataList.value.push(data);
};

/**
 * 处理当前列表数据
 */
const changeListData = (itemData: DeptDataType | StaffDataType) => {
  handleCurrentListData(itemData.id, itemData.children);
  if (breadDataList.value.findIndex(item => item.id === itemData.id) == -1) {
    handleBreadDataList(itemData);
  }
};

/**
 * 往结果集合里增加数据
 */
const insetResultData = (data: ResultListType, isIndeterminate: boolean, altKey: boolean = false) => {
  const multiple = propsData?.multiple || false;
  // 在部门情况下 多选，并且是按住altKey时，把当前部门和所有子级都进行添加
  if (currentProps.type === TabDataEnum.department && multiple && altKey) {
    const allChild = Array.from(flattenDepartments(data.children, data.name).values());
    resultListStore.pushResultList([data, ...allChild], multiple, isIndeterminate);
    return;
  }
  // 在员工 tab 下 是部门数据时
  if (data.isDept && currentProps.type === TabDataEnum.staff && multiple) {
    resultListStore.pushResultList(serializeStaffData(data.allStaffList, deptFlatMap), multiple, isIndeterminate);
    return;
  }
  resultListStore.pushResultList([data], multiple, isIndeterminate);
};

/**
 * 全选操作
 */
const selectAll = () => {
  currentListData.value.forEach(item => {
    insetResultData(item, isIndeterminate.value);
  });
};

/**
 * 配置人员 tab 下的数据
 */
const makeStaffData = () => {
  // 搜索
  if (currentProps.searchVal) {
    currentListData.value = searchTabStaff(propsData?.staffData, deptFlatMap, currentProps.searchVal, propsData?.multiple);
    return;
  }
  // 人员tab 数据
  handleCurrentListData(propsData?.deptData?.id, propsData?.deptData?.children);
  // 在有搜索的状态下，不显示面包屑，所以也不组装面包屑数据
  propsData?.deptData && handleBreadDataList(propsData?.deptData);
};

/**
 * 组装部门数据
 */
const makeDeptData = () => {
  // 搜索
  if (currentProps.searchVal) {
    currentListData.value = searchTabDept(deptFlatMap, currentProps.searchVal);
    return;
  }
  // 部门tab 数据
  let _deptData = propsData?.deptData;
  _deptData = {
    id: 'allCompany',
    name: '公司',
    children: propsData?.deptData && [propsData?.deptData]
  };
  _deptData && handleBreadDataList(_deptData);
  if (_deptData?.children?.length === 1) {
    handleBreadDataList(_deptData?.children[0]);
    handleCurrentListData(_deptData?.children[0].id, _deptData?.children[0].children);
  }
};

/**
 * 角色数量
 */
const makeRoleData = () => {
  // 搜索
  if (currentProps.searchVal) {
    currentListData.value = searchTabRole(roleFlatMap, currentProps.searchVal);
    return;
  }
  // 角色tab 数据
  handleCurrentListData(propsData?.roleData?.id, propsData?.roleData?.children);
  propsData?.roleData && handleBreadDataList(propsData?.roleData);
};


/**
 * 配置当前 panel 的数据
 */
const makePanelData = () => {
  // 处理不同 tab 下的数据结构
  switch (currentProps.type) {
    case TabDataEnum.staff:
      makeStaffData();
      break;
    case TabDataEnum.department:
      makeDeptData();
      break;
    case TabDataEnum.role:
      makeRoleData();
      break;
    default:
      console.log('未知的tab类型：', currentProps.type);
      break;
  }
};


/**
 * 作为初始化的动作
 * 当有搜索字符试，切换面板的时候，重新组装数据
 * 并且都是搜索状态
 */
watchEffect(() => {
  console.log('搜索的字符：', currentProps.searchVal);
  if (currentProps.searchVal) {
    breadDataList.value = [];
    itemsCheckMap.value.clear();
  }
  makePanelData();
});

</script>