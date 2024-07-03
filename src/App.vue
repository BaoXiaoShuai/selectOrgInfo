<template>
  <el-config-provider>
    <div class="w-full h-full flex items-center justify-center">
      <SelectOrgInfo 
        :show-type="ShowTypeEnum.card" 
        :tab-data="tabData"
        :staff-data="StaffData"
        :dept-data="DeptData"
      />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ShowTypeEnum, TabDataEnum } from './components/selectOrgInfo/enum'
import SelectOrgInfo from './components/selectOrgInfo/index.vue'
import StaffData from './mock/staff.json'
import DeptData from './mock/departments.json'

const tabData = ref([
  {
    label: '人员',
    type: TabDataEnum.staff
  },
  {
    label: '部门',
    type: TabDataEnum.department
  },
  {
    label: '角色',
    type: TabDataEnum.role
  }
])

</script>
