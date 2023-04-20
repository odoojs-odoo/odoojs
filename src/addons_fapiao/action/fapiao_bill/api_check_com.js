export default {
  view_api_check_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.api.check.company',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {},
        name: {},
        tin: { secret: 1 }
        //   api_check_id: {}
      }
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
        _group: {
          _group_name: {
            company_id: {},
            name: {},
            tin: { secret: 1 }
          },
          _group_desc: {
            api_check_id: { secret: 1 },
            zncspt_app_key: { secret: 1 },
            zncspt_app_secret: { secret: 1 },
            zncspt_access_token: { secret: 1 }
            // zncspt_expires_in: {},
            // zncspt_lasttime: {}
          }
        }
      }
    }
  },

  action_api_check_company: {
    _odoo_model: 'ir.actions.act_window',
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
