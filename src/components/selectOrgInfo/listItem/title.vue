<template>
  <div class="flex-1 px-px10 flex flex-col justify-center">
    <div class="w-full">
      <el-space >
        <span>{{ parentData.data.name }}</span>
        <span class="text-[var(--el-color-info-light-3)]"
          v-if="parentData?.tabData === TabDataEnum.staff && parentData?.data?.isDept && parentData?.searchVal">
          {{ `${deptSelectStaffCountStr}${parentData?.data?.allStaffCount}人` }}
        </span>
      </el-space>
    </div>
    <div class="sub-explain">
      <template v-if="!needTooltip">
        {{ subExplainStr }}
      </template>
      <template v-else>
        <el-tooltip :content="subExplainStr" placement="top-start">
          {{ subExplainStr }}
        </el-tooltip>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TabDataEnum } from '../enum';
import { ListItemProps } from './type.ts';
import { computed } from 'vue';
import { useResultListStore } from '../store/resultList';
import { compareData } from '../util';
import { inject, getCurrentInstance, ref } from 'vue';
import { SelectOrgInfoProps } from '../type';

// store
const resultListStore = useResultListStore();

// 是否需要悬浮提示
const needTooltip = ref<boolean>(false);

// 父组件的数据
const parentData = ref<ListItemProps | any>(getCurrentInstance()?.parent?.props);

// 最顶级的参数
const propsData = inject<SelectOrgInfoProps>('propsData');

// 显示已经选择的部门人数信息
const deptSelectStaffCountStr = computed(() => {
  if (!propsData?.multiple) return '';
  const count = compareData(parentData.value.data.allStaffIds, resultListStore.resultIds);
  if (count <= 0) return '';
  return compareData(parentData.value.data.allStaffIds, resultListStore.resultIds) + ' / ';
});

/**
 * 副标题文字信息
 */
const subExplainStr = computed(() => {
  const { isResultShow, data, tabData, searchVal } = parentData.value;
  // 如果是结果卡片
  if (isResultShow) {
    // 人员
    if (data?.isStaff) {
      needTooltip.value = true;
      return data?.deptPaths?.join('、');
    }
    // 部门
    if (data?.isDept) {
      needTooltip.value = true;
      return data?.deptPath;
    }
    // 角色
    if (data?.isRole) {
      return data?.rolePath;
    }
  } else {
    // 左侧选项卡只有人员有描述
    if (tabData === TabDataEnum.staff) {
      if (data?.isStaff) {
        return data?.deptNames?.join('、');
      }
      if (data?.isDept) {
        // 在人员选项卡搜索的情况下，显示部门的层级
        needTooltip.value = !!searchVal;
        return searchVal ? data?.deptPath : `${deptSelectStaffCountStr.value}${data?.allStaffCount}人`;
      }
    }
    // 在部门的搜索情况下 显示部门的层级
    if (tabData === TabDataEnum.department && searchVal) {
      // 在人员选项卡搜索的情况下，显示部门的层级
      needTooltip.value = true;
      return data?.deptPath;
    }
    // 在的搜索情况下 显示部门的层级
    if (tabData === TabDataEnum.role && searchVal) {
      // 在人员选项卡搜索的情况下，显示部门的层级
      needTooltip.value = true;
      return data?.rolePath;
    }
  }
  return '';
})

</script>

<style scoped lang="scss">
.sub-explain {
  @apply w-full text-[12px];
  @apply text-[var(--el-color-info-light-3)];
  @apply line-clamp-1;
}
</style>