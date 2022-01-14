### formview 编辑

```


```

1. Views.form.read, 与查询一样, 先读取数据
2. Node.required 是一个函数, 检查该字段是否 必须填(不能为空), 可用于页面的表单验证
3. Node.readonly 是一个函数, 检查该字段是否只读, 不可编辑. 页面表单上应设置为不可编辑
4. Views.form.onchange 是一个异步函数, 调取模型方法 onchange, 返回值为, 因该字段变化而引起的其他字段更新后的值
5. Views.form.commit 是异步函数, 编辑时 调取模型方法 write, 更新数据到服务器

### formview 新增

```



```

1. Views.form.onchange, 调用 onchange 方法时, 参数为空, 则是新增,
2. Views.form.commit, 新增时, 调取模型方法 create, 更新数据到服务器.
