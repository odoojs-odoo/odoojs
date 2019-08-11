const sale_order_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.action_invoice_create = async (
    id,
    fields = {},
    grouped = false,
    final = false,
    kwargs = {}
  ) => {
    return cls.call_as_write_read(
      {
        method: 'action_invoice_create',
        args: [id, grouped, final],
        kwargs,
      },
      fields
    );
  };

  cls.action_draft = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_draft',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.action_cancel = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_cancel',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.action_done = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_done',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.action_unlock = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_unlock',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.action_confirm = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_confirm',
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
    'sale.order': {
      fields: [
        'name',
        'origin',
        'client_order_ref',
        'reference',
        'state',
        'date_order',
        //  'validity_date',
        //  'is_expired',
        //  'require_signature',
        //  'require_payment',
        //  'remaining_validity_days',
        //  'create_date',
        //  'confirmation_date',
        'user_id',
        'partner_id',
        //  'partner_invoice_id',
        //  'partner_shipping_id',
        'pricelist_id',
        //  'currency_id',
        'analytic_account_id',
        'order_line',
        'invoice_count',
        'invoice_ids',
        'invoice_status',
        'note',
        'amount_untaxed',
        //  'amount_by_group',
        'amount_tax',
        'amount_total',
        'currency_rate',
        //  'payment_term_id',
        //  'fiscal_position_id',
        'company_id',
        'team_id',
        //  'signature',
        //  'signed_by',
        //  'commitment_date',
        //  'expected_date',
        'amount_undiscounted',
        //  'type_name',
        //  'transaction_ids',
        //  'authorized_transaction_ids',
      ],

      extend: sale_order_extend,
    },

    'sale.order.line': {
      fields: [
        'order_id',
        'name',
        'sequence',
        'invoice_lines',
        'invoice_status',
        'price_unit',
        'price_subtotal',
        'price_tax',
        'price_total',
        'price_reduce',
        'tax_id',
        //  'price_reduce_taxinc',
        //  'price_reduce_taxexcl',
        'discount',
        'product_id',
        'product_updatable',
        'product_uom_qty',
        'product_uom',
        //  'product_custom_attribute_value_ids',
        //  'product_no_variant_attribute_value_ids',
        //  'product_image',
        'qty_delivered_method',
        'qty_delivered',
        'qty_delivered_manual',
        'qty_to_invoice',
        'qty_invoiced',
        'untaxed_amount_invoiced',
        'untaxed_amount_to_invoice',
        'salesman_id',
        'currency_id',
        'company_id',
        'order_partner_id',
        'analytic_tag_ids',
        'analytic_line_ids',
        'is_expense',
        'is_downpayment',
        'state',
        'customer_lead',
        //  'display_type',
      ],
    },
  },
};
