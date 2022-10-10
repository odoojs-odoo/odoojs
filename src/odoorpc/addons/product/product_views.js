const date_tools = {
  get one_day() {
    return 1000 * 60 * 60 * 24
  },
  format(date) {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const today_str = `${year}-${month}-${day}`
    return today_str
  },
  increase(date, num = 1) {
    return this.format(new Date(new Date(date).getTime() + this.one_day * num))
  },

  get today() {
    const today = new Date()
    return this.format(today)
  }
}

export default {
  //
  product_category_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'form',
    fields: {
      name: {},
      parent_id: {}
    }
  },

  product_category_list_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'tree',
    fields: {
      display_name: {}
    }
  },

  product_category_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'search',
    arch: {
      fields: {
        name: {},
        parent_id: {}
      },

      filters: {}
    }
  },

  product_category_action_form: {
    _odoo_model: 'ir.actions',
    name: '产品类别',
    type: 'ir.actions.act_window',
    res_model: 'product.category',
    search_view_id: 'product_category_search_view',
    domain: [],
    context: {}
  },

  //

  product_supplierinfo_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'form',
    fields: {
      sequence: {},
      name: {},
      product_id: {},
      product_tmpl_id: {},
      company_id: {},
      min_qty: {},
      price: {}
    }
  },

  product_supplierinfo_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'tree',
    fields: {
      sequence: {},
      name: {},
      product_id: {},
      product_tmpl_id: {},
      company_id: {},
      min_qty: {},
      price: {}
    }
  },

  product_supplierinfo_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'search',
    arch: {
      fields: {
        name: {},
        product_tmpl_id: {}
      },

      filters: {
        group1: {
          active: {
            string: '启用',
            domain: () => {
              const last = date_tools.increase(date_tools.today, -1)
              return ['|', ['date_end', '=', false], ['date_end', '>=', last]]
            }
          },

          archived: {
            string: '已归档',
            domain: () => {
              const last = date_tools.increase(date_tools.today, -1)
              return [['date_end', '<', last]]
            }
          }
        }
      }
    }
  },

  product_supplierinfo_type_action: {
    _odoo_model: 'ir.actions',
    name: '供应商价格表',
    type: 'ir.actions.act_window',
    res_model: 'product.supplierinfo',
    domain: [],
    context: { visible_product_tmpl_id: false }
  }
}
