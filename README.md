# 选择组织信息组件

#### 背景
在使用飞书的时候，发现飞书的选择人员部门的交互比较好用，正好系统也需要一个类似于这样的东西，所以就开发了这个组件，第一版是使用的 **react + antd + ts** 编写，暂时没有更新到 npm 上，这一版是使用 **vite + vue3 + ts** 编写，意在通过不同的方式编写出更舒适更高效率的组件。

#### 框架
**vite + vue3 + ts + element-plus**

#### 组件截图

#### 参数

##### 基础参数

| 参数名       | 类型 | 描述 | 是否必填 | 默认值 |
|--------------|------|------|----------|--------|
| `showType`   | `ShowTypeEnum` | 展示类型| 否 | 空 |
| `title`      | `string` | 标题| 否 | 空 |
| `tabData`    | `Array<TabDataType>` | 选项卡数据| 否 | 空 |
| `staffData`  | `Array<StaffDataType>` | 员工数据| 否 | 空 |
| `deptData`   | `DeptDataType` | 部门数据 | 否 | 空 |
| `roleData`   | `RoleDataType` | 角色数据 | 否 | 空 |
| `width`      | `number` | 宽度| 否 | 空 |
| `multiple`   | `boolean` | 是否多选| 否 | 空 |

##### TabDataType

| 参数名       | 类型 | 描述 | 是否必填 | 默认值 |
|--------------|------|------|----------|--------|
| `label`      | `string` | 标签 | 是 | 空 |
| `type`       | `TabDataEnum` | 类型 | 是 | 空 |
| `checkIds`   | `Array<string>` | 已选的 ID 列表 | 否 | 空 |

##### TabDataEnum

##### StaffDataType

##### DeptDataType

##### RoleDataType