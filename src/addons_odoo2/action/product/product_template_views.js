export default {
  product_template_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'tree',
    fields: {
      priority: {},
      name: {},
      default_code: {},
      barcode: {},
      company_id: {},
      list_price: {},
      standard_price: {},
      categ_id: {},
      detailed_type: {},
      uom_id: {}
    }
  },

  product_template_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'kanban',
    fields: {
      priority: {},
      name: {},
      default_code: {},
      barcode: {},
      company_id: {},
      list_price: {},
      standard_price: {},
      categ_id: {},
      detailed_type: {},
      uom_id: {}
    },
    templates: {
      title({ record }) {
        return record.name
      },
      label({ record }) {
        return record.categ_id && record.categ_id[1]
      }
    }
  },

  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'form',
    fields: {
      image_1920: { widget: 'image' },
      priority: {},
      name: {},
      default_code: {},
      sale_ok: {},
      purchase_ok: {},
      detailed_type: {},

      product_tooltip: {},
      uom_id: {},
      uom_po_id: {},
      list_price: {},
      tax_string: {},
      standard_price: {},
      uom_name: {},
      categ_id: {},
      company_id: {},
      description: {},
      description_sale: {},
      weight: {},
      weight_uom_name: {},
      volume: {},
      volume_uom_name: {},

      packaging_ids: {
        widget: 'x2many_tree'
      }
    }
  },

  product_template_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return [
              '|',
              '|',
              '|',
              ['default_code', 'ilike', self],
              ['product_variant_ids.default_code', 'ilike', self],
              ['name', 'ilike', self],
              ['barcode', 'ilike', self]
            ]
          }
        },

        categ_id: {
          filter_domain: raw_value => {
            return [['categ_id', 'child_of', raw_value]]
          }
        }
      },

      filters: {
        group1: {
          services: { string: '服务', domain: [['type', '=', 'service']] },
          consumable: {
            string: '易耗品',
            domain: [['type', 'in', ['consu', 'product']]]
          }
        },

        group2: {
          filter_to_sell: {
            string: '可销售',
            domain: [['sale_ok', '=', true]]
          },
          filter_to_purchase: {
            string: '可采购',
            domain: [['purchase_ok', '=', true]]
          }
        },
        group3: {
          favorites: { string: '收藏', domain: [['priority', '=', '1']] }
        },
        group4: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  }
}
