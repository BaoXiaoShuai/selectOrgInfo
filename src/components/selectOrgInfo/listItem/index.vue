<template>
  <div @click="itemClick"
    class="w-full h-[50px] flex items-center hover:bg-[var(--el-fill-color)] px-px10 text-[14px] cursor-pointer [&>div]:h-full [&>div]:flex [&>div]:items-center">
    <template v-if="!isResultShow">
      <div v-if="multiple" class="w-[25px]" @click.stop="checkBoxClick">
        <el-checkbox v-model="isSelected" :indeterminate="isIndeterminate" />
      </div>
      <div v-if="(tabData !== TabDataEnum.staff && !multiple) || (data.isStaff && !multiple)"
        class="w-[30px] justify-center">
        <el-radio :checked="isSelected" />
      </div>
    </template>
    <Avatar :data="data" :tab-data="tabData" />
    <Title :data="data" :tab-data="tabData" :isResultShow="isResultShow" />
    <Operate :data="data" :tab-data="tabData" :isResultShow="isResultShow" @item-click="$emit('itemClick', data)" />
  </div>
</template>

<script setup lang="ts">
import { TabDataEnum } from '../enum';
import { DeptDataType, StaffDataType, RoleDataType, SelectOrgInfoProps } from '../type';
import Avatar from './avatar.vue';
import Title from './title.vue';
import Operate from './operate.vue';
import { ListItemProps } from './type.ts';
import { inject, computed, ref } from 'vue';
import { useResultListStore } from '../store/resultList';
import { serializeStaffData, compareData } from '../util'
// store
const resultListStore = useResultListStore();
// 最顶级的参数
const propsData = inject<SelectOrgInfoProps>('propsData');
// 部门数据
const deptFlatMap = inject<Map<string, DeptDataType>>('deptFlatMap');
// 是否多选
const multiple = computed(() => propsData?.multiple || false);
// 是否半选
const isIndeterminate = ref<boolean>(false);
// 当前的 props
const props = defineProps<ListItemProps>();
// 点击事件
const emit = defineEmits<{
  (e: 'itemClick', data: DeptDataType | StaffDataType): void;
}>();
// 是否选中
const isSelected = computed(() => {
  // 员工tab 下的部门
  if (props.data.isDept && props.tabData === TabDataEnum.staff && propsData?.multiple) {
    const isSelectCount = compareData(props.data.allStaffIds, resultListStore.resultIds);
    // 判断半选状态
    isIndeterminate.value = isSelectCount !== 0 && isSelectCount < props.data.allStaffCount;
    return isSelectCount === props.data.allStaffCount
  } 
  return resultListStore.resultIds.includes(props.data.id);
});

/**
 * 往结果集合里增加数据
 */
const insetResultData = (data: DeptDataType | StaffDataType | RoleDataType) => {
  if (data.isDept && props.tabData === TabDataEnum.staff && propsData?.multiple) {
    resultListStore.pushResultList(serializeStaffData(data.allStaffList, deptFlatMap), propsData?.multiple || false, isIndeterminate.value);
  } else {
    resultListStore.pushResultList([data], propsData?.multiple || false);
  }
};
/**
 * 列表的点击
 */
const itemClick = () => {
  if (props.data.isStaff || props.tabData !== TabDataEnum.staff) return;
  emit('itemClick', props.data);
};

const checkBoxClick = () => {
  insetResultData(props.data);
}

</script>