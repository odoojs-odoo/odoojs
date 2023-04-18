export default {
  action_ice_servers: {
    _odoo_model: 'ir.actions.act_window',
    name: 'ICE servers',
    type: 'ir.actions.act_window',
    res_model: 'mail.ice.server',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_ice_server_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.ice.server',
    type: 'tree',
    arch: {
      sheet: {
        server_type: {},
        uri: {},
        username: {},
        credential: {}
      }
    }
  },

  view_ice_server_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.ice.server',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _label_uri: {
            for: 'uri'
          },
          _div_URI: {
            _attr: {
              name: 'URI',
              class: 'oe_inline'
            },
            server_type: {
              class: 'oe_inline'
            },
            uri: {
              class: 'oe_inline'
            }
          }
        },
        _group_945: {
          username: {},
          credential: {}
        }
      }
    }
  }
}
