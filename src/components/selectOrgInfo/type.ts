import { ShowTypeEnum, TabDataEnum } from "./enum"

export interface SelectOrgInfoProps {
  /** 展示类型 */
  showType?: ShowTypeEnum
  title?: string
  tabData?: Array<{
    label: string
    type: TabDataEnum
  }>
  staffData?: Array<{
    id: string
    name: string
    departments: Array<string>
    [key: string]: any
  }>;
  deptData?: {
    id: string
    name: string
    children: Array<{
      id: string
      name: string
      [key: string]: any
    }>
    [key: string]: any
  }
}
