export default {
  reset_view_arch_wizard_view: {
    _odoo_model: 'ir.ui.view',
    model: 'reset.view.arch.wizard',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            has_diff: {
              invisible: '1'
            },
            view_id: {
              invisible: '1'
            },
            view_name: {},
            compare_view_id: {
              invisible: [['reset_mode', '!=', 'other_view']],
              no_create: true,
              no_open: true
            }
          },
          _group_886: {
            reset_mode: {
              widget: 'radio'
            }
          }
        },
        arch_diff: {
          invisible: [['arch_diff', '=', false]]
        },
        _div: {
          _attr: {
            invisible: [['arch_diff', '!=', false]],
            class: 'alert alert-warning my-2'
          },
          _span: {
            _attr: {
              invisible: [['reset_mode', '!=', 'soft']],
              text: 'This view has no previous version.'
            }
          },
          _span_111: {
            _attr: {
              invisible: [['reset_mode', '!=', 'hard']],
              text: 'This view is not coming from a file.'
            }
          },
          _span_260: {
            _attr: {
              invisible: [['reset_mode', '!=', 'other_view']],
              text: 'You need two views to compare.'
            }
          }
        },
        _footer: {
          _button_reset_view_button: {
            _attr: {
              name: 'reset_view_button',
              type: 'object',
              string: 'Reset View',
              invisible: [['has_diff', '=', false]],
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
  },

  reset_view_arch_wizard_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Compare/Reset',
    res_model: 'reset.view.arch.wizard',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
