const purchase_order_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.button_approve = async (id, fields = {}, force = false, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'button_approve',
        args: [id, force],
        kwargs,
      },
      fields
    );
  };

  cls.button_draft = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'button_draft',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.button_confirm = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'button_confirm',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.button_cancel = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'button_cancel',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.button_unlock = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'button_unlock',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.button_done = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'button_done',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.action_set_date_planned = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_set_date_planned',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  return cls;
};

export default {
  models: {
    'purchase.order': {
      fields: [
        'name',
        'origin',
        'partner_ref',
        'date_order',
        'date_approve',
        'partner_id',
        'dest_address_id',
        //  'currency_id',
        'state',
        'order_line',
        'notes',
        'invoice_count',
        'invoice_ids',
        'invoice_status',
        'date_planned',
        'amount_untaxed',
        'amount_tax',
        'amount_total',
        //  'fiscal_position_id',
        //  'payment_term_id',
        //  'incoterm_id',
        'product_id',
        'user_id',
        'company_id',
      ],

      extend: purchase_order_extend,
    },

    'purchase.order.line': {
      fields: [
        'name',
        'sequence',
        'product_qty',
        'product_uom_qty',
        'date_planned',
        'product_uom',
        'product_id',
        //  'product_image',
        'product_type',
        'price_unit',
        'price_subtotal',
        'price_total',
        'price_tax',
        'order_id',
        'account_analytic_id',
        'analytic_tag_ids',
        'company_id',
        'state',
        'invoice_lines',
        'qty_invoiced',
        'qty_received',
        'partner_id',
        //    'currency_id',
        'date_order',
      ],
    },
  },
};
