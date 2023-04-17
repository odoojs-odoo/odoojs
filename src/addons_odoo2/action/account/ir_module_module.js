export default {
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
