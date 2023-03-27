export default {
  id: 'fapiao_bill_setting',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Fapaio Bill Setting', zh_CN: '进项设置', zh_HK: '进项设置' },
  children: [
    {
      action: 'fapiao_bill.action_api_ocr_company',
      id: 'fapiao_bill.action_api_ocr_company',
      icon: 'shopping',
      name: { en_US: 'OCR Setting', zh_CN: 'OCR 配置', zh_HK: 'OCR 配置' }
    },
    {
      action: 'fapiao_bill.action_api_check_company',
      id: 'fapiao_bill.action_api_check_company',
      icon: 'shopping',
      name: { en_US: 'Check Setting', zh_CN: '查验设置', zh_HK: '查验设置' }
    }
  ]
}
