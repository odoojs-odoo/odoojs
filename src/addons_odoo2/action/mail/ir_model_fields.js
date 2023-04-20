export default {
  field_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.fields',
    inherit_id: 'base.view_model_fields_form',
    arch: {
      sheet: {
        copied: {
          position: 'after',
          __todo__after: {
            state: {
              invisible: '1'
            },
            tracking: {
              readonly: [['state', '!=', 'manual']]
            }
          }
        }
      }
    }
  }
}
