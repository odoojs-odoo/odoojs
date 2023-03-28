const ModelFields = {
  name: { string: { en_US: 'Name', zh_CN: '名称', zh_HK: '名稱' } },
  symbol: { string: { en_US: 'Symbol', zh_CN: '符号', zh_HK: '符号' } },
  full_name: { string: { en_US: 'Full Name', zh_CN: '全名', zh_HK: '全名' } },
  date: { string: { en_US: 'Date', zh_CN: '日期', zh_HK: '日期' } },
  rate: { string: { en_US: 'Rate', zh_CN: '汇率', zh_HK: '汇率' } },
  inverse_rate: {
    string: { en_US: 'Inverse Rate', zh_CN: '反向汇率', zh_HK: '反向汇率' }
  },
  active: { string: { en_US: 'Active', zh_CN: '激活', zh_HK: '激活' } }
}

const AddonsFields = {
  'res.currency': ModelFields
}

export default AddonsFields
