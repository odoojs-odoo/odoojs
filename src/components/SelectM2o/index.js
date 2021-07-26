import Select from './select.vue'

export default Select

/*
功能: 
1. 下拉选择框
2. 可搜索
3. 默认显示7条, 超过时, 显示 搜索更多
4. 点击搜索更多, 弹出窗口, 进行选择
5. 选中某项时, 触发 on-change事件
6. 当原始值不为空, 清空搜索框内容时, 触发 on-change事件
7. on-change事件的 参数是 value, label


Selectm2o  props

// 绑定的值，可使用 v-model 双向绑定
value: { type: [String, Number], default: undefined },

//初始化 , 显示默认 label, 可设置 原始值的 label
label: { type: [String], default: undefined },

// 下拉列表框, 默认显示的条数, 实际选择项超过该值时, 显示搜索更多
limit: { type: [Number], default: 7 },

// 选择框默认文字
placeholder: { type: [String], default: '请选择' },

// 异步搜索的方法 必须设置
optionsMethod: { type: Function, default: undefined }


Selectm2o events 


on-change: 
    选中的Option变化时触发. 
    清空搜索框内容, 并失去焦点, 且原始值不为空时, 触发
    返回 value, label


*/
