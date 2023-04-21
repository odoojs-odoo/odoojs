export default {
  payment_icon_form: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.icon',
    type: 'form',
    arch: {
      sheet: {
        image: {
          widget: 'image',
          class: 'oe_avatar'
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _h1: {
            name: { placeholder: 'Name' }
          }
        },
        _notebook: {
          _page_providers: {
            _attr: {
              name: 'providers',
              string: 'Providers list'
            },
            provider_ids: {}
          }
        }
      }
    }
  },

  payment_icon_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.icon',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {}
      }
    }
  },

  action_payment_icon: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Payment Icons',
    res_model: 'payment.icon',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
