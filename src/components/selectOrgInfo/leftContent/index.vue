<template>
  <div class="h-full flex-1 border-r-solid border-r-[1px] border-[var(--el-border-color)]">
    <div class="w-full h-[50px] flex items-center px-px10">
      <el-input placeholder="请输入内容进行搜索" :prefix-icon="Search" />
    </div>
    <el-tabs v-model="defaultTab" @tab-change="tabChange" class="h-less50 w-full [&>div:first-child]:px-px10 [&>div:first-child]:m-0 [&>div:nth-child(2)]:h-less40 [&>div:nth-child(2)]:w-full">
      <template v-for="item in propsData?.tabData" :key="item.type">
        <el-tab-pane class="h-full w-full" :label="item.label" :name="item.type">
          <ListPanel :type="item.type" />
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { SelectOrgInfoProps } from '../type.ts'
import ListPanel from './staff.vue'
import { TabDataEnum } from '../enum';

const propsData = inject<SelectOrgInfoProps>('propsData')

const defaultTab = ref<TabDataEnum>()

onMounted(() => {
  defaultTab.value = propsData?.tabData?.[0].type
  injectTabChange?.(defaultTab.value || TabDataEnum.staff);
})

const injectTabChange = inject<((type: TabDataEnum) => void)>('tabChange');

const tabChange = (type: TabDataEnum) => {
  injectTabChange?.(type);
}

</script>