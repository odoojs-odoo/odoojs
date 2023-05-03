export default {
  chart_order_count: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'chart',
    arch: {
      run_server: {
        name: 'echart_run_count'
      }
      //   option: {
      //     title: { text: 'SO Count' },
      //     tooltip: {},
      //     xAxis: { type: 'category' },
      //     yAxis: {},
      //     series: [{ name: 'count', type: 'line' }]
      //   }
    }
  },

  echart_count: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales Orders Count',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'view_sales_order_filter',
    // search_view_id: 'sale_order_view_search_inherit_sale',
    domain: [['state', 'not in', ['draft', 'sent', 'cancel']]],
    context: {},
    view_type: 'chart',
    views: {
      chart: 'chart_order_count'
    }
  }
}
