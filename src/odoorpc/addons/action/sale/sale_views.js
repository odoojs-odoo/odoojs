export default {
  view_order_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'tree',
    priority: 2,
    fields: {
      message_needaction: { invisible: '1' },
      name: {},
      create_date: { widget: 'date' },
      date_order: { widget: 'date' },
      commitment_date: { optional: 'hide' },
      expected_date: { optional: 'hide' },
      partner_id: {},
      user_id: { optional: 'show', widget: 'many2one_avatar_user' },
      team_id: { optional: 'hide' },
      company_id: { groups: 'base.group_multi_company', optional: 'show' },
      amount_untaxed: { widget: 'monetary', optional: 'hide' },
      amount_tax: { widget: 'monetary', optional: 'hide' },
      amount_total: { widget: 'monetary', optional: 'show' },
      currency_id: { invisible: '1' },
      invoice_status: {
        widget: 'badge'
        // decoration-success="invoice_status == 'invoiced'"
        // decoration-info="invoice_status == 'to invoice'"
        // decoration-warning="invoice_status == 'upselling'"
      },
      tag_ids: { widget: 'many2many_tags', optional: 'hide' },
      state: { invisible: '1' }
    }
  },

  view_order_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'form',
    toolbar: {
      action: {
        // 在数据库中 找到 所有绑定到该模型的 action
        // select * from ir_actions where binding_model_id = ?
        // model_account_move
        //
        //
        // action_invoice_order_generate_link
      },
      print: {
        // odoo 原生是 report kanban
        // 需要 前端自定义
      }
    },

    arch: {
      header: {
        buttons: [
          {
            name: 'action_view_sale_advance_payment_inv',
            string: 'Create Invoice',
            type: 'action',
            btn_type: 'primary',
            invisible: ({ record }) => {
              // 'invisible':
              // [('invoice_status', '!=', 'to invoice')]
              const { invoice_status } = record
              return invoice_status !== 'to invoice'
            }
          },
          {
            name: 'action_view_sale_advance_payment_inv',
            string: 'Create Invoice',
            type: 'action',
            context: { default_advance_payment_method: 'percentage' },
            invisible: ({ record }) => {
              // 'invisible': ['|',('invoice_status', '!=', 'no'),
              //  ('state', '!=', 'sale')]
              const { invoice_status, state } = record
              return invoice_status !== 'no' || state !== 'sale'
            }
          },

          {
            name: 'action_quotation_send',
            string: 'Send by Email',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              // states: 'draft',
              const { state } = record
              return state !== 'draft'
            }
          },
          {
            name: 'action_quotation_send',
            string: 'Send PRO-FORMA Invoice',
            type: 'object',
            groups: 'sale.group_proforma_sales',
            btn_type: 'primary',
            invisible: ({ record }) => {
              // 'invisible': ['|', ('state', '!=', 'draft'),
              // ('invoice_count','&gt;=',1)]
              const { state, invoice_count } = record
              return state !== 'draft' || invoice_count >= 1
            },
            // context="{'proforma': True, 'validate_analytic': True}
            context: { proforma: true, validate_analytic: true }
          },

          {
            name: 'action_confirm',
            string: 'Confirm',
            type: 'object',
            btn_type: 'primary',
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              // 'invisible': [('state', 'not in', ['sent'])]
              const { state } = record
              return state !== 'sent'
            }
          },

          {
            name: 'action_confirm',
            string: 'Confirm',
            type: 'object',
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              // 'invisible': [('state', 'not in', ['draft'])]
              const { state } = record
              return state !== 'draft'
            }
          },

          {
            name: 'action_quotation_send',
            string: 'Send PRO-FORMA Invoice',
            type: 'object',
            groups: 'sale.group_proforma_sales',
            invisible: ({ record }) => {
              // 'invisible': ['|', ('state', '=', 'draft'),
              // ('invoice_count','&gt;=',1)]}"
              const { state, invoice_count } = record
              return state === 'draft' || invoice_count >= 1
            },
            // context="{'proforma': True, 'validate_analytic': True}"/>
            context: { proforma: true, validate_analytic: true }
          },

          {
            name: 'action_quotation_send',
            string: 'Send by Email',
            type: 'object',
            // context="{'validate_analytic': True}"
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              // states="sent,sale"
              const { state } = record
              return !['sent', 'sale'].includes(state)
            }
          },

          {
            name: 'action_cancel',
            string: 'Cancel',
            type: 'object',
            invisible: ({ record }) => {
              // 'invisible': ['|',
              // ('state', 'not in', ['draft', 'sent','sale']),
              // ('id', '=', False)]
              const { id: res_id, state } = record
              return !['draft', 'sent', 'sale'].includes(state) || !res_id
            }
          },

          {
            name: 'action_draft',
            string: 'Set to Quotation',
            type: 'object',
            invisible: ({ record }) => {
              // states: 'cancel',
              const { state } = record
              return state !== 'cancel'
            }
          }
        ],

        fields: {
          state: { widget: 'statusbar', statusbar_visible: 'draft,sent,sale' }
        }
      },

      sheet: {
        _title: {
          display_name: {},
          state: { invisible: '1' }
        },
        _group_warning: {
          _span: 2,
          _groups:
            'account.group_account_invoice,account.group_account_readonly',
          _invisible: ({ record }) => {
            // 'invisible': [('partner_credit_warning', '=', '')]
            const { partner_credit_warning } = record
            return !partner_credit_warning
          },
          partner_credit_warning: {}
        },

        _group_button_box: {
          // button_box 需要 定义 button, 而非 field
          // 因此 form 需要支持:
          // _group  这种格式的是 tag
          // _group 的 下一级:
          //   field 是 字段
          //   _span 是属性   // 需要区分 属性和还是 子节点
          //   _button 是字段
          //   _html 是纯文本
          // field 的下一级:
          //   常规 field 的定义
          _span: 2,
          invoice_count: {
            widget: 'statinfo',
            string: 'Invoices',
            button_click: { name: 'action_view_invoice', type: 'object' },
            invisible: ({ record }) => {
              // 'invisible': [('invoice_count', '=', 0)]
              const { invoice_count } = record
              return !invoice_count
            }
          }
          // action_preview_sale_order 预览
        },

        _group_name: { _span: 2, name: {} },

        _group_partner_details: {
          partner_id: {
            widget: 'res_partner_many2one',
            //  context="{'res_partner_search_mode': 'customer',
            // 'show_address': 1, 'show_vat': True}"

            context: {
              res_partner_search_mode: 'customer',
              show_address: 1,
              show_vat: true
            }
          },
          partner_invoice_id: {
            groups: 'account.group_delivery_invoice_address',
            // context="{'default_type':'invoice'}"
            context: { default_type: 'invoice' },
            domain: []
          },
          partner_shipping_id: {
            groups: 'account.group_delivery_invoice_address',
            // context="{'default_type':'delivery'}"
            context: { default_type: 'delivery' },
            domain: []
          }
        },

        _group_order_details: {
          validity_date: {
            invisible: ({ record }) => {
              // 'invisible': [('state', 'in', ['sale', 'done'])]
              const { state } = record
              return ['sale', 'done'].includes(state)
            }
          },

          date_order: {
            groups: 'base.group_no_one',
            string({ record }) {
              // 'Quotation Date' 'invisible': [('state', 'in', ['sale', 'done', 'cancel'])]
              // Order Date 'invisible': [('state', 'in', ['draft', 'sent'])]
              const { state } = record

              if (!['sale', 'done', 'cancel'].includes(state)) {
                return 'Quotation Date'
              } else if (!['draft', 'sent'].includes(state)) {
                return 'Order Date'
              } else {
                return 'Order Date'
              }
            }
          },

          show_update_pricelist: { invisible: 1 },
          pricelist_id: {
            widget: 'many2one_button',
            _widget_button: {
              name: 'action_update_prices',
              type: 'object'
            }
            // <button name="action_update_prices" type="object"
            // string=" Update Prices"
            // help="Recompute all prices based on this pricelist"
            // class="btn-link mb-1 px-0" icon="fa-refresh"
            // confirm="This will update all unit prices based on the currently set pricelist."
            // attrs="{'invisible': ['|', ('show_update_pricelist', '=', False), ('state', 'in', ['sale', 'done', 'cancel'])]}"/>
          },

          company_id: { invisible: 1 },
          currency_id: { invisible: 1 },
          // pricelist_id: { invisible: 1 },
          tax_country_id: { invisible: 1 },
          payment_term_id: {}
        },

        _group_order_lines: {
          _span: 2,
          order_line: {
            widget: 'x2many_tree',
            label: '明细行',
            string: '',

            readonly: ({ record }) => {
              // 'readonly': [('state', 'in', ('done','cancel'))]
              const { state } = record
              return ['done', 'cancel'].includes(state)
            },

            views: {
              tree: {
                fields: {
                  sequence: { widget: 'handle' },
                  display_type: { invisible: 1 },
                  product_uom_category_id: { invisible: 1 },
                  product_type: { invisible: 1 },
                  currency_id: { invisible: 1 },
                  product_updatable: { invisible: 1 },
                  product_id: {
                    widget: 'sol_product_many2one',
                    readonly: ({ record }) => {
                      // 'readonly': [('product_updatable', '=', False)],
                      const { product_updatable } = record
                      return !product_updatable
                    },
                    required: ({ record }) => {
                      // 'required': [('display_type', '=', False)],
                      const { display_type } = record
                      return !display_type
                    },

                    context: ({ record }) => {
                      //   context="{
                      //     'partner_id': parent.partner_id,
                      //     'quantity': product_uom_qty,
                      //     'pricelist': parent.pricelist_id,
                      //     'uom':product_uom,
                      //     'company_id': parent.company_id,
                      //     'default_lst_price': price_unit,
                      //     'default_description_sale': name
                      // }"
                      const {
                        parent: prt,
                        product_uom_qty,
                        product_uom,
                        price_unit,
                        name
                      } = record
                      return {
                        partner_id: prt.partner_id,
                        quantity: product_uom_qty,
                        pricelist: prt.pricelist_id,
                        uom: product_uom,
                        company_id: prt.company_id,
                        default_lst_price: price_unit,
                        default_description_sale: name
                      }
                    },

                    domain: ({ record }) => {
                      // domain="[('sale_ok', '=', True), '|',
                      // ('company_id', '=', False),
                      // ('company_id', '=', parent.company_id)]"
                      const { parent: prt } = record
                      return [
                        ['sale_ok', '=', true],
                        '|',
                        ['company_id', '=', false],
                        ['company_id', '=', prt.company_id]
                      ]
                    }
                  },
                  product_template_id: { invisible: '1' },
                  name: { widget: 'section_and_note_text', optional: 'show' },
                  analytic_distribution: {
                    widget: 'analytic_distribution',
                    groups: 'analytic.group_analytic_accounting',
                    optional: 'hide'
                  },
                  product_uom_qty: {
                    // widget: ''
                    // 查看库存?
                  },
                  qty_delivered: {
                    optional: 'show',

                    invisible: ({ record }) => {
                      // 'column_invisible': [('parent.state', 'not in', ['sale', 'done'])],
                      const { parent: prt } = record
                      return !['sale', 'done'].includes(prt.state)
                    },

                    readonly: ({ record }) => {
                      // 'readonly': [('qty_delivered_method', '!=', 'manual')]
                      const { qty_delivered_method } = record
                      return qty_delivered_method !== 'manual'
                    }
                  },
                  qty_delivered_method: { invisible: 1 },
                  qty_invoiced: {
                    optional: 'show',
                    invisible: ({ record }) => {
                      // 'column_invisible': [('parent.state', 'not in', ['sale', 'done'])],
                      const { parent: prt } = record
                      return !['sale', 'done'].includes(prt.state)
                    }
                  },
                  qty_to_invoice: { invisible: '1' },
                  product_uom_readonly: { invisible: '1' },
                  // product_uom: { invisible: '1' },
                  product_uom: {
                    optional: 'show',
                    groups: 'uom.group_uom'
                    // 'readonly': [('product_uom_readonly', '=', True)],
                    // 'required': [('display_type', '=', False)],
                    // context="{'company_id': parent.company_id}"
                  },
                  customer_lead: { optional: 'hide' },
                  product_packaging_qty: {
                    groups: 'product.group_stock_packaging',
                    optional: 'show',
                    invisible: ({ record }) => {
                      // 'invisible': ['|', ('product_id', '=', False),
                      // ('product_packaging_id', '=', False)]
                      const { product_id, product_packaging_id } = record
                      return !product_id || !product_packaging_id
                    }
                  },
                  product_packaging_id: {
                    groups: 'product.group_stock_packaging',
                    optional: 'show',
                    // context="{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}
                    invisible: ({ record }) => {
                      // 'invisible': [('product_id', '=', False)]}"
                      const { product_id } = record
                      return !product_id
                    }
                  },
                  price_unit: {
                    // 'readonly': [('qty_invoiced', '&gt;', 0)]
                  },
                  tax_id: {
                    widget: 'many2many_tags'
                    // domain="[('type_tax_use','=','sale'),
                    // ('company_id','=',parent.company_id),
                    // ('country_id', '=', parent.tax_country_id)]"
                    //  context="{'active_test': True}"
                    // 'readonly': [('qty_invoiced', '&gt;', 0)]
                  },
                  discount: {
                    widget: 'sol_discount',
                    groups: 'product.group_discount_per_so_line',
                    optional: 'show'
                  },
                  is_downpayment: { invisible: '1' },
                  price_subtotal: {
                    widget: 'monetary',
                    groups: 'account.group_show_line_subtotals_tax_excluded',
                    invisible: ({ record }) => {
                      // 'invisible': [('is_downpayment', '=', True)]
                      const { is_downpayment } = record
                      return is_downpayment
                    }
                  },
                  price_total: {
                    widget: 'monetary',
                    groups: 'account.group_show_line_subtotals_tax_included',
                    invisible: ({ record }) => {
                      // 'invisible': [('is_downpayment', '=', True)]
                      const { is_downpayment } = record
                      return is_downpayment
                    }
                  },
                  state: { invisible: '1' },
                  invoice_status: { invisible: '1' },
                  // currency_id: { invisible: '1' },
                  price_tax: { invisible: '1' },
                  company_id: { invisible: '1' }
                }
              },

              form: {
                arch: {
                  sheet: {
                    _group_invisible: {
                      _span: 2,
                      display_type: { invisible: '1' },
                      sequence: { invisible: '1' },
                      product_uom_category_id: { invisible: '1' }
                    },
                    _group_product: {
                      _invisible({ record }) {
                        // 'invisible': [('display_type', '!=', False)]
                        const { display_type } = record
                        return display_type
                      },

                      product_updatable: { invisible: '1' },
                      product_id: {
                        widget: 'many2one_barcode',
                        // domain="[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"

                        readonly: ({ record }) => {
                          // 'readonly': [('product_updatable', '=', False)],
                          const { product_updatable } = record
                          return !product_updatable
                        },
                        required: ({ record }) => {
                          // 'required': [('display_type', '=', False)],
                          const { display_type } = record
                          return !display_type
                        },

                        context: ({ record }) => {
                          // context="{
                          // 'partner_id': parent.partner_id,
                          // 'quantity': product_uom_qty,
                          // 'pricelist': parent.pricelist_id,
                          // 'uom': product_uom,
                          // 'company_id': parent.company_id

                          const {
                            parent: prt,
                            product_uom_qty,
                            product_uom
                          } = record
                          return {
                            partner_id: prt.partner_id,
                            quantity: product_uom_qty,
                            pricelist: prt.pricelist_id,
                            uom: product_uom,
                            company_id: prt.company_id
                          }
                        },

                        domain: ({ record }) => {
                          // domain="[('sale_ok', '=', True),
                          // '|',
                          // ('company_id', '=', False),
                          // ('company_id', '=', parent.company_id)]"
                          const { parent: prt } = record
                          return [
                            ['sale_ok', '=', true],
                            '|',
                            ['company_id', '=', false],
                            ['company_id', '=', prt.company_id]
                          ]
                        }
                      },

                      product_type: { invisible: '1' },
                      invoice_status: { invisible: '1' },
                      qty_to_invoice: { invisible: '1' },
                      qty_delivered_method: { invisible: '1' },
                      price_total: { invisible: '1' },
                      price_tax: { invisible: '1' },
                      price_subtotal: { invisible: '1' },
                      product_uom_readonly: { invisible: '1' },
                      product_uom_qty: {
                        // context="{'partner_id':parent.partner_id,
                        // 'quantity':product_uom_qty, 'pricelist':parent.pricelist_id,
                        // 'uom':product_uom, 'uom_qty_change':True,
                        // 'company_id': parent.company_id}"
                      },
                      product_uom: {
                        groups: 'uom.group_uom',

                        readonly: ({ record }) => {
                          // 'readonly': [('product_uom_readonly', '=', True)],
                          const { product_uom_readonly } = record
                          return product_uom_readonly
                        },
                        required: ({ record }) => {
                          // 'required': [('display_type', '=', False)],
                          const { display_type } = record
                          return !display_type
                        }
                      },

                      qty_delivered: {
                        string: 'Delivered',
                        readonly({ record }) {
                          // 'readonly': [('qty_delivered_method', '!=', 'manual')]
                          const { qty_delivered_method } = record
                          return qty_delivered_method !== 'manual'
                        },
                        invisible({ record }) {
                          // 'invisible': [('parent.state', 'not in', ['sale', 'done'])]
                          const { parent: prt } = record
                          return !['sale', 'done'].includes(prt.state)
                        }
                      },

                      qty_invoiced: {
                        string: 'Invoiced',
                        invisible({ record }) {
                          // 'invisible': [('parent.state', 'not in', ['sale', 'done'])]
                          const { parent: prt } = record
                          return !['sale', 'done'].includes(prt.state)
                        }
                      },
                      product_packaging_id: {
                        groups: 'product.group_stock_packaging'
                      },
                      price_unit: {},
                      tax_id: {
                        widget: 'many2many_tags',
                        readonly({ record }) {
                          //'readonly': [('qty_invoiced', '&gt;', 0)]
                          const { qty_invoiced } = record
                          return qty_invoiced > 0
                        },
                        domain({ record }) {
                          // domain="[('type_tax_use','=','sale'),
                          // ('company_id','=',parent.company_id),
                          // ('country_id', '=', parent.tax_country_id)]"
                          const { parent: prt } = record
                          return [
                            ['type_tax_use', '=', 'sale'],
                            ['company_id', '=', prt.company_id],
                            ['country_id', '=', prt.tax_country_id]
                          ]
                        }
                        //  context="{'search_view_ref': 'account.account_tax_view_search'}"
                      },
                      discount: {
                        groups: 'product.group_discount_per_so_line'
                      },
                      sequence: { invisible: '1' }
                    },

                    _group_lead: {
                      _invisible: ({ record }) => {
                        // 'invisible': [('display_type', '!=', False)]
                        const { display_type } = record
                        return display_type
                      },
                      customer_lead: {
                        // widget  天
                      },
                      analytic_distribution: {
                        widget: 'analytic_distribution',
                        groups: 'analytic.group_analytic_accounting'
                      }
                    },

                    _group_name: {
                      _span: 2,
                      name: {
                        string({ record }) {
                          // Section Name (eg. Products, Services)
                          //  'invisible': [('display_type', '!=', 'line_section')]}"/>
                          // string="Note"
                          //  'invisible': [('display_type', '!=', 'line_note')]}"/>
                          // Description: 'invisible': [('display_type', '!=', False)]
                          const { display_type } = record
                          if (display_type === 'line_section') {
                            return 'Section Name (eg. Products, Services)'
                          } else if (display_type === 'line_note') {
                            return 'Note'
                          } else if (!display_type) {
                            return 'Description'
                          } else {
                            return 'Description'
                          }
                        },
                        invisible: ({ record }) => {
                          // 'invisible': [('display_type', '!=', 'line_note')]
                          const { display_type } = record
                          return display_type !== 'line_note'
                        }
                      },
                      state: { invisible: '1' },
                      company_id: { invisible: '1' }
                    },

                    _group_invoice_lines: {
                      _span: 2,
                      _groups: 'base.group_no_one',
                      _invisible: ({ record }) => {
                        // 'invisible': [('display_type', '!=', False)]
                        const { display_type } = record
                        return display_type
                      },

                      invoice_lines: {
                        label: '结算单明细',
                        string: ''
                      }
                    }
                  }
                }
              }
            }
          }
        },

        _group_sales_person: {
          user_id: { widget: 'many2one_avatar_user' },
          team_id: {},
          company_id: {},
          require_signature: {},
          require_payment: {},
          reference: {
            readonly: '1',
            invisible: ({ record }) => {
              // 'invisible': [('reference', '=', False)]
              const { reference } = record
              return !reference
            }
          },
          client_order_ref: {},
          tag_ids: { widget: 'many2many_tags' }
        },

        _group_sale_info: {
          show_update_fpos: { invisible: '1' },
          fiscal_position_id: {
            widget: 'many2one_button'
            // <button name="action_update_taxes" type="object"
            // string=" Update Taxes"
            // help="Recompute all taxes based on this fiscal position"
            // class="btn-link mb-1 px-0" icon="fa-refresh"
            // confirm="This will update all taxes based on the currently selected fiscal position."
            // attrs="{'invisible': ['|', ('show_update_fpos', '=', False), ('state', 'in', ['sale', 'done','cancel'])]}"/>
          },
          partner_invoice_id: { invisible: '1' },
          analytic_account_id: {
            readonly: ({ record }) => {
              // 'readonly': [('invoice_count','!=',0),('state','=','sale')]
              const { invoice_count, state } = record
              return invoice_count && state === 'sale'
            }
          },
          invoice_status: {
            invisible: ({ record }) => {
              // states="sale,done"
              const { state } = record
              return !['sale', 'done'].includes(state)
            }
          }
        },

        _group_sale_shipping: {
          commitment_date: {},
          expected_date: { widget: 'date' }
        },

        _group_technical: {
          origin: {}
        },

        _group_utm_link: {
          campaign_id: {},
          medium_id: {},
          source_id: {}
        },

        _group_customer_signature: {
          _invisible: ({ record }) => {
            // 'invisible': [('require_signature', '=', False),
            // ('signed_by', '=', False), ('signature', '=', False),
            // ('signed_on', '=', False)]
            const { require_signature, signed_by, signature, signed_on } =
              record
            return !require_signature && !signed_by && !signature && !signed_on
          },
          signed_by: {},
          signed_on: {},
          signature: { widget: 'image' }
        }
      }
    }
  },

  view_sales_order_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Order',
          filter_domain: self => {
            // filter_domain="['|', '|',
            // ('name', 'ilike', self),
            // ('client_order_ref', 'ilike', self),
            // ('partner_id', 'child_of', self)]"
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['client_order_ref', 'ilike', self],
              ['partner_id', 'child_of', self]
            ]
          }
        },
        partner_id: { operator: 'child_of' },
        user_id: {},
        team_id: {},
        order_line: {
          string: '产品',
          filter_domain: self => {
            // filter_domain="[('order_line.product_id', 'ilike', self)]
            return [['order_line.product_id', 'ilike', self]]
          }
        },
        analytic_account_id: {},
        campaign_id: {}
      },

      filters: {
        group_me: {
          my_sale_orders_filter: {
            string: 'My Orders',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          }
        },
        group_state: {
          draft: {
            string: 'Quotations',
            // domain="[('state','in',('draft', 'sent'))]
            domain: [['state', 'in', ['draft', 'sent']]]
          },
          sales: {
            string: 'Sales Orders',
            // domain="[('state','in',('sale','done'))]
            domain: [['state', 'in', ['sale', 'done']]]
          }
        },

        group_invoice: {
          to_invoice: {
            string: 'To Invoice',
            // domain="[('invoice_status','=','to invoice')]
            domain: [['invoice_status', '=', 'to invoice']]
          },
          upselling: {
            string: 'To Upsell',
            // domain="[('invoice_status','=','upselling')]
            domain: [['invoice_status', '=', 'upselling']]
          }
        },
        group_date: {
          filter_create_date: { string: 'Create Date', date: 'create_date' },
          order_date: { string: 'Order Date', date: 'date_order' }
        }
      }
    }
  },

  action_orders: {
    _odoo_model: 'ir.actions',
    name: 'Sales Orders',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'view_sales_order_filter',
    // search_view_id: 'sale_order_view_search_inherit_sale',
    domain: [['state', 'not in', ['draft', 'sent', 'cancel']]],
    context: {},
    views: {
      tree: 'view_order_tree',
      form: 'view_order_form'
    }
  },

  action_quotations_with_onboarding: {
    _odoo_model: 'ir.actions',
    name: 'Quotations',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'view_sales_order_filter',
    domain: [],
    context: { search_default_my_sale_orders_filter: 1 },
    views: {
      tree: 'view_order_tree',
      form: 'view_order_form'
    }
  }
}
