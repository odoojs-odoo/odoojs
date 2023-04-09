export default {
  menu_stock_root: {
    _odoo_model: 'ir.ui.menu',
    name: '库存',
    parent: 'base.menu_odoo_root',
    // active: false,
    sequence: 140
  },

  menu_stock_warehouse_mgmt: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_root',
    name: '作业',
    sequence: 2
  },

  menu_stock_config_settings: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_root',
    name: '配置',
    sequence: 100
  },

  menu_warehouse_config: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_config_settings',
    name: '仓库管理',
    sequence: 1
  },

  menu_product_in_config_stock: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_config_settings',
    name: '产品',
    sequence: 4
  },

  product_uom_menu: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_config_settings',
    name: '度量单位',
    sequence: 5
  },

  menu_product_category_config_stock: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_product_in_config_stock',
    name: '产品类别',
    action: 'product.product_category_action_form',
    sequence: 2
  },

  menu_attribute_action: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_product_in_config_stock',
    name: '产品属性',
    action: 'product.attribute_action',
    sequence: 4
  },

  menu_stock_uom_categ_form_action: {
    _odoo_model: 'ir.ui.menu',
    parent: 'product_uom_menu',
    name: '度量单位类别',
    action: 'uom.product_uom_categ_form_action',
    sequence: 5
  },

  menu_stock_unit_measure_stock: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_product_in_config_stock',
    name: '度量单位',
    sequence: 35
  },

  menu_stock_inventory_control: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_root',
    name: '产品',
    sequence: 4
  },

  menu_warehouse_report: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_root',
    name: '报告',
    sequence: 99
  }
}
