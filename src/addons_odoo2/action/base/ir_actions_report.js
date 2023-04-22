export default {
  reports_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Reports',
    res_model: 'ir.actions.report',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  act_report_xml_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.report',
    type: 'form',
    arch: {
      sheet: {
        binding_model_id: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_create_action: {
            _attr: {
              name: 'create_action',
              type: 'object',
              string: "Add in the 'Print' menu",
              icon: 'fa-plus-square',
              help: 'Display an option on related documents to print this report',
              invisible: [['binding_model_id', '!=', false]],
              class: 'oe_stat_button'
            }
          },
          _button_unlink_action: {
            _attr: {
              name: 'unlink_action',
              type: 'object',
              string: "Remove from the 'Print' menu",
              icon: 'fa-minus-square',
              help: 'Remove the contextual action related to this report',
              invisible: [['binding_model_id', '=', false]],
              class: 'oe_stat_button'
            }
          },
          _button_associated_view: {
            _attr: {
              name: 'associated_view',
              type: 'object',
              string: 'QWeb views',
              icon: 'fa-code',
              invisible: [['report_type', 'not in', ['qweb-pdf', 'qweb-html', 'qweb-text']]],
              class: 'oe_stat_button'
            }
          }
        },
        _group: {
          _group: {
            name: {},
            report_type: {},
            paperformat_id: { invisible: [['report_type', 'not in', ['qweb-pdf']]] }
          },
          _group_728: {
            model: {},
            report_name: {},
            print_report_name: {}
          }
        },
        _notebook: {
          _page_security: {
            _attr: {
              name: 'security',
              string: 'Security'
            },
            groups_id: {}
          },
          _page_advanced: {
            _attr: {
              name: 'advanced',
              string: 'Advanced Properties'
            },
            _group: {
              attachment_use: {},
              attachment: {}
            }
          }
        }
      }
    }
  },

  act_report_xml_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.report',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        model: {},
        type: {},
        report_name: {},
        report_type: {},
        attachment: {}
      }
    }
  },

  act_report_xml_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.report',
    type: 'search',
    arch: {
      name: {
        string: 'Report',
        filter_domain: { todo_ctx: "['|', '|', '|', '|', ('name','ilike',self), ('model','ilike',self), ('type','ilike',self), ('report_name','ilike',self), ('report_type','ilike',self)]" }
      },
      model: {
        string: 'Model',
        filter_domain: { todo_ctx: "[('model','=', self)]" }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_report_type: {
          _attr: {
            name: 'report_type',
            string: 'Report Type',
            domain: [],
            context: { group_by: 'report_type' }
          }
        },
        _filter_report_model: {
          _attr: {
            name: 'report_model',
            string: 'Report Model',
            domain: [],
            context: { group_by: 'model' }
          }
        }
      }
    }
  },

  ir_action_report: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Reports',
    type: 'ir.actions.act_window',
    res_model: 'ir.actions.report',
    search_view_id: 'act_report_xml_search_view',
    views: {
      tree: 'act_report_xml_view_tree',
      form: '=======todo=========='
    }
  }
}
