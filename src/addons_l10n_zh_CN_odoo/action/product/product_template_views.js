export default {
  product_template_only_form_view: {
    arch: {
      sheet: {
        _notebook: {
          _page_variants: {
            _p: {
              _strong: { _attr: { text: '警告' } },
              _span: {
                _attr: {
                  text: ': adding or deleting attributes will delete and recreate existing variants and lead to the loss of their possible customizations.'
                }
              }
            }
          }
        }
      }
    }
  },

  product_template_form_view: {
    arch: {
      header: {
        buttons: {
          action_open_label_layout: { string: '打印标签' }
        }
      },
      sheet: {
        product_variant_count: { invisible: 1 },
        is_product_variant: { invisible: 1 },
        type: { invisible: 1 },
        company_id: { invisible: 1 },
        _div_button_box: {
          _button_open_pricelist_rules: {
            _span_text: {
              _attr: {
                text: '额外价格'
              }
            },
            _span_text2: {
              _attr: {
                text: '额外价格'
              }
            }
          }
        },

        _widget: {
          _attr: {
            title: '已归档'
          }
        },

        _div_title: {
          _h1: {
            name: {
              string: '产品名称',
              placeholder: 'e.g. Cheese Burger'
            }
          }
        },

        _notebook: {
          _page_general_information: {
            _attr: {
              string: '通用信息'
            },
            _group_general_information: {
              _group_group_general: {
                product_tooltip: { string: '' }
              },
              _group_group_standard_price: {
                _div_standard_price: {
                  _span: {
                    _attr: { text: '每' }
                  }
                },

                categ_id: { string: '产品类别' }
              }
            },
            _group_note: {
              _attr: { string: '内部备注' },
              description: {
                placeholder: 'This note is only for internal purposes.'
              }
            }
          },

          _page_sales: {
            _attr: {
              string: '销售'
            },
            _group_sale: {
              _group_upsell: {
                _attr: {
                  string: '超卖 & 交叉销售'
                }
              }
            },
            _group: {
              _group_description: {
                _attr: {
                  string: '销售描述'
                },
                description_sale: {
                  placeholder:
                    'This note is added to sales orders and invoices.'
                }
              }
            }
          },

          _page_purchase: {
            _attr: {
              string: '采购'
            },
            _group_purchase: {
              _group_bill: {
                _attr: {
                  string: '供应商账单'
                }
              }
            }
          },

          _page_inventory: {
            _attr: {
              string: '库存'
            },
            _group_inventory: {
              _group_group_lots_and_weight: {
                _attr: {
                  string: '物流'
                },

                _div_volume: {
                  volume: { string: '体积' }
                }
              }
            },
            _group_packaging: {
              _attr: {
                string: '包装'
              }
            }
          }
        }
      }
    }
  },

  product_template_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return [
              '|',
              '|',
              '|',
              ['default_code', 'ilike', self],
              ['product_variant_ids.default_code', 'ilike', self],
              ['name', 'ilike', self],
              ['barcode', 'ilike', self]
            ]
          }
        },

        categ_id: {
          filter_domain: raw_value => {
            return [['categ_id', 'child_of', raw_value]]
          }
        }
      },

      filters: {
        group_type: {
          services: { string: '服务', domain: [['type', '=', 'service']] },
          consumable: {
            string: '产品',
            domain: [['type', 'in', ['consu', 'product']]]
          }
        },

        group_sell_purchase: {
          filter_to_sell: {
            string: '可销售',
            domain: [['sale_ok', '=', true]]
          },
          filter_to_purchase: {
            string: '可采购',
            domain: [['purchase_ok', '=', true]]
          }
        },
        group_favorites: {
          favorites: { string: '收藏', domain: [['priority', '=', '1']] }
        },
        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  }
}
