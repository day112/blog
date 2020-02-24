# table 插件

## table 插件设置 scroll 导致的内容错误 BUG

- 所有列设置百分比宽度
- 总的百分比和不能超过 100%
- 如果有多选框和展开项，所有列的百分比之和要小于 100%，留些给多选框和展开项
- **当表格的列小于 5 的时候，表头和内容会有错位，表格列越少错位越严重**

```js
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: "30%"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: "20%"
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    width: "50%"
  }
];

<Table dataSource={dataSource} columns={columns} scroll={{ y: 240 }} />;
```
