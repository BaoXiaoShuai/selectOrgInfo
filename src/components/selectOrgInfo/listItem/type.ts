import { TabDataEnum } from '../enum';
import { DeptDataType, StaffDataType, RoleDataType } from '../type';

export interface ListItemProps {
  data: StaffDataType | DeptDataType | RoleDataType
  tabData?: TabDataEnum
  isResultShow?: boolean
}