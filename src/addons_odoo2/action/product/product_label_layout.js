export default {
  product_label_layout_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.label.layout',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            product_ids: {
              invisible: '1'
            },
            product_tmpl_ids: {
              invisible: '1'
            },
            custom_quantity: {},
            print_format: {
              widget: 'radio'
            }
          },
          _group_188: {
            extra_html: {
              widget: 'html',
              invisible: [['print_format', 'not in', ('dymo', '2x7xprice')]]
            }
          }
        },
        _footer: {
          _button_process: {
            _attr: {
              name: 'process',
              string: 'Confirm',
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_open_label_layout: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Choose Labels Layout',
    res_model: 'product.label.layout',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
