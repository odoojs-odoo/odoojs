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
              attrs: {
                invisible: "[('reset_mode', '!=', 'other_view')]"
              },
              no_create: true,
              no_open: true
            }
          },
          _group_118: {
            reset_mode: {
              widget: 'radio'
            }
          }
        },
        arch_diff: {
          attrs: {
            invisible: "[('arch_diff', '=', False)]"
          }
        },
        _div: {
          _attr: {
            attrs: {
              invisible: "[('arch_diff', '!=', False)]"
            },
            class: 'alert alert-warning my-2'
          },
          _span: {
            _attr: {
              attrs: {
                invisible: "[('reset_mode', '!=', 'soft')]"
              },
              text: 'This view has no previous version.'
            }
          },
          _span_977: {
            _attr: {
              attrs: {
                invisible: "[('reset_mode', '!=', 'hard')]"
              },
              text: 'This view is not coming from a file.'
            }
          },
          _span_838: {
            _attr: {
              attrs: {
                invisible: "[('reset_mode', '!=', 'other_view')]"
              },
              text: 'You need two views to compare.'
            }
          }
        },
        _footer: {
          _button_reset_view_button: {
            _attr: {
              name: 'reset_view_button',
              string: 'Reset View',
              attrs: {
                invisible: "[('has_diff', '=', False)]"
              },
              class: 'btn-primary',
              type: 'object'
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
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
