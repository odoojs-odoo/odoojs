//

export default {
  id: 'fapiao_sys',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Fapaio Managment', zh_CN: '发票', zh_HK: '发票' },
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
    }
  ]
}
