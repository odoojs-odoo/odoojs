import fp_setting from './fapiao_setting'
export default {
  id: 'fapiao',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Fapaio', zh_CN: '发票', zh_HK: '发票' },
  children: [
    fp_setting,
    {
      id: 'fapiao_master',
      icon: 'shopping',
      theme: 'twoTone',
      name: {
        en_US: 'Fapaio Master',
        zh_CN: '发票主数据',
        zh_HK: '发票主数据'
      },
      children: [
        {
          action: 'fapiao_base.action_partner',
          id: 'fapiao_base.action_partner',
          icon: 'shopping',
          name: { en_US: 'Partner', zh_CN: '开票伙伴', zh_HK: '开票伙伴' }
        },

        {
          action: 'fapiao_base.action_product',
          id: 'fapiao_base.action_product',
          icon: 'shopping',
          name: { en_US: 'Product', zh_CN: '开票商品', zh_HK: '开票商品' }
        }
      ]
    },

    {
      action: 'fapiao_bill.action_bill_ocr',
      id: 'fapiao_bill.action_bill_ocr',
      icon: 'shopping',
      name: { en_US: 'OCR', zh_CN: 'OCR', zh_HK: 'OCR' }
    },

    {
      action: 'fapiao_bill.action_bill_check',
      id: 'fapiao_bill.action_bill_check',
      icon: 'shopping',
      name: { en_US: 'Check', zh_CN: '查验', zh_HK: '查验' }
    },

    {
      action: 'fapiao_invoice.action_invoice_draw',
      id: 'fapiao_invoice.action_invoice_draw',
      icon: 'shopping',
      name: { en_US: 'Draw', zh_CN: '开票', zh_HK: '开票' }
    }
  ]
}
