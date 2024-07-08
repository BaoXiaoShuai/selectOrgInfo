import { ShowTypeEnum, TabDataEnum } from "./enum";

/**
 * 员工
 */
export interface StaffDataType {
  id: string;
  name: string;
  departments?: Array<string>;
  isStaff?: boolean
  deptNames?: Array<string>
  [key: string]: any;
}
/**
 * 部门
 */
export interface DeptDataType {
  id: string;
  name: string;
  children?: Array<DeptDataType>;
  allStaffCount?: number
  allStaffList?: Array<StaffDataType>
  allStaffIds?: Array<string>
  isDept?: boolean
  deptPath?: string
  [key: string]: any;
}

/**
 * 角色信息
 */
export interface RoleDataType {
  id: string;
  name: string;
  children?: Array<RoleDataType>;
  isRole?: boolean
  [key: string]: any;
}

/**
 * 选择组织架构
 */
export interface SelectOrgInfoProps {
  /** 展示类型 */
  showType?: ShowTypeEnum;
  title?: string;
  tabData?: Array<{
    label: string;
    type: TabDataEnum;
  }>;
  staffData?: Array<StaffDataType>;
  deptData?: DeptDataType;
  roleData?: RoleDataType;
  width?: number
  /** 是否多选 */
  multiple: boolean
}
