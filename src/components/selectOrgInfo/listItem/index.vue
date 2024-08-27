<template>
  <div @click="itemClick"
    class="w-full h-[50px] flex items-center hover:bg-[var(--el-fill-color)] px-px10 text-[14px] cursor-pointer [&>div]:h-full [&>div]:flex [&>div]:items-center">
    <template v-if="showCheck">
      <div v-if="multiple" class="w-[25px]" @click.stop="checkBoxClick">
        <el-checkbox v-model="isSelected" :indeterminate="isIndeterminate" />
      </div>
      <div v-if="(tabData !== TabDataEnum.staff && !multiple) || (data.isStaff && !multiple)"
        class="w-[30px] justify-center">
        <el-radio-group v-model="isSelected">
          <el-radio :value="true"></el-radio>
        </el-radio-group>
      </div>
    </template>
    <Avatar :data="data" :tab-data="tabData" />
    <Title />
    <Operate @item-click="$emit('itemClick', data)" />
  </div>
</template>

<script setup lang="ts">
import { TabDataEnum } from '../enum';
import { DeptDataType, StaffDataType, RoleDataType, SelectOrgInfoProps } from '../type';
import Avatar from './avatar.vue';
import Title from './title.vue';
import Operate from './operate.vue';
import { ListItemProps } from './type.ts';
import { inject, computed, ref, watchEffect } from 'vue';
import { useResultListStore } from '../store/resultList';
import { compareData } from '../util';

export interface SelectedCallbackType {
  id: string;
  isSelected: boolean;
  isIndeterminate: boolean;
  searchVal?: string;
}

// store
const resultListStore = useResultListStore();
// 最顶级的参数
const propsData = inject<SelectOrgInfoProps>('propsData');
// 是否多选
const multiple = computed(() => propsData?.multiple || false);
// 是否半选
const isIndeterminate = ref<boolean>(false);
// 当前的 props
const props = defineProps<ListItemProps>();
// 事件
const emit = defineEmits<{
  (e: 'itemClick', data: DeptDataType | StaffDataType): void;
  (e: 'selectedCallback', data: SelectedCallbackType): void;
  (e: 'selectData', data: DeptDataType | StaffDataType | RoleDataType, isIndeterminate: boolean, altKey?: boolean): void;
}>();
// 是否选中
const isSelected = computed(() => {
  if (props.data.isDept && props.data.allStaffCount === 0 && props.tabData === TabDataEnum.staff) return false;
  // 员工tab 下的部门
  if (props.data.isDept && props.tabData === TabDataEnum.staff && propsData?.multiple) {
    const isSelectCount = compareData(props.data.allStaffIds, resultListStore.resultIds);
    // 判断半选状态
    isIndeterminate.value = isSelectCount !== 0 && isSelectCount < props.data.allStaffCount;
    return isSelectCount === props.data.allStaffCount;
  }
  return resultListStore.resultIds.includes(props.data.id);
});

watchEffect(() => {
  // 如果是多选并且是左边选择区域的情况下
  // 给上层 callback 一下当前行的选中状态，以便上层的全选判断状态
  if (!props.isResultShow && propsData?.multiple) {
    emit('selectedCallback', {
      id: props.data.id,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value
    });
  }
});

/**
 * 列表的点击
 */
const itemClick = (e: MouseEvent) => {
  // 在没有选择的情况下，点击事件是点击行
  if(!props.showCheck) {
    emit('itemClick', props.data);
    return 
  }
  if (props.tabData !== TabDataEnum.staff || props.data.isStaff || props.searchVal) {
    emit('selectData', props.data, false, e.altKey);
  } else {
    emit('itemClick', props.data);
  }
};

/**
 * 多选的点击
 */
const checkBoxClick = (e: MouseEvent) => {
  emit('selectData', props.data, isIndeterminate.value, e.altKey);
}

</script>