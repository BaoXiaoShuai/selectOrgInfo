import { defineStore } from "pinia";
import { StaffDataType, DeptDataType, RoleDataType } from "../type";
import { TabDataEnum } from "../enum";

type ResultListType = StaffDataType | DeptDataType | RoleDataType;

interface StateType {
  resultList: Array<ResultListType>;
  resultIds: Array<string>;
  resultListMap: Map<string, ResultListType>;
}

export const useResultListStore = defineStore('resultList', {
  state: (): StateType => ({
    resultList: [],
    resultListMap: new Map<string, ResultListType>(),
    resultIds: [],
  }),
  actions: {
    /**
     * 往结果集里添加数据的方法
     * 如果存在就是删除，反之就是增加
     * 如果是单选的时候，直接就是添加，因为单选没有取消操作
     * @param data 需要添加的数据
     * @param multiple 是否是多选 
     * @param isIndeterminate 是否是半选
     */
    pushResultList(data: Array<ResultListType>, multiple: boolean = false, isIndeterminate: boolean = false) {
      // 多选
      if (multiple) {
        // 创建一个 Map 来快速查找 data 数组中的项目
        const resultListMap = new Map<string, ResultListType>(this.resultList.map(item => [item.id, item]));
        data.forEach(item => {
          if (resultListMap.has(item.id) && !isIndeterminate) {
            // 如果 a 数组中存在相同 id 的项目，删除它
            resultListMap.delete(item.id);
          } else {
            // 如果 a 数组中不存在相同 id 的项目，添加它
            resultListMap.set(item.id, item);
          }
        });
        
        // 将更新后的 Map 转换回数组
        this.resultList = Array.from(resultListMap.values());
        this.resultListMap = resultListMap;
      } else {
        // 单选
        this.resultList = data;
      }
      this.resultIds = this.resultList.map(item => item.id);
    },
    /**
     * 删除单个
     * @param id 
     */
    removeResultListItem(id: string) {
      this.resultList = this.resultList.filter(item => item.id !== id);
      this.resultIds = this.resultList.map(item => item.id);
    }
  }
});