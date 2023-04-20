export default {
  view_confirm_stock_sms: {
    _odoo_model: 'ir.ui.view',
    model: 'confirm.stock.sms',
    type: 'form',
    arch: {
      buttons: {
        send_sms: {
          name: 'send_sms',
          type: 'object',
          string: 'Confirm',
          btn_type: 'primary'
        },
        dont_send_sms: {
          name: 'dont_send_sms',
          type: 'object',
          string: 'Disable SMS'
        }
      },

      sheet: {
        _div: 'You are about to confirm this Delivery Order by SMS Text Message.',
        _div_2:
          'This feature can easily be disabled from the Settings of Inventory or by clicking on "Disable SMS".'
      }
    }
  },

  action_confirm_stock_sms_wizard: {
    _odoo_model: 'ir.actions.act_window',
    name: 'SMS',
    type: 'ir.actions.act_window',
    res_model: 'confirm.stock.sms',
    domain: [],

    context: {
      active_model: 'stock.picking'
    },
    views: {
      form: 'view_confirm_stock_sms'
    }
  }
}
