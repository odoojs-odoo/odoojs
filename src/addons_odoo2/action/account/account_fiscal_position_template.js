export default {
  view_account_position_template_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position.template',
    type: 'search',
    arch: {
      name: {
        string: 'Fiscal Position Template'
      }
    }
  },

  view_account_position_template_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position.template',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          chart_template_id: {}
        },
        tax_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  _attr: {
                    string: 'Taxes Mapping'
                  },
                  tax_src_id: {
                    domain: "[('type_tax_use', '!=', None)]"
                  },
                  tax_dest_id: {
                    domain: "[('type_tax_use', '!=', None)]"
                  }
                }
              }
            },
            form: {
              arch: {
                sheet: {
                  _attr: {
                    string: 'Taxes Mapping'
                  },
                  tax_src_id: {
                    domain: "[('type_tax_use', '!=', None)]"
                  },
                  tax_dest_id: {
                    domain: "[('type_tax_use', '!=', None)]"
                  }
                }
              }
            }
          }
        },
        account_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  _attr: {
                    string: 'Accounts Mapping'
                  },
                  account_src_id: {},
                  account_dest_id: {}
                }
              }
            },
            form: {
              arch: {
                sheet: {
                  _attr: {
                    string: 'Accounts Mapping'
                  },
                  account_src_id: {},
                  account_dest_id: {}
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
  }
}
