export default {
  sale_order_cancel_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order.cancel',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          render_model: {
            invisible: '1'
          },
          order_id: {
            invisible: '1'
          },
          template_id: {
            invisible: '1'
          },
          display_invoice_alert: {
            invisible: '1'
          },
          _div: {
            _attr: {
              class: 'alert alert-warning'
            },
            _span: {
              _attr: {
                text: 'Are you sure you want to cancel this order?'
              },
              _br: {}
            },
            _span_573: {
              _attr: {
                invisible: [['display_invoice_alert', '=', false]],
                text: 'Draft invoices for this order will be cancelled.'
              },
              _br: {}
            }
          },
          _group: {
            recipient_ids: {
              widget: 'many2many_tags_email',
              context: {
                force_email: true,
                show_email: true,
                no_create_edit: true
              }
            }
          },
          _group_318: {
            subject: {
              placeholder: 'Subject'
            }
          },
          body: {
            class: 'oe-bordered-editor',
            options: "{'style-inline': true}"
          }
        },
        _footer: {
          _button_action_send_mail_and_cancel: {
            _attr: {
              name: 'action_send_mail_and_cancel',
              type: 'object',
              string: 'Send and cancel',
              class: 'btn-primary'
            }
          },
          _button_action_cancel: {
            _attr: {
              name: 'action_cancel',
              type: 'object',
              string: 'Cancel',
              class: 'btn-primary mx-1'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
