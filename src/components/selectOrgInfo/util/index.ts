import { StaffDataType, DeptDataType, RoleDataType } from "../type";
import { TabDataEnum } from '../enum'

/**
 * 递归获取当前部门的所有员工数量
 * @param dept 
 * @param staffData 
 * @returns 
 */
const getDeptStaffCount = (dept: DeptDataType, staffData: Array<StaffDataType>) => {
  let allStaffCount = staffData.filter(staff => staff?.departments?.includes(dept.id)).length;
  if (dept.children && dept.children.length > 0) {
    dept.children.forEach(child => {
      allStaffCount += getDeptStaffCount(child, staffData);
    });
  }
  return allStaffCount;
};

/**
 * 组装当前列表的数据
 * @param id 部门 id
 * @param type 列表类型
 * @param listData 部门数据 / 角色数据
 * @param allStaffData 员工数据
 * @param deptFlatData 扁平化的部门数据
 */
export const makeListData = (
  id: string = '', 
  type: TabDataEnum,
  listData: Array<DeptDataType> = [], 
  allStaffData: Array<StaffDataType> = [],
  deptFlatData: Array<DeptDataType> = []
 ) => {
  let currentStaffList: Array<StaffDataType> = [];
  if(type === TabDataEnum.staff) {
    currentStaffList = allStaffData.filter(item => item?.departments?.includes(id));
    // 去部门索引表里拿当前人员所在的部门信息
    currentStaffList?.forEach(item => {
      item.isStaff = true
      item.deptNames = deptFlatData?.filter(dept => item?.departments?.includes(dept.id))?.map(dept => dept.name)
    })
  }
  
  listData.forEach(item => {
    if(type === TabDataEnum.staff) {
      item.allStaffCount = getDeptStaffCount(item, allStaffData);
      item.isDept = true
    }
    if(type === TabDataEnum.department) {
      item.isDept = true
    }
    if(type === TabDataEnum.role) {
      item.isRole = true
    }
  });
  return listData.concat(currentStaffList);
};

/**
 * 建立部门索引表信息
 * @param departments 
 * @param parentPath 
 * @returns 
 */
export const flattenDepartments = (departments: Array<DeptDataType> = [], parentPath: string = '') => {
  let result: Array<DeptDataType> = [];
  departments.forEach((item: DeptDataType) => {
    const currentPath = parentPath ? `${parentPath} > ${item.name}` : item.name;
    result.push({
      ...item,
      path: currentPath,
    });
    if (item.children && item.children.length > 0) {
      result = result.concat(flattenDepartments(item?.children, currentPath));
    }
  });
  return result;
}
