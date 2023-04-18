export default {
  crm_team_salesteams_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    inherit_id: 'sales_team.crm_team_view_form',
    arch: {
      sheet: {
        _div_options_active: {
          _attr: {
            name: 'options_active'
          },
          _div: {
            _attr: {
              class: 'o_row'
            },
            use_quotations: {},
            _label_use_quotations: {
              for: 'use_quotations'
            }
          }
        },
        company_id: {
          __todo__after: {
            _label_invoiced_target: {
              for: 'invoiced_target'
            },
            _div: {
              _attr: {
                class: 'o_row'
              },
              invoiced_target: {
                widget: 'monetary',
                class: 'oe_inline',
                currency_field: 'currency_id'
              },
              _span: {
                _attr: {
                  class: 'flex-grow-1',
                  text: '/ Month'
                }
              }
            }
          }
        }
      }
    }
  },

  crm_team_view_kanban_dashboard: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    inherit_id: 'sales_team.crm_team_view_kanban_dashboard',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//templates',
            position: 'before'
          },
          use_quotations: {},
          invoiced_target: {}
        },
        _xpath_962: {
          _attr: {
            expr: "//t[@name='second_options']",
            position: 'after'
          },
          _div: {
            _attr: {
              class: 'row'
            },
            _div: {
              _attr: {
                class: 'col'
              },
              _a_action_quotations_salesteams: {
                _attr: {
                  name: '%(action_quotations_salesteams)d',
                  type: 'action',
                  context: {
                    search_default_draft: true,
                    search_default_sent: true
                  }
                },
                quotations_count: {
                  class: 'me-1'
                },
                _t: 'Quotation',
                _t_921: 'Quotations'
              }
            },
            _div_487: {
              _attr: {
                class: 'col-auto text-truncate'
              },
              quotations_amount: {
                widget: 'monetary'
              }
            }
          },
          _div_orders_to_invoice: {
            _attr: {
              name: 'orders_to_invoice',
              class: 'row'
            },
            _div: {
              _attr: {
                class: 'col-8'
              },
              _a_action_orders_to_invoice_salesteams: {
                _attr: {
                  name: '%(action_orders_to_invoice_salesteams)d',
                  type: 'action'
                },
                sales_to_invoice_count: {
                  class: 'me-1'
                },
                _t: 'Order to Invoice',
                _t_504: 'Orders to Invoice'
              }
            }
          }
        },
        _xpath_415: {
          _attr: {
            expr: "//div[hasclass('o_kanban_primary_bottom')]",
            position: 'after'
          },
          _t: {
            _attr: {
              groups: 'sales_team.group_sale_manager'
            },
            _div: {
              _attr: {
                class: 'col-12 o_kanban_primary_bottom bottom_block'
              },
              invoiced: {
                widget: 'sales_team_progressbar',
                options: "{'current_value': 'invoiced', 'max_value': 'invoiced_target', 'editable': true, 'edit_max_value': true, 'on_change': 'update_invoiced_target'}"
              }
            }
          }
        },
        _xpath_104: {
          _attr: {
            expr: "//div[hasclass('o_kanban_manage_view')]",
            position: 'inside'
          },
          _div: {
            _a_action_quotations_salesteams: {
              _attr: {
                name: '%(action_quotations_salesteams)d',
                type: 'action',
                class: 'o_quotation_view_button',
                text: 'Quotations'
              }
            }
          },
          _div_822: {
            _a_action_orders_salesteams: {
              _attr: {
                name: '%(action_orders_salesteams)d',
                type: 'action',
                text: 'Sales Orders'
              }
            }
          },
          _div_101: {
            _attr: {
              groups: 'account.group_account_invoice'
            },
            _a_action_invoice_salesteams: {
              _attr: {
                name: '%(action_invoice_salesteams)d',
                type: 'action',
                text: 'Invoices'
              }
            }
          }
        },
        _xpath_828: {
          _attr: {
            expr: "//div[hasclass('o_kanban_manage_new')]",
            position: 'inside'
          },
          _div: {
            _a_action_quotation_form: {
              _attr: {
                name: '%(action_quotation_form)d',
                type: 'action',
                text: 'Quotation'
              }
            }
          }
        },
        _div_o_team_kanban_report_separator: {
          _attr: {
            name: 'o_team_kanban_report_separator'
          },
          _div: {
            _a_action_order_report_quotation_salesteam: {
              _attr: {
                name: '%(action_order_report_quotation_salesteam)d',
                type: 'action',
                text: 'Quotations'
              }
            }
          },
          _div_sales_report: {
            _attr: {
              name: 'sales_report'
            },
            _a_action_order_report_so_salesteam: {
              _attr: {
                name: '%(action_order_report_so_salesteam)d',
                type: 'action',
                text: 'Sales'
              }
            }
          },
          _div_invoices_report: {
            _attr: {
              name: 'invoices_report',
              groups: 'account.group_account_invoice'
            },
            _a_action_account_invoice_report_salesteam: {
              _attr: {
                name: '%(action_account_invoice_report_salesteam)d',
                type: 'action',
                text: 'Invoices'
              }
            }
          }
        }
      }
    }
  }
}
