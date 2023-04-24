export default {
  menu_fapiao: {
    name: '发票',
    children: {
      menu_fapiao_setting: {
        name: '发票配置',
        children: {
          menu_action_tax: { name: '税' },
          menu_action_vat_product: { name: '税务分类商品' },
          menu_action_partner_company: { name: '开票公司' },
          menu_action_company_taxmachine: { name: '税控设备' },
          menu_action_users: { name: '开票用户' },
          menu_action_api_draw_company: { name: '开票配置' },
          menu_action_api_ocr_company: { name: 'OCR 配置' },
          menu_action_api_check_company: { name: '查验配置' }
        }
      },
      menu_fapiao_master: {
        name: '主数据',
        children: {
          menu_action_partner: { name: '开票抬头' },
          menu_action_product: { name: '开票商品' }
        }
      },

      menu_action_bill_ocr: { name: 'OCR' },
      menu_action_bill_check: { name: '查验' },
      menu_action_invoice_draw: { name: '开票' }
    }
  }
}
