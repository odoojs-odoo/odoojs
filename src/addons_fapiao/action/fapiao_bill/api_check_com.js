export default {
  view_api_check_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.api.check.company',
    type: 'tree',

    fields: {
      company_id: {},
      name: {},
      tin: {}
      //   api_check_id: {}
    }
  },

  view_api_check_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.api.check.company',
    type: 'form',

    toolbar: {
      action: {},
      print: {}
    },

    arch: {
      sheet: {
        _title: { display_name: {} },

        _group_name: {
          company_id: {},
          name: {},
          tin: {}
        },
        _group_desc: {
          api_check_id: {},
          zncspt_app_key: {},
          zncspt_app_secret: {},
          zncspt_access_token: {},
          zncspt_expires_in: {},
          zncspt_lasttime: {}
        }
      }
    }
  },

  action_api_check_company: {
    _odoo_model: 'ir.actions',
    name: '发票查验配置',
    type: 'ir.actions.act_window',
    res_model: 'fp.api.check.company',
    domain: [],
    context: {},
    views: {
      tree: 'view_api_check_company_tree',
      form: 'view_api_check_company_form'
    }
  }
}
