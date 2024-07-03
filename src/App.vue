<template>
  <el-config-provider>
    <div class="w-full h-full flex items-center justify-center"> 
      <SelectOrgInfo :show-type="ShowTypeEnum.card" />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ShowTypeEnum } from './components/selectOrgInfo/enum';
import SelectOrgInfo from './components/selectOrgInfo/index.vue';
</script>
