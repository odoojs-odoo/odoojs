export default {
  action_partner_deduplicate: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Deduplicate Contacts',
    res_model: 'base.partner.merge.automatic.wizard',
    context: {
      active_test: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  base_partner_merge_automatic_wizard_form: {
    _odoo_model: 'ir.ui.view',
    model: 'base.partner.merge.automatic.wizard',
    type: 'form',
    arch: {
      sheet: {
        _footer: {
          _button_action_merge: {
            _attr: {
              name: 'action_merge',
              string: 'Merge Contacts',
              invisible: [['state', 'in', ('option', 'finished')]],
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_skip: {
            _attr: {
              name: 'action_skip',
              string: 'Skip these contacts',
              invisible: [['state', '!=', 'selection']],
              type: 'object'
            }
          },
          _button_action_start_manual_process: {
            _attr: {
              name: 'action_start_manual_process',
              string: 'Merge with Manual Check',
              invisible: [['state', '!=', 'option']],
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_start_automatic_process: {
            _attr: {
              name: 'action_start_automatic_process',
              string: 'Merge Automatically',
              invisible: [['state', '!=', 'option']],
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_update_all_process: {
            _attr: {
              name: 'action_update_all_process',
              string: 'Merge Automatically all process',
              invisible: [['state', '!=', 'option']],
              type: 'object'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              invisible: [['state', '=', 'finished']],
              class: 'btn btn-secondary oe_inline',
              type: 'object'
            }
          },
          _button_247: {
            _attr: {
              string: 'Close',
              invisible: [['state', '!=', 'finished']],
              class: 'btn btn-secondary oe_inline',
              type: 'object'
            }
          }
        },
        _group: {
          _attr: {
            invisible: [['state', '!=', 'finished']]
          },
          _h2: 'There are no more contacts to merge for this request',
          _button_action_partner_deduplicate: {
            _attr: {
              name: 'action_partner_deduplicate',
              string: 'Deduplicate the other Contacts',
              class: 'oe_highlight',
              type: 'action'
            }
          }
        },
        _p: {
          _attr: {
            invisible: [['state', '!=', 'option']],
            class: 'oe_grey',
            text: 'Select the list of fields used to search for\n                            duplicated records. If you select several fields,\n                            Odoo will propose you to merge only those having\n                            all these fields in common. (not one of the fields).'
          }
        },
        _group_594: {
          _attr: {
            invisible: ['|', ['state', 'not in', ('selection', 'finished')], ['number_group', '=', 0]]
          },
          state: {
            invisible: '1'
          },
          number_group: {}
        },
        _group_359: {
          _attr: {
            string: 'Search duplicates based on duplicated data in',
            invisible: [['state', 'not in', ('option',)]]
          },
          group_by_email: {},
          group_by_name: {},
          group_by_is_company: {},
          group_by_vat: {},
          group_by_parent_id: {}
        },
        _group_710: {
          _attr: {
            string: 'Exclude contacts having',
            invisible: [['state', 'not in', ('option',)]]
          },
          exclude_contact: {},
          exclude_journal_item: {}
        },
        _separator: {
          _attr: {
            string: 'Options',
            invisible: [['state', 'not in', ('option',)]]
          }
        },
        _group_888: {
          _attr: {
            invisible: [['state', 'not in', ('option', 'finished')]]
          },
          maximum_group: {
            readonly: [['state', 'in', 'finished']]
          }
        },
        _separator_749: {
          _attr: {
            string: 'Merge the following contacts',
            invisible: [['state', 'in', ('option', 'finished')]]
          }
        },
        _group_731: {
          _attr: {
            invisible: [['state', 'in', ('option', 'finished')]]
          },
          _p: {
            _attr: {
              class: 'oe_grey',
              text: 'Selected contacts will be merged together.\n                                All documents linked to one of these contacts\n                                will be redirected to the destination contact.\n                                You can remove contacts from this list to avoid merging them.'
            }
          },
          _group: {
            dst_partner_id: {
              domain: {
                todo_ctx: "[('id', 'in', partner_ids or False)]"
              },
              required: [['state', '=', 'selection']],
              context: {
                partner_show_db_id: true
              },
              always_reload: true
            }
          },
          partner_ids: {
            views: {
              tree: {
                arch: {
                  sheet: {
                    _attr: {
                      string: 'Partners'
                    },
                    id: {},
                    display_name: {},
                    email: {},
                    is_company: {},
                    vat: {},
                    country_id: {}
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  action_partner_merge: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Merge',
    res_model: 'base.partner.merge.automatic.wizard',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
