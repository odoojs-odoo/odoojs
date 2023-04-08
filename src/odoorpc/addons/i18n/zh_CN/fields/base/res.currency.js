const ModelFields = {
  name: { string: '名称' },
  symbol: { string: '符号' },
  full_name: { string: '全名' },
  date: { string: '日期' },
  rate: { string: '汇率' },
  inverse_rate: { string: '反向汇率' },
  active: { string: '激活' }
}

const AddonsFields = {
  'res.currency': ModelFields
}

export default AddonsFields
