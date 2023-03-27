export default {
  id: 'fapiao_base_setting',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Fapaio Setting', zh_CN: '基础设置', zh_HK: '基础设置' },
  children: [
    {
      action: 'fapiao_base.action_partner_company',
      id: 'fapiao_base.action_partner_company',
      icon: 'shopping',
      name: { en_US: 'Company', zh_CN: '开票公司', zh_HK: '开票公司' }
    },

    {
      action: 'fapiao_base.action_tax',
      id: 'fapiao_base.action_tax',
      icon: 'shopping',
      name: { en_US: 'Tax', zh_CN: '开票税率', zh_HK: '开票税率' }
    },

    {
      action: 'fapiao_base.action_vat_product',
      id: 'fapiao_base.action_vat_product',
      icon: 'shopping',
      name: {
        en_US: 'VAT Product',
        zh_CN: '商品税收分类',
        zh_HK: '商品税收分类'
      }
    }
  ]
}
