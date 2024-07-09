<template>
  <el-config-provider>
    <div class="w-full h-full flex items-center justify-center">
      <SelectOrgInfo 
        :show-type="ShowTypeEnum.card" 
        :tab-data="tabData"
        :staff-data="StaffData"
        :dept-data="DeptData"
        :role-data="RoleData"
        multiple
        @tab-change="tabChange"
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
import RoleData from './mock/role.json'

const tabData = ref([
  {
    label: '人员',
    type: TabDataEnum.staff,
    checkIds: ['uzU7pcWfScck00:ID01p4s6rXHfpd', 'uzU7pcWfScck00:ID01oNM9wzQESX', 'uzU7pcWfScck00:kUo95fOa-k4M00']
  },
  {
    label: '部门',
    type: TabDataEnum.department,
    checkIds: ['uzU7pcWfScck00:a4sbKflQlks800', 'uzU7pcWfScck00:ID_3xj2BGxNw90']
  },
  {
    label: '角色',
    type: TabDataEnum.role,
    checkIds: ['ID01pT4CpsQC19']
  }
])

const currentType = ref<TabDataEnum>()

const tabChange = (type: TabDataEnum) => {
  currentType.value = type
}

</script>
