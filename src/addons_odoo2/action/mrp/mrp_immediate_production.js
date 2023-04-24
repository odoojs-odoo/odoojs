export default {
  view_immediate_production: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.immediate.production',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _p: {
            _attr: { text: ['You have not recorded', 'quantities yet, by clicking on', 'Odoo will produce all the finished products and consume all components.'] },
            _i: 'produced',
            _i_565: 'apply'
          }
        },
        show_productions: { invisible: '1' },
        immediate_production_line_ids: {
          invisible: [['show_productions', '=', false]],
          views: {
            tree: {
              arch: {
                sheet: {
                  production_id: {},
                  to_immediate: { widget: 'boolean_toggle' }
                }
              }
            }
          }
        },
        _footer: {
          _button_process: {
            _attr: {
              name: 'process',
              type: 'object',
              string: 'Apply',
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
