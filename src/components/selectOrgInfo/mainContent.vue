<template>
  <div :style="{width: contentWidth + 'px'}" class="h-[500px] border-solid border-[1px] border-[var(--el-border-color)] rounded-[4px] flex">
    <LeftContent />
    <RightContent/>
  </div>
</template>

<script setup lang="ts">
import LeftContent from './leftContent/index.vue'
import RightContent from './rightContent/index.vue'
import { ref, inject, onMounted } from 'vue'
import { SelectOrgInfoProps } from './type'

const contentWidth = ref<number>(0)
const propsData = inject<SelectOrgInfoProps>('propsData')

onMounted(() => {
  contentWidth.value = propsData?.width || 0
})

</script>