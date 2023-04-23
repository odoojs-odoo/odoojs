export default {
  view_account_position_template_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position.template',
    type: 'search',
    arch: {
      fields: {
        name: { string: 'Fiscal Position Template' }
      }
    }
  },

  view_account_position_template_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position.template',
    type: 'form',
    arch: {
      sheet: {
        _group_name: {
          name: {},
          chart_template_id: {}
        },

        tax_ids: {
          widget: 'x2many_tree',
          views: {
            tree: {
              arch: {
                sheet: {
                  tax_src_id: {},
                  tax_dest_id: {}
                }
              }
            },
            form: {
              arch: {
                sheet: {
                  _group_name: {
                    tax_src_id: {},
                    tax_dest_id: {}
                  }
                }
              }
            }
          }
        },

        account_ids: {
          widget: 'x2many_tree',
          views: {
            tree: {
              arch: {
                sheet: {
                  account_src_id: {},
                  account_dest_id: {}
                }
              }
            },
            form: {
              arch: {
                sheet: {
                  _group_name: {
                    account_src_id: {},
                    account_dest_id: {}
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  view_account_position_template_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position.template',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  action_account_fiscal_position_template: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Fiscal Position Templates',
    type: 'ir.actions.act_window',
    res_model: 'account.fiscal.position.template',
    search_view_id: 'view_account_position_template_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_position_template_tree',
      form: 'view_account_position_template_form'
    }
  }
}
