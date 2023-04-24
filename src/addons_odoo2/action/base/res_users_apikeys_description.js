export default {
  action_res_users_keys_description: {
    _odoo_model: 'ir.actions.act_window',
    name: 'API Key: description input wizard',
    res_model: 'res.users.apikeys.description',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  form_res_users_key_description: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users.apikeys.description',
    type: 'form',
    arch: {
      sheet: {
        _h3: {
          _attr: {
            class: 'fw-bold',
            text: 'Name your key'
          }
        },
        _p: 'Enter a description of and purpose for the key.',
        name: { placeholder: "What's this key for?" },
        _p_820: {
          _attr: { text: ['It is very important that this description be clear\n                        and complete,', '.'] },
          _strong: 'it will be the only way to\n                        identify the key once created'
        },
        _footer: {
          _button_make_key: {
            _attr: {
              name: 'make_key',
              type: 'object',
              string: 'Generate key',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
