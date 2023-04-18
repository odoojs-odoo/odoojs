export default {
  stock_valuation_layer_revaluation_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.valuation.layer.revaluation',
    type: 'form',
    arch: {
      sheet: {
        _footer: {
          _button_action_validate_revaluation: {
            _attr: {
              name: 'action_validate_revaluation',
              string: 'Revalue',
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
        },
        _group: {
          _label_current_value_svl: {
            for: 'current_value_svl',
            string: 'Current Value'
          },
          _div: {
            _attr: {
              class: 'o_row'
            },
            _span: {
              current_value_svl: {
                widget: 'monetary',
                class: 'oe_inline'
              },
              current_quantity_svl: {
                class: 'oe_inline'
              },
              product_uom_name: {
                class: 'oe_inline'
              }
            }
          },
          _label_added_value: {
            for: 'added_value',
            string: 'Added Value'
          },
          _div_715: {
            _attr: {
              class: 'o_row'
            },
            _span: {
              added_value: {
                class: 'oe_inline'
              },
              new_value: {
                class: 'oe_inline'
              },
              new_value_by_qty: {
                class: 'oe_inline ms-1'
              },
              product_uom_name: {
                class: 'oe_inline me-1'
              },
              _small: {
                _attr: {
                  class: 'mx-2 fst-italic',
                  text: 'Use a negative added value to record a decrease in the product value'
                }
              }
            }
          },
          company_id: {
            invisible: '1'
          },
          currency_id: {
            invisible: '1'
          },
          product_id: {
            invisible: '1'
          }
        },
        _group_189: {
          property_valuation: {
            invisible: '1'
          },
          _group: {
            reason: {},
            account_journal_id: {
              invisible: [['property_valuation', '!=', 'real_time']],
              required: [['property_valuation', '=', 'real_time']]
            }
          },
          _group_317: {
            account_id: {
              invisible: [['property_valuation', '!=', 'real_time']],
              required: [['property_valuation', '=', 'real_time']]
            },
            date: {
              invisible: [['property_valuation', '!=', 'real_time']]
            }
          }
        }
      }
    }
  }
}
