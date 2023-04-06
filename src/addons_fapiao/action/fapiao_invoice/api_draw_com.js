export default {
  view_api_draw_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.api.draw.company',
    type: 'tree',

    fields: {
      company_id: {},
      name: {},
      tin: { secret: 1 }
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
        _group: {
          _group_name: {
            company_id: {},
            name: {},
            tin: { secret: 1 }
          },
          _group_desc: {
            api_draw_id: { secret: 1 },
            nuonuo_app_key: { secret: 1 },
            nuonuo_app_secret: { secret: 1 },
            // nuonuo_user_id: {secret: 1 },
            nuonuo_access_token: { secret: 1 }
            // nuonuo_refresh_token: {secret: 1 },
            // nuonuo_expires_in: {secret: 1 },
            // nuonuo_lasttime: {secret: 1 },
            // nuonuo_print_aes_key: {secret: 1 }
          }
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
