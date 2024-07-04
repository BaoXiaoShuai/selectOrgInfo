<template>
  <div class="w-full h-[30px] px-px10 flex items-center overflow-hidden">
    <el-tabs class="el-tab-custom" v-model="currentId" @tab-click="tabClick" :style="{ width: tabWidth + 'px' }">
      <el-tab-pane class="text-[12px]" v-for="(item, index) in data" :key="item.id" :name="item.id">
        <template #label>
          <div>
            <span>{{ item.name }}</span>
            <span class="ml-[5px]" v-if="index !== data.length - 1">/</span>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { DeptDataType, SelectOrgInfoProps } from '../type';
import { computed, ref, inject, onMounted } from 'vue';

const tabWidth = ref<number>(0);
const propsData = inject<SelectOrgInfoProps>('propsData');

onMounted(() => {
  tabWidth.value = propsData?.width ? (propsData?.width / 2 - 20) : 0;
});

const currentId = ref<string>('');

const props = defineProps<{
  data: Array<DeptDataType>;
}>();

const emit = defineEmits<{
  (e: 'update:data', data: Array<DeptDataType>): void,
  (e: 'itemClick', data: DeptDataType): void;
}>();

const data = computed({
  get: () => {
    currentId.value = props.data[props.data.length - 1]?.id;
    return props.data;
  },
  set: (value: Array<DeptDataType>) => emit('update:data', value)
});

const itemClick = (item: DeptDataType, index: number) => {
  data.value.splice(index + 1, data.value.length - index);
  emit('itemClick', item);
};

const tabClick = (tab: any) => {
  const index = props.data.findIndex(item => item.id === tab.props.name);
  itemClick(props.data[index], index);
}

</script>

<style lang="scss" scoped>
:deep(.el-tab-custom) {
  .el-tabs__header {
    @apply mb-0 h-[30px];

    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      @apply leading-[35px];
    }

    .el-tabs__nav-wrap {
      @apply after:invisible;
    }

    .el-tabs__active-bar {
      @apply invisible;
    }

    .el-tabs__item {
      @apply p-0 h-[30px] pt-[3px] text-[12px] font-normal cursor-pointer;
      @apply mr-[5px];
    }

    .el-tabs__item:last-child {
      @apply pr-0 mr-0;
    }
  }

  .el-tabs__content {
    @apply invisible;
  }
}
</style>