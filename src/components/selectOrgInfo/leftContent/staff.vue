<template>
  <div class="w-full h-full ">
    <BreadInfo />
    <div class="w-full h-less30 overflow-x-hidden overflow-y-auto">
      <template v-for="item in propsData?.deptData?.children" :key="item.id">
        <ListItem :data="item" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { SelectOrgInfoProps } from '../type.ts'
import ListItem from '../common/listItem.vue'
import BreadInfo from '../common/bread.vue';

const propsData = inject<SelectOrgInfoProps>('propsData')



</script>