export default {
  action_sale_order_generate_link: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Generate a Payment Link',
    res_model: 'payment.link.wizard',
    views: {
      tree: 'payment.payment_link_wizard_view_form',
      form: '=======todo=========='
    }
  }
}
