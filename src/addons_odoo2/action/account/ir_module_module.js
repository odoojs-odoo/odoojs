export default {
  view_module_filter_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    inherit_id: 'base.view_module_filter',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//searchpanel',
            position: 'replace'
          }
        }
      }
    }
  },

  open_account_charts_modules: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Chart Templates',
    search_view_id: 'view_module_filter_inherit_account',
    res_model: 'ir.module.module',
    context: "{                 'search_default_category_id': ref('base.module_category_accounting_localizations_account_charts'),                 'searchpanel_default_category_id': ref('base.module_category_accounting_localizations_account_charts'),             }",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
