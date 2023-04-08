export default {
  menu_purchase_root: {
    _odoo_model: 'ir.ui.menu',
    name: '采购',
    parent: 'base.menu_odoo_root',
    sequence: 135
  },

  menu_procurement_management: {
    _odoo_model: 'ir.ui.menu',
    name: '订单',
    parent: 'menu_purchase_root',
    sequence: 1
  },

  menu_procurement_management_supplier_name: {
    _odoo_model: 'ir.ui.menu',
    name: '供应商',
    action: 'account.res_partner_action_supplier',
    parent: 'menu_procurement_management',
    sequence: 15
  },

  menu_purchase_config: {
    _odoo_model: 'ir.ui.menu',
    name: '配置',
    parent: 'menu_purchase_root',
    sequence: 100
  },

  menu_product_pricelist_action2_purchase: {
    _odoo_model: 'ir.ui.menu',
    name: '供应商价格表',
    action: 'product.product_supplierinfo_type_action',
    parent: 'menu_purchase_config',
    sequence: 1
  },

  menu_product_in_config_purchase: {
    _odoo_model: 'ir.ui.menu',
    name: '产品',
    parent: 'menu_purchase_config',
    sequence: 30
  },

  menu_product_attribute_action: {
    _odoo_model: 'ir.ui.menu',
    name: '产品属性',
    action: 'product.attribute_action',
    parent: 'menu_product_in_config_purchase',
    sequence: 1
  },

  menu_product_category_config_purchase: {
    _odoo_model: 'ir.ui.menu',
    name: '产品类别',
    action: 'product.product_category_action_form',
    parent: 'menu_product_in_config_purchase',
    sequence: 3
  },

  menu_unit_of_measure_in_config_purchase: {
    _odoo_model: 'ir.ui.menu',
    name: '度量单位',
    parent: 'menu_purchase_config',
    sequence: 40
  },

  menu_purchase_uom_form_action: {
    _odoo_model: 'ir.ui.menu',
    name: '度量单位',
    action: 'uom.product_uom_form_action',
    parent: 'menu_unit_of_measure_in_config_purchase',
    sequence: 5
  },

  menu_purchase_uom_categ_form_action: {
    _odoo_model: 'ir.ui.menu',
    name: '度量单位类别',
    action: 'uom.product_uom_categ_form_action',
    parent: 'menu_unit_of_measure_in_config_purchase',
    sequence: 10
  },

  menu_purchase_products: {
    _odoo_model: 'ir.ui.menu',
    name: '产品',
    parent: 'menu_purchase_root',
    sequence: 5
  },

  menu_procurement_partner_contact_form: {
    _odoo_model: 'ir.ui.menu',
    name: '产品',
    action: 'product_normal_action_puchased',
    parent: 'menu_purchase_products',
    sequence: 20
  },

  menu_purchase_form_action: {
    _odoo_model: 'ir.ui.menu',
    name: '采购订单',
    action: 'purchase_form_action',
    parent: 'menu_procurement_management',
    sequence: 6
  },

  menu_purchase_rfq: {
    _odoo_model: 'ir.ui.menu',
    name: '询价单',
    action: 'purchase_rfq',
    parent: 'menu_procurement_management',
    sequence: 0
  }
}
