export default {
  view_partner_bank_form_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    inherit_id: 'base.view_partner_bank_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//form[@name='bank_account_form']/sheet[1]",
            position: 'after'
          },
          _div: {
            _attr: {
              class: 'oe_chatter'
            },
            message_follower_ids: {
              widget: 'mail_followers'
            },
            message_ids: {
              widget: 'mail_thread'
            },
            activity_ids: {
              widget: 'mail_activity'
            }
          }
        }
      }
    }
  }
}
