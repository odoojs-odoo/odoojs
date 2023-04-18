export default {
  view_base_module_upgrade: {
    _odoo_model: 'ir.ui.view',
    model: 'base.module.upgrade',
    type: 'form',
    arch: {
      sheet: {
        _p: 'This module will trigger the uninstallation of below modules.',
        _p_710: {
          _strong: 'This operation will permanently erase all data currently stored by the modules!'
        },
        _p_370: 'If you wish to cancel the process, press the cancel button below',
        _separator: {
          _attr: {
            string: 'Impacted Apps'
          }
        },
        module_info: {},
        _footer: {
          _button_upgrade_module: {
            _attr: {
              name: 'upgrade_module',
              type: 'object',
              string: 'Confirm',
              class: 'btn-primary'
            }
          },
          _button_upgrade_module_cancel: {
            _attr: {
              name: 'upgrade_module_cancel',
              type: 'object',
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_view_base_module_upgrade: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Apply Schedule Upgrade',
    type: 'ir.actions.act_window',
    res_model: 'base.module.upgrade',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_base_module_upgrade_install: {
    _odoo_model: 'ir.ui.view',
    model: 'base.module.upgrade',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _span: {
            _attr: {
              class: 'o_form_label',
              text: 'The selected modules have been updated / installed !'
            }
          }
        },
        _div_624: {
          _span: {
            _attr: {
              class: 'o_form_label',
              text: 'We suggest to reload the menu tab to see the new menus (Ctrl+T then Ctrl+R)."'
            }
          }
        },
        _footer: {
          _button_config: {
            _attr: {
              name: 'config',
              type: 'object',
              string: 'Start configuration',
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

  action_view_base_module_upgrade_install: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Module Upgrade Install',
    type: 'ir.actions.act_window',
    res_model: 'base.module.upgrade',
    views: {
      tree: 'view_base_module_upgrade_install',
      form: '=======todo=========='
    }
  }
}
