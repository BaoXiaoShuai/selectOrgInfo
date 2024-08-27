<template>
  <template v-if="!parentData.isResultShow">
    <div v-if="parentData.data.isDept && parentData.tabData === TabDataEnum.staff && !parentData.searchVal" class="w-[30px] justify-center">
      <el-icon>
        <ArrowRight />
      </el-icon>
    </div>
    <div v-if="parentData.tabData !== TabDataEnum.staff && parentData.data?.children?.length && !parentData.searchVal" class="justify-center">
      <el-tag @click.stop="$emit('itemClick')" type="primary">
        下级
      </el-tag>
    </div>
  </template>
  <template v-else>
    <div class="w-[30px] justify-center" @click.stop="deleteItem">
      <el-icon><Close /></el-icon>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ArrowRight, Close } from '@element-plus/icons-vue';
import { TabDataEnum } from '../enum';
import { ListItemProps } from './type.ts';
import { SelectOrgInfoProps } from '../type'
import { inject } from 'vue';
import { useResultListStore } from '../store/resultList';
import { getCurrentInstance, ref } from "vue"

// 父组件的数据
const parentData = ref<ListItemProps | any>(getCurrentInstance()?.parent?.props)

const emit = defineEmits<{
  (e: 'itemClick'): void;
}>();

const resultStore = useResultListStore();
// 最顶级的参数
const propsData = inject<SelectOrgInfoProps>('propsData');
/**
 * 删除已选的内容
 */
const deleteItem = () => {
  if(propsData?.multiple || resultStore.resultIds.length > 1) {
    resultStore.removeResultListItem(parentData.value.data.id);
  } else {
    resultStore.$reset();
  }
};

</script>