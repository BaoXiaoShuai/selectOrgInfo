import { StaffDataType, DeptDataType, RoleDataType, ResultListType } from "../type";
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
    const departments = item?.departments?.map(dept => deptFlatMap?.get(dept));
    return {
      ...item,
      isStaff: true,
      dataType: TabDataEnum.staff,
      deptNames: departments?.map(dept => dept?.name).filter(name => name !== undefined) as string[],
      deptPaths: departments?.map(dept => dept?.deptPath).filter(path => path !== undefined) as string[]
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
  deptFlatMap?: Map<string, DeptDataType>,
  roleFlatMap?: Map<string, RoleDataType>
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
      item.dataType = TabDataEnum.department;
    }
    if (type === TabDataEnum.department) {
      item.deptPath = deptFlatMap?.get(item.id)?.deptPath;
      item.isDept = true;
      item.dataType = TabDataEnum.department;
    }
    if (type === TabDataEnum.role) {
      item.isRole = true;
      item.dataType = TabDataEnum.role;
      item.rolePath = roleFlatMap?.get(item.id)?.rolePath;
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
    const currentPath = parentPath ? `${parentPath} / ${item.name}` : item.name;
    result.set(item.id, {
      ...item,
      isDept: true,
      dataType: TabDataEnum.department,
      deptPath: currentPath,
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
 * 扁平化角色数据
 * 角色是以组为概念，所以只有两层
 * @param role 
 * @returns 
 */
export const flattenRoles = (role: Array<RoleDataType> = []) => {
  let result = new Map<string, RoleDataType>();
  role.forEach((item: RoleDataType) => {
    item.children?.forEach((child: RoleDataType) => {
      result.set(child.id, {
        ...child,
        isRole: true,
        dataType: TabDataEnum.role,
        rolePath: item.name + ' / ' + child.name
      });
    });
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

/**
 * 角色的查询
 * @param roleFlatMap 
 * @param keyword 
 * @returns 
 */
export const searchTabRole = (roleFlatMap?: Map<string, RoleDataType>, keyword: string = '') => {
  let roleList: Array<ResultListType> = [];
  roleFlatMap?.forEach((value) => {
    if (value?.name?.includes(keyword)) {
      roleList.push(value);
    }
  });
  return roleList;
}

/**
 * 部门的搜索
 * @param deptFlatMap 
 * @param keyword 
 * @param allStaffData 
 * @returns 
 */
export const searchTabDept = (deptFlatMap?: Map<string, DeptDataType>, keyword: string = '', allStaffData: Array<StaffDataType> = []) => {
  let deptList: Array<ResultListType> = [];
  deptFlatMap?.forEach((value) => {
    if (value?.name?.includes(keyword) ||
      value?.nameSpell?.includes(keyword?.toLocaleUpperCase()) ||
      value?.nameInitial?.includes(keyword?.toLocaleUpperCase())) {
      // 这里需要处理部门数据信息
      // 当前部门下所有的员工信息，包括所有子级
      if (allStaffData.length > 0) {
        const currentDeptStaffInfo = getDeptStaffCount(value, allStaffData);
        value.allStaffList = currentDeptStaffInfo.allStaffList;
        value.allStaffIds = currentDeptStaffInfo.allStaffIds;
        value.allStaffCount = currentDeptStaffInfo.allStaffCount;
        value.isDept = true;
        value.dataType = TabDataEnum.department;
      }
     
      deptList.push(value);
    }
  });
  return deptList;
};

/**
 * 人员搜索
 * @param allStaffData 
 * @param deptFlatMap
 * @param keyword 
 * @param multiple
 */
export const searchTabStaff = (allStaffData?: Array<StaffDataType>, deptFlatMap?: Map<string, DeptDataType>, keyword: string = '', multiple?: boolean) => {
  let result: Array<ResultListType>;
  const staffData = allStaffData?.filter(item => {
    return item.name?.includes(keyword)
      || item?.nickName?.includes(keyword)
      || item?.nameSpell?.includes(keyword?.toLocaleUpperCase()) // 全拼
      || item?.nameInitial?.includes(keyword?.toLocaleUpperCase()); // 首大字母
  });
  let deptList: Array<ResultListType> = [];
  if (multiple && deptFlatMap && allStaffData) {
    // 部门搜索
    deptList = searchTabDept(deptFlatMap, keyword, allStaffData);
    result = deptList.concat(serializeStaffData(staffData, deptFlatMap));
  } else {
    result = serializeStaffData(staffData, deptFlatMap);
  }
  return result;
};