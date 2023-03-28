export default {
  id: 'fapiao_base_setting',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Fapaio Setting', zh_CN: '发票配置', zh_HK: '发票配置' },
  children: [
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
    },
    {
      action: 'fapiao_base.action_partner_company',
      id: 'fapiao_base.action_partner_company',
      icon: 'shopping',
      name: { en_US: 'Company', zh_CN: '开票公司', zh_HK: '开票公司' }
    },

    {
      action: 'fapiao_base.action_company_taxmachine',
      id: 'fapiao_base.action_company_taxmachine',
      icon: 'shopping',
      name: { en_US: 'Tax Machine', zh_CN: '税控设备', zh_HK: '税控设备' }
    },

    {
      action: 'fapiao_base.action_users',
      id: 'fapiao_base.action_users',
      icon: 'shopping',
      name: {
        en_US: 'User Drawer',
        zh_CN: '开票用户设置',
        zh_HK: '开票用户设置'
      }
    },
    {
      action: 'fapiao_invoice.action_api_draw_company',
      id: 'fapiao_invoice.action_api_draw_company',
      icon: 'shopping',
      name: { en_US: 'Draw Setting', zh_CN: '开票设置', zh_HK: '开票设置' }
    },

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
