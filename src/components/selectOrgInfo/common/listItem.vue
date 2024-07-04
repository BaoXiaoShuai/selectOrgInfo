<template>
  <div @click="itemClick" class="w-full h-[50px] flex items-center hover:bg-[var(--el-fill-color)] px-px10 text-[14px] cursor-pointer [&>div]:h-full [&>div]:flex [&>div]:items-center">
    <div v-if="tabData === TabDataEnum.staff && !data.isDept" class="w-[30px] justify-center">
      <el-checkbox />
    </div>
    <el-avatar v-if="data.isDept" class="!bg-[var(--el-color-primary-light-8)] !text-[var(--el-color-primary)]" :size="30" :icon="ChromeFilled" />
    <el-avatar :size="30" v-else :icon="UserFilled" />
    <div class="flex-1 px-px10 flex flex-col justify-center">
      <div class="w-full" >
        {{ data.name }}
      </div> 
      <div v-if="data.isDept && tabData === TabDataEnum.staff" class="w-full text-[12px] text-[var(--el-color-info-light-3)]" >
        {{data.allStaffCount}}人
      </div>
      <div v-if="data.isStaff && tabData === TabDataEnum.staff" class="w-full text-[12px] text-[var(--el-color-info-light-3)]" >
        {{data.deptNames?.join('、')}}人
      </div>
    </div>
    <div v-if="data.isDept" class="w-[30px] justify-center">
      <el-icon><ArrowRight /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ChromeFilled, UserFilled } from '@element-plus/icons-vue'
import { TabDataEnum } from '../enum'
import { DeptDataType, StaffDataType } from '../type'
interface Props {
  data: DeptDataType | StaffDataType
  tabData: TabDataEnum
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'itemClick', data: DeptDataType | StaffDataType): void
}>()

const itemClick = () => { 
  if (props.data.isStaff) return
  emit('itemClick', props.data)
}


</script>