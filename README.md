# 选择组织信息组件

#### 背景
在使用飞书的时候，发现飞书的选择人员部门的交互比较好用，正好系统也需要一个类似于这样的东西，所以就开发了这个组件，第一版是使用的 **react + antd + ts** 编写，这一版是使用 **vite + vue3 + ts** 编写，意在通过不同的方式编写出更舒适更高效率的组件。

**代码编程可以有无数种变数，我不会是最厉害最优的一种，如果有人能用上此组件，并加以改造，欢迎提任何问题！**

#### Tips
mock 数据结构在 mock 文件夹下有示例

#### 框架
**vite + vue3 + ts + element-plus**

#### 开始使用
```
>  npm i select-org-info

>  import SelectOrgInfo from 'select-org-info'
```

#### TODO
- [ ] 100% 测试用例
- [ ] 远程搜索
- [ ] 数据层级懒加载
- [x] 列表使用虚拟列表
- [x] 全局搜索
- [x] 组件结构优化
  
#### 更新日志

| 版本        | 更新内容 | 
|------------|------|
| `0.0.8`   | 列表使用虚拟列表组件 - https://github.com/Akryum/vue-virtual-scroller |
| `0.0.7`   | 增加本地全局搜索 |
| `0.0.6`   | 更新回调数据结构，在 dialog 下确认按键增加数据信息 |

#### 组件截图

##### 人员
<img src="https://raw.githubusercontent.com/BaoXiaoShuai/selectOrgInfo/main/src/assets/img/staff.png"  width="600" />

##### 部门
<img src="https://raw.githubusercontent.com/BaoXiaoShuai/selectOrgInfo/main/src/assets/img/dept.png"  width="600" />

##### 角色
<img src="https://raw.githubusercontent.com/BaoXiaoShuai/selectOrgInfo/main/src/assets/img/role.png"  width="600" />

#### 参数

##### 基础参数

| 参数名       | 类型 | 描述 | 是否必填 | 默认值 |
|--------------|------|------|----------|--------|
| `showType`   | `ShowTypeEnum` | 展示类型| 否 | `dialog` |
| `title`      | `string` | 标题| 否 | `选择组织` |
| `tabData`    | `Array<TabDataType>` | 选项卡数据| 否 | 空 |
| `staffData`  | `Array<StaffDataType>` | 员工数据| 否 | 空 |
| `deptData`   | `DeptDataType` | 部门数据 | 否 | 空 |
| `roleData`   | `RoleDataType` | 角色数据 | 否 | 空 |
| `width`      | `number` | 宽度| 否 | 空 |
| `multiple`   | `boolean` | 是否多选| 否 | 空 |
| `@tab-change`   | `function` | tab 切换的回调 | 否 | 空 |
| `@data-change`   | `function` | 所选数据的回调 | 否 | 空 |
| `@confirm`   | `function` | 在 dialog 模式下确认的回调(参数与 tabChange 数据一致) | 否 | 空 |
| `@cancel`   | `function` | 在 dialog 模式下取消的回调 | 否 | 空 |

##### @tab-change 回调
| 属性       | 类型 | 
|--------------|------|
| `currentType`      | `TabDataEnum` | 
| `data` | `ResultEntityType` | 

##### @tab-change 回调 ResultEntityType
| 属性       | 描述 | 
|--------------|------|
| `all`      | 所有选择的合集 | 
| `staff` | 所选的员工信息 | 
| `department` | 所选的部门信息 | 
| `role` | 所选的角色信息 | 

##### ShowTypeEnum
| 枚举值       |  描述 | 
|--------------|------|
| `card`      |  使用 element 的 card 模式 |
| `dialog`       |  使用 element 的 dialog 模式 |

##### TabDataType
| 属性       | 类型 | 描述 | 是否必填 | 默认值 |
|--------------|------|------|----------|--------|
| `label`      | `string` |  显示名称 | 是 | 空 |
| `type`       | `TabDataEnum` | 类型 | 是 | 空 |
| `checkIds`   | `Array<string>` | 已选的 ID 列表 | 否 | 空 |

##### TabDataEnum 枚举
| 枚举值       | 值 | 
|--------------|------|
| `staff`      | `staff` | 
| `department` | `department` | 
| `role`   | `role` | 

##### StaffDataType (Array)
| 属性       | 类型 | 描述 | 是否必填 | 默认值 |
|--------------|------|------|----------|--------|
| `id`      | `string` | 员工 ID | 是 |  |
| `name`       | `string` | 员工姓名 | 是 | 空 |
| `departments`   | `Array<string>` | 员工所属的部门 ids | 是 | 空 |
| `nameSpell`   | `string` | 员工姓名拼音 | 否 | 空 |
| `nameInitial`   | `string` | 员工姓名拼音简称 | 否 | 空 |
| `avatar`   | `string` | 员工头像 | 否 | 空 |

##### DeptDataType
| 属性       | 类型 | 描述 | 是否必填 | 默认值 |
|--------------|------|------|----------|--------|
| `id`      | `string` | 部门 ID | 是 |  |
| `name`       | `string` | 部门名称 | 是 | 空 |
| `children`   | `Array<DeptDataType>` | 子部门信息 | 否 | 空 |
| `nameSpell`   | `string` | 部门名称拼音 | 否 | 空 |

##### RoleDataType
| 属性       | 类型 | 描述 | 是否必填 | 默认值 |
|--------------|------|------|----------|--------|
| `id`      | `string` | 角色 ID | 是 |  |
| `name`       | `string` | 角色名称 | 是 | 空 |
| `children`   | `Array<RoleDataType>` | 子角色信息 | 否 | 空 |



#### 欢迎加WX交流

暗号：github
<img src="https://raw.githubusercontent.com/BaoXiaoShuai/selectOrgInfo/main/src/assets/img/card.JPG"  width="400" />

