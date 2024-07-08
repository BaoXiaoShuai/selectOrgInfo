import { StaffDataType, DeptDataType, RoleDataType } from "../type";
import { TabDataEnum } from '../enum';

/**
 * 递归获取当前部门的所有员工数量和员工列表信息
 * @param dept 
 * @param staffData 
 * @returns 
 */
const getDeptStaffCount = (dept: DeptDataType, staffData: Array<StaffDataType>) => {
  let allStaffList = staffData.filter(staff => staff?.departments?.includes(dept.id));
  let allStaffIds = allStaffList.map(staff => staff.id);
  let allStaffCount = allStaffList.length;
  if (dept.children && dept.children.length > 0) {
    dept.children.forEach(child => {
      allStaffCount += getDeptStaffCount(child, staffData).allStaffCount;
      allStaffList = allStaffList.concat(getDeptStaffCount(child, staffData).allStaffList);
      allStaffIds = allStaffIds.concat(getDeptStaffCount(child, staffData).allStaffIds);
    });
  }
  return { allStaffCount, allStaffList, allStaffIds };
};

/**
 * 序列化员工信息 主要是拿员工的部门信息
 * @param staffData 
 * @param deptFlatMap 
 * @returns
 */
export const serializeStaffData = (staffData: Array<StaffDataType> = [], deptFlatMap?: Map<string, DeptDataType>) => {
  return staffData.map(item => {
    return {
      ...item,
      isStaff: true,
      dataType: TabDataEnum.staff,
      deptNames: item?.departments?.map(dept => deptFlatMap?.get(dept)?.name).filter(name => name !== undefined) as string[]
    };
  });
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
  listData: Array<DeptDataType | RoleDataType> = [],
  allStaffData: Array<StaffDataType> = [],
  deptFlatMap?: Map<string, DeptDataType>
) => {
  let currentStaffList: Array<StaffDataType> = [];
  if (type === TabDataEnum.staff) {
    currentStaffList = allStaffData.filter(item => item?.departments?.includes(id));
    currentStaffList = serializeStaffData(currentStaffList, deptFlatMap);
  }

  listData.forEach(item => {
    if (type === TabDataEnum.staff) {
      // 当前部门下所有的员工信息，包括所有子级
      const currentDeptStaffInfo = getDeptStaffCount(item, allStaffData);
      item.allStaffList = currentDeptStaffInfo.allStaffList;
      item.allStaffIds = currentDeptStaffInfo.allStaffIds;
      item.allStaffCount = currentDeptStaffInfo.allStaffCount;
      item.isDept = true;
      item.dataType = TabDataEnum.department
    }
    if (type === TabDataEnum.department) {
      item.deptPath = deptFlatMap?.get(item.id)?.path;
      item.isDept = true;
      item.dataType = TabDataEnum.department
    }
    if (type === TabDataEnum.role) {
      item.isRole = true;
      item.dataType = TabDataEnum.role
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
export const flattenDepartments = (departments: Array<DeptDataType> = [], parentPath: string = ''): Map<string, DeptDataType> => {
  let result = new Map<string, DeptDataType>();
  departments.forEach((item: DeptDataType) => {
    const currentPath = parentPath ? `${parentPath} > ${item.name}` : item.name;
    result.set(item.id, {
      ...item,
      path: currentPath,
    });
    if (item.children && item.children.length > 0) {
      const childrenMap = flattenDepartments(item.children, currentPath);
      childrenMap.forEach(childItem => {
        result.set(childItem.id, childItem);
      });
    }
  });
  return result;
};

/**
 * 对比两个数组，得出数据差数据
 * @param aArr 
 * @param bArr 
 * @returns 
 */
export const compareData = (aArr: string[], bArr: string[]) => {
  // 将 b 数组转换为 Set
  const bSet = new Set(bArr);
  // 计算 a 数组中有多少元素在 bSet 中
  let count = 0;
  for (const item of aArr) {
    if (bSet.has(item)) {
      count++;
    }
  }
  return count;
};