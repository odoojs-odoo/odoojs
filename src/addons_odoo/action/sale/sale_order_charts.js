export default {
  view_chart_by_date: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'chart',
    arch: {
      run_server: {
        name: 'echart_run_by_date'
      }
    }
  },

  action_chart_by_date: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales Orders Count',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'view_sales_order_filter',
    domain: [['state', 'not in', ['draft', 'sent', 'cancel']]],
    context: {},
    view_type: 'chart',
    views: {
      chart: 'view_chart_by_date'
    }
  },

  view_chart_by_product: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'chart',
    arch: {
      run_server: {
        name: 'echart_run_by_product'
      }
    }
  },

  action_chart_by_product: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales Orders Count',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'view_sales_order_filter',
    domain: [['state', 'not in', ['draft', 'sent', 'cancel']]],
    context: {},
    view_type: 'chart',
    views: {
      chart: 'view_chart_by_product'
    }
  }
}
