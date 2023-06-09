export default {
  hr_departure_wizard_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.departure.wizard',
    inherit_id: 'hr.hr_departure_wizard_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@id='activities_label']",
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0',
              invisible: '0'
            }
          }
        },
        _xpath_573: {
          _attr: {
            expr: "//div[@id='activities']",
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0',
              invisible: '0'
            }
          }
        },
        _xpath_139: {
          _attr: {
            expr: "//field[@name='departure_date']",
            position: 'replace'
          },
          departure_date: { string: 'Contract End Date' }
        },
        _xpath_802: {
          _attr: {
            expr: "//div[@id='activities']",
            position: 'inside'
          },
          _div: {
            set_date_end: {},
            _label_set_date_end: {
              for: 'set_date_end',
              string: 'Contract'
            }
          }
        }
      }
    }
  }
}
