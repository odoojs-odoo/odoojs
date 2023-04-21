export default {
  resource_calendar_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar',
    inherit_id: 'resource.view_resource_calendar_tree',
    arch: {
      sheet: {
        company_id: {
          position: 'after',
          __todo__after: {
            contracts_count: {}
          }
        }
      }
    }
  },

  resource_calendar_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar',
    inherit_id: 'resource.resource_calendar_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          _button_action_open_contracts: {
            _attr: {
              name: 'action_open_contracts',
              type: 'object',
              icon: 'fa-book',
              groups: 'hr_contract.group_hr_contract_manager',
              class: 'oe_stat_button'
            },
            contracts_count: {
              string: 'Contracts',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  }
}
