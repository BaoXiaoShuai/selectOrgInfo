# mock 数据结构

#### 部门
``` JSON
{
  "id": "xxxxxxx",
  "name": "斜杠青年工作室",
  "nameSpell": "XIEGANGQINGNIANGONGZUOSHI",
  "children": [
    {
      "name": "离职部门",
      "nameSpell": "LIZHIBUMEN1",
      "id": "xxxxxxx",
    }
  ]
}
```

#### 人员
```JSON
[
  {
    "nameSpell": "FANGYI",
    "id": "xxxxxxx",
    "name": "方蚁",
    "avatar": null,
    "departments": [
      "xxxxxxx"
    ],
    "external": false,
    "nameInitial": "FY",
    "defaultDepartment": []
  }
]
```

#### 角色
```JSON
{
  "id": "xxxxxxx",
  "name": "角色总览",
  "children": [
    {
      "id": "xxxxxxx",
      "name": "具体角色",
    }
  ]
}
```