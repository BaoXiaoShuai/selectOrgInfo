import { ShowTypeEnum, TabDataEnum } from "./enum";

/**
 * 员工
 */
export interface StaffDataType {
  id: string;
  name: string;
  departments?: Array<string>;
  isStaff?: boolean;
  deptNames?: Array<string>;
  dataType?: TabDataEnum;
  [key: string]: any;
}
/**
 * 部门
 */
export interface DeptDataType {
  id: string;
  name: string;
  children?: Array<DeptDataType>;
  allStaffCount?: number;
  allStaffList?: Array<StaffDataType>;
  allStaffIds?: Array<string>;
  isDept?: boolean;
  deptPath?: string;
  dataType?: TabDataEnum;
  [key: string]: any;
}

/**
 * 角色信息
 */
export interface RoleDataType {
  id: string;
  name: string;
  children?: Array<RoleDataType>;
  dataType?: TabDataEnum;
  isRole?: boolean;
  [key: string]: any;
}

export interface TabDataType {
  label: string;
  type: TabDataEnum;
  checkIds?: Array<string>;
}

/**
 * 选择组织架构
 */
export interface SelectOrgInfoProps {
  /** 展示类型 */
  showType?: ShowTypeEnum;
  title?: string;
  tabData?: Array<TabDataType>;
  staffData?: Array<StaffDataType>;
  deptData?: DeptDataType;
  roleData?: RoleDataType;
  width?: number;
  /** 是否多选 */
  multiple?: boolean;
}

// 联合数据类型
export type ResultListType = StaffDataType | DeptDataType | RoleDataType;


/**
 * 最终抛出的实体对象
 */
export interface ResultEntityType {
  'all': Array<ResultListType>;
  [TabDataEnum.staff]: Array<StaffDataType>;
  [TabDataEnum.department]: Array<DeptDataType>;
  [TabDataEnum.role]: Array<RoleDataType>;
}