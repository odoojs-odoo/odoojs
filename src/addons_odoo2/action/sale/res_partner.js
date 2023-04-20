export default {
  crm_lead_partner_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.res_partner_kanban_view',
    arch: {
      sheet: {
        mobile: {
          position: 'after',
          __todo__after: {
            sale_order_count: {
              groups: 'sales_team.group_sale_salesman'
            }
          }
        },
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_kanban_bottom_left')]",
            position: 'inside'
          },
          _a: {
            _attr: {
              groups: 'sales_team.group_sale_salesman',
              class: 'oe_kanban_action oe_kanban_action_a me-1'
            },
            _span: {
              _attr: {
                class: 'badge rounded-pill'
              },
              _i: {
                _attr: {
                  title: 'Sales orders',
                  class: 'fa fa-fw fa-usd'
                }
              },
              _t: {}
            }
          }
        }
      }
    }
  },

  res_partner_view_buttons: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          _button_action_view_sale_order: {
            _attr: {
              name: 'action_view_sale_order',
              type: 'object',
              icon: 'fa-usd',
              groups: 'sales_team.group_sale_salesman',
              class: 'oe_stat_button'
            },
            sale_order_count: {
              string: 'Sales',
              widget: 'statinfo'
            }
          }
        },
        _xpath: {
          _attr: {
            expr: "//page[@name='internal_notes']//field[@name='comment']",
            position: 'after'
          },
          _group: {
            _attr: {
              groups: 'sales_team.group_sale_salesman'
            },
            _group: {
              _attr: {
                groups: 'sale.group_warning_sale'
              },
              _separator: {
                _attr: {
                  string: 'Warning on the Sales Order'
                }
              },
              sale_warn: {
                required: '1'
              },
              sale_warn_msg: {
                string: 'Message',
                required: [['sale_warn', '!=', false], ['sale_warn', '!=', 'no-message']],
                invisible: [['sale_warn', 'in', (false, 'no-message')]],
                placeholder: 'Type a message...'
              }
            }
          }
        }
      }
    }
  },

  res_partner_view_form_payment_defaultcreditcard: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'payment.view_partners_form_payment_defaultcreditcard',
    arch: {
      sheet: {
        _button_payment__action_payment_token: {
          _attr: {
            name: '%(payment.action_payment_token)d',
            position: 'attributes'
          },
          _attribute_groups: {
            _attr: {
              name: 'groups',
              text: 'sales_team.group_sale_salesman',
              groups: 'sales_team.group_sale_salesman'
            }
          }
        }
      }
    }
  },

  res_partner_view_form_property_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'account.view_partner_property_form',
    arch: {
      sheet: {
        _group_fiscal_information: {
          _attr: {
            name: 'fiscal_information',
            position: 'attributes'
          },
          _attribute_groups: {
            _attr: {
              name: 'groups',
              text: 'account.group_account_invoice, sales_team.group_sale_salesman',
              groups: 'account.group_account_invoice, sales_team.group_sale_salesman'
            }
          }
        },
        property_payment_term_id: {
          position: 'attributes',
          __todo__groups: 'account.group_account_invoice, sales_team.group_sale_salesman'
        },
        property_supplier_payment_term_id: {
          position: 'attributes',
          __todo__groups: 'account.group_account_invoice, sales_team.group_sale_salesman'
        }
      }
    }
  }
}
