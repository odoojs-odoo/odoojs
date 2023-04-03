export default {
  view_api_draw_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.api.draw.company',
    type: 'tree',

    fields: {
      company_id: {},
      name: {},
      tin: {}
      //   api_draw_id: {}
    }
  },

  view_api_draw_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.api.draw.company',
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
          api_draw_id: {},
          nuonuo_app_key: {},
          nuonuo_app_secret: {},
          nuonuo_user_id: {},
          nuonuo_access_token: {},
          nuonuo_refresh_token: {},
          nuonuo_expires_in: {},
          nuonuo_lasttime: {},
          nuonuo_print_aes_key: {}
        }
      }
    }
  },

  action_api_draw_company: {
    _odoo_model: 'ir.actions',
    name: '开票配置',
    type: 'ir.actions.act_window',
    res_model: 'fp.api.draw.company',
    domain: [],
    context: {},
    views: {
      tree: 'view_api_draw_company_tree',
      form: 'view_api_draw_company_form'
    }
  }
}
