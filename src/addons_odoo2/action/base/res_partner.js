export default {
  view_partner_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'tree',
    arch: {
      sheet: {
        display_name: {
          string: 'Name'
        },
        function: {
          invisible: '1'
        },
        phone: {
          class: 'o_force_ltr'
        },
        email: {},
        user_id: {
          widget: 'many2one_avatar_user',
          domain: [['share', '=', false]]
        },
        city: {},
        state_id: {},
        country_id: {},
        vat: {},
        category_id: {
          widget: 'many2many_tags',
          color_field: 'color'
        },
        company_id: {
          groups: 'base.group_multi_company'
        },
        is_company: {
          invisible: '1'
        },
        parent_id: {
          invisible: '1'
        },
        active: {
          invisible: '1'
        }
      }
    }
  },

  view_partner_simple_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    arch: {
      sheet: {
        is_company: {
          invisible: '1'
        },
        type: {
          invisible: '1'
        },
        avatar_128: {
          invisible: '1'
        },
        user_id: {
          invisible: '1'
        },
        image_1920: {
          widget: 'image',
          class: 'oe_avatar',
          preview_image: 'avatar_128'
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          company_type: {
            widget: 'radio',
            groups: 'base.group_no_one',
            options: "{'horizontal': true}"
          },
          _h1: {
            name: {
              required: [['type', '=', 'contact'], ['is_company', '=', true]],
              invisible: [['is_company', '=', false]],
              placeholder: 'e.g. Lumber Inc'
            },
            _field_name_775: {
              name: {
                required: [['type', '=', 'contact'], ['is_company', '=', false]],
                invisible: [['is_company', '=', true]],
                placeholder: 'e.g. Brandom Freeman'
              }
            }
          },
          parent_id: {
            widget: 'res_partner_many2one',
            domain: [['is_company', '=', true]],
            invisible: [['is_company', '=', true]],
            context: {
              todo_ctx: "{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id}"
            },
            placeholder: 'Company Name...'
          }
        },
        _group: {
          function: {
            invisible: [['is_company', '=', true]],
            placeholder: 'e.g. Sales Director'
          },
          user_ids: {
            invisible: '1'
          },
          email: {
            widget: 'email',
            required: [['user_ids', '!=', []]],
            context: {
              gravatar_image: true
            }
          },
          phone: {
            widget: 'phone',
            options: "{'enable_sms': false}"
          },
          mobile: {
            widget: 'phone',
            options: "{'enable_sms': false}"
          }
        }
      }
    }
  },

  view_partner_address_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    arch: {
      sheet: {
        avatar_128: {
          invisible: '1'
        },
        image_1920: {
          widget: 'image',
          class: 'oe_avatar',
          preview_image: 'avatar_128'
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            name: {}
          }
        },
        parent_id: {
          invisible: '1'
        },
        _group: {
          _group: {
            _label_type: {
              for: 'type',
              groups: 'base.group_no_one',
              invisible: [['parent_id', '=', false]]
            },
            _div_div_type: {
              _attr: {
                name: 'div_type',
                groups: 'base.group_no_one',
                invisible: [['parent_id', '=', false]]
              },
              type: {
                class: 'oe_inline'
              }
            },
            _label_street: {
              for: 'street',
              string: 'Address'
            },
            _div: {
              _attr: {
                class: 'o_address_format'
              },
              street: {
                class: 'o_address_street',
                placeholder: 'Street...'
              },
              street2: {
                class: 'o_address_street',
                placeholder: 'Street 2...'
              },
              city: {
                class: 'o_address_city',
                placeholder: 'City'
              },
              state_id: {
                context: {
                  todo_ctx: "{'default_country_id': country_id}"
                },
                class: 'o_address_state',
                placeholder: 'State',
                no_open: true,
                no_quick_create: true
              },
              zip: {
                class: 'o_address_zip',
                placeholder: 'ZIP'
              },
              country_id: {
                class: 'o_address_country',
                placeholder: 'Country',
                no_open: true,
                no_create: true
              }
            },
            website: {
              string: 'Website',
              widget: 'url',
              placeholder: 'e.g. https://www.odoo.com'
            }
          },
          _group_860: {}
        }
      }
    }
  },

  view_partner_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            class: 'oe_title mb24'
          },
          is_company: {
            invisible: '1'
          },
          commercial_partner_id: {
            invisible: '1'
          },
          active: {
            invisible: '1'
          },
          company_id: {
            invisible: '1'
          },
          country_code: {
            invisible: '1'
          },
          company_type: {
            widget: 'radio',
            options: "{'horizontal': true}"
          },
          _h1: {
            name: {
              required: [['type', '=', 'contact']],
              invisible: [['is_company', '=', false]],
              class: 'text-break',
              placeholder: 'e.g. Lumber Inc'
            },
            _field_name_488: {
              name: {
                required: [['type', '=', 'contact']],
                invisible: [['is_company', '=', true]],
                class: 'text-break',
                placeholder: 'e.g. Brandom Freeman'
              }
            }
          },
          _div: {
            _attr: {
              class: 'o_row'
            },
            parent_id: {
              widget: 'res_partner_many2one',
              domain: [['is_company', '=', true]],
              invisible: ['|', '&', ['is_company', '=', true], ['parent_id', '=', false], ['company_name', '!=', false], ['company_name', '!=', '']],
              context: {
                todo_ctx: "{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id}"
              },
              placeholder: 'Company Name...'
            },
            company_name: {
              invisible: ['|', '|', ['company_name', '=', false], ['company_name', '=', ''], ['is_company', '=', true]]
            },
            _button_create_company: {
              _attr: {
                name: 'create_company',
                string: 'Create company',
                invisible: ['|', '|', ['is_company', '=', true], ['company_name', '=', ''], ['company_name', '=', false]],
                class: 'oe_edit_only btn-link',
                type: 'object',
                icon: 'fa-plus-square'
              }
            }
          }
        },
        _div_582: {
          _attr: {
            invisible: [['same_company_registry_partner_id', '=', false]],
            class: 'alert alert-warning oe_edit_only',
            text: 'A partner with the same'
          },
          _span: {
            _span: {
              _attr: {
                class: 'o_vat_label',
                text: 'Company Registry'
              }
            }
          },
          same_company_registry_partner_id: {}
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            invisible: [['active', '=', true]],
            title: 'Archived'
          }
        },
        avatar_128: {
          invisible: '1'
        },
        image_1920: {
          widget: 'image',
          class: 'oe_avatar',
          preview_image: 'avatar_128'
        },
        _group: {
          _group: {
            _span_address_name: {
              _attr: {
                name: 'address_name',
                class: 'o_form_label o_td_label'
              },
              type: {
                invisible: [['is_company', '=', true]],
                required: [['is_company', '!=', true]],
                readonly: [['user_ids', '!=', []]],
                class: 'fw-bold'
              },
              _b: {
                _attr: {
                  invisible: [['is_company', '=', false]],
                  text: 'Address'
                }
              }
            },
            _div: {
              _attr: {
                class: 'o_address_format'
              },
              street: {
                readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]],
                class: 'o_address_street',
                placeholder: 'Street...'
              },
              street2: {
                readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]],
                class: 'o_address_street',
                placeholder: 'Street 2...'
              },
              city: {
                readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]],
                class: 'o_address_city',
                placeholder: 'City'
              },
              state_id: {
                readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]],
                context: {
                  todo_ctx: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
                },
                class: 'o_address_state',
                placeholder: 'State',
                no_open: true,
                no_quick_create: true
              },
              zip: {
                readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]],
                class: 'o_address_zip',
                placeholder: 'ZIP'
              },
              _div_partner_address_country: {
                _attr: {
                  name: 'partner_address_country',
                  class: 'd-flex justify-content-between'
                },
                country_id: {
                  readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]],
                  class: 'o_address_country',
                  placeholder: 'Country',
                  no_open: true,
                  no_create: true
                }
              }
            },
            vat: {
              readonly: [['parent_id', '!=', false]],
              placeholder: 'e.g. BE0477472701'
            }
          },
          _group_852: {
            function: {
              invisible: [['is_company', '=', true]],
              placeholder: 'e.g. Sales Director'
            },
            phone: {
              widget: 'phone'
            },
            mobile: {
              widget: 'phone'
            },
            user_ids: {
              invisible: '1'
            },
            email: {
              widget: 'email',
              required: [['user_ids', '!=', []]],
              context: {
                gravatar_image: true
              }
            },
            website: {
              string: 'Website',
              widget: 'url',
              placeholder: 'e.g. https://www.odoo.com'
            },
            title: {
              invisible: [['is_company', '=', true]],
              placeholder: 'e.g. Mister',
              no_open: true
            },
            active_lang_count: {
              invisible: '1'
            },
            lang: {
              invisible: [['active_lang_count', '<=', 1]]
            },
            category_id: {
              widget: 'many2many_tags',
              placeholder: 'e.g. "B2B", "VIP", "Consulting", ...',
              color_field: 'color',
              no_create_edit: true
            }
          }
        },
        _notebook: {
          _page_contact_addresses: {
            _attr: {
              name: 'contact_addresses',
              string: 'Contacts & Addresses'
            },
            child_ids: {
              context: {
                todo_ctx: "{'default_parent_id': active_id, 'default_street': street, 'default_street2': street2, 'default_city': city, 'default_state_id': state_id, 'default_zip': zip, 'default_country_id': country_id, 'default_lang': lang, 'default_user_id': user_id, 'default_type': 'other'}"
              },
              views: {
                kanban: {
                  arch: {
                    sheet: {
                      id: {},
                      color: {},
                      name: {},
                      title: {},
                      type: {},
                      email: {},
                      parent_id: {},
                      is_company: {},
                      function: {},
                      phone: {},
                      street: {},
                      street2: {},
                      zip: {},
                      city: {},
                      country_id: {},
                      mobile: {},
                      state_id: {},
                      image_128: {},
                      avatar_128: {},
                      lang: {},
                      comment: {},
                      display_name: {},
                      _templates: {
                        _t: {
                          _t: {},
                          _div: {
                            _div: {
                              _attr: {
                                class: 'o_kanban_image'
                              },
                              _img: {}
                            },
                            _div_666: {
                              _attr: {
                                class: 'oe_kanban_details'
                              },
                              name: {},
                              _div: {
                                function: {}
                              },
                              _div_371: {
                                email: {
                                  widget: 'email'
                                }
                              },
                              _div_894: {
                                _div: {
                                  zip: {},
                                  city: {}
                                },
                                state_id: {},
                                country_id: {}
                              },
                              _div_592: {
                                _attr: {
                                  text: 'Phone:'
                                },
                                _t: {}
                              },
                              _div_556: {
                                _attr: {
                                  text: 'Mobile:'
                                },
                                _t: {}
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Contact / Address'
                      },
                      _sheet: {
                        type: {
                          widget: 'radio',
                          options: "{'horizontal': true}"
                        },
                        parent_id: {
                          invisible: '1'
                        },
                        _div: {
                          _attr: {
                            class: 'text-muted oe_edit_only'
                          },
                          _p: {
                            _attr: {
                              invisible: [['type', '!=', 'contact']],
                              class: 'mb-0'
                            },
                            _span: 'Use this to organize the contact details of employees of a given company (e.g. CEO, CFO, ...).'
                          },
                          _p_505: {
                            _attr: {
                              invisible: [['type', '!=', 'invoice']],
                              class: 'mb-0'
                            },
                            _span: 'Preferred address for all invoices. Selected by default when you invoice an order that belongs to this company.'
                          },
                          _p_267: {
                            _attr: {
                              invisible: [['type', '!=', 'delivery']],
                              class: 'mb-0'
                            },
                            _span: 'Preferred address for all deliveries. Selected by default when you deliver an order that belongs to this company.'
                          },
                          _p_250: {
                            _attr: {
                              invisible: [['type', '!=', 'private']],
                              class: 'mb-0'
                            },
                            _span: 'Private addresses are only visible by authorized users and contain sensitive data (employee home addresses, ...).'
                          },
                          _p_578: {
                            _attr: {
                              invisible: [['type', '!=', 'other']],
                              class: 'mb-0'
                            },
                            _span: 'Other address for the company (e.g. subsidiary, ...)'
                          }
                        },
                        _hr: {},
                        _group: {
                          _group: {
                            name: {
                              string: 'Contact Name',
                              required: [['type', '=', 'contact']]
                            },
                            title: {
                              invisible: [['type', '!=', 'contact']],
                              placeholder: 'e.g. Mr.',
                              no_open: true
                            },
                            function: {
                              invisible: [['type', '!=', 'contact']],
                              placeholder: 'e.g. Sales Director'
                            },
                            _label_street: {
                              for: 'street',
                              string: 'Address',
                              invisible: [['type', '=', 'contact']]
                            },
                            _div: {
                              _attr: {
                                invisible: [['type', '=', 'contact']]
                              },
                              _div_div_address: {
                                _attr: {
                                  name: 'div_address',
                                  class: 'o_address_format'
                                },
                                street: {
                                  class: 'o_address_street',
                                  placeholder: 'Street...'
                                },
                                street2: {
                                  class: 'o_address_street',
                                  placeholder: 'Street 2...'
                                },
                                city: {
                                  class: 'o_address_city',
                                  placeholder: 'City'
                                },
                                state_id: {
                                  context: {
                                    todo_ctx: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
                                  },
                                  class: 'o_address_state',
                                  placeholder: 'State',
                                  no_open: true,
                                  no_quick_create: true
                                },
                                zip: {
                                  class: 'o_address_zip',
                                  placeholder: 'ZIP'
                                },
                                country_id: {
                                  class: 'o_address_country',
                                  placeholder: 'Country',
                                  no_open: true,
                                  no_create: true
                                }
                              }
                            }
                          },
                          _group_829: {
                            email: {
                              widget: 'email'
                            },
                            phone: {
                              widget: 'phone'
                            },
                            mobile: {
                              widget: 'phone'
                            },
                            company_id: {
                              invisible: '1'
                            }
                          }
                        },
                        _group_768: {
                          comment: {
                            placeholder: 'Internal notes...'
                          }
                        },
                        lang: {
                          invisible: 'True'
                        },
                        user_id: {
                          invisible: 'True'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          _page_sales_purchases: {
            _attr: {
              name: 'sales_purchases',
              string: 'Sales & Purchase'
            },
            _group_container_row_2: {
              _attr: {
                name: 'container_row_2'
              },
              _group_sale: {
                _attr: {
                  name: 'sale',
                  string: 'Sales'
                },
                user_id: {
                  widget: 'many2one_avatar_user',
                  domain: [['share', '=', false]]
                }
              },
              _group_purchase: {
                _attr: {
                  name: 'purchase',
                  string: 'Purchase'
                }
              },
              _group_misc: {
                _attr: {
                  name: 'misc',
                  string: 'Misc'
                },
                company_registry: {
                  invisible: [['parent_id', '!=', false]]
                },
                ref: {
                  string: 'Reference'
                },
                company_id: {
                  groups: 'base.group_multi_company',
                  readonly: [['parent_id', '!=', false]],
                  force_save: '1',
                  no_create: true
                },
                industry_id: {
                  invisible: [['is_company', '=', false]],
                  no_create: true
                }
              }
            }
          },
          _page_internal_notes: {
            _attr: {
              name: 'internal_notes',
              string: 'Internal Notes'
            },
            comment: {
              placeholder: 'Internal notes...'
            }
          }
        }
      }
    }
  },

  res_partner_view_form_private: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    arch: {
      sheet: {
        type: {
          invisible: '1'
        },
        parent_id: {
          invisible: '1'
        },
        _label_name: {
          for: 'name',
          class: 'oe_edit_only'
        },
        name: {},
        _group: {
          _group: {
            _label_street: {
              for: 'street',
              string: 'Address'
            },
            _div: {
              _div_div_address: {
                _attr: {
                  name: 'div_address',
                  class: 'o_address_format'
                },
                street: {
                  class: 'o_address_street',
                  placeholder: 'Street...'
                },
                street2: {
                  class: 'o_address_street',
                  placeholder: 'Street 2...'
                },
                city: {
                  class: 'o_address_city',
                  placeholder: 'City'
                },
                state_id: {
                  context: {
                    todo_ctx: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
                  },
                  class: 'o_address_state',
                  placeholder: 'State',
                  no_open: true,
                  no_quick_create: true
                },
                zip: {
                  class: 'o_address_zip',
                  placeholder: 'ZIP'
                },
                country_id: {
                  class: 'o_address_country',
                  placeholder: 'Country',
                  no_open: true,
                  no_create: true
                }
              }
            }
          },
          _group_239: {
            phone: {
              widget: 'phone',
              options: "{'enable_sms': false}"
            },
            mobile: {
              widget: 'phone',
              options: "{'enable_sms': false}"
            },
            email: {},
            lang: {}
          }
        },
        _group_170: {
          _attr: {
            string: 'Bank Accounts'
          },
          bank_ids: {
            views: {
              tree: {
                arch: {
                  sheet: {
                    bank_id: {},
                    acc_number: {},
                    acc_holder_name: {
                      invisible: '1'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  view_res_partner_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'search',
    arch: {
      name: {},
      parent_id: {
        domain: [['is_company', '=', true]]
      },
      email: {},
      phone: {},
      category_id: {
        string: 'Tag'
      },
      user_id: {},
      _separator: {},
      _filter_type_person: {
        _attr: {
          name: 'type_person',
          string: 'Individuals',
          domain: [['is_company', '=', false]]
        }
      },
      _filter_type_company: {
        _attr: {
          name: 'type_company',
          string: 'Companies',
          domain: [['is_company', '=', true]]
        }
      },
      _separator_970: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _separator_953: {},
      _group_group_by: {
        _attr: {
          name: 'group_by',
          string: 'Group By'
        },
        _filter_salesperson: {
          _attr: {
            name: 'salesperson',
            string: 'Salesperson',
            domain: [],
            context: {
              group_by: 'user_id'
            }
          }
        },
        _filter_group_company: {
          _attr: {
            name: 'group_company',
            string: 'Company',
            context: {
              group_by: 'parent_id'
            }
          }
        },
        _filter_group_country: {
          _attr: {
            name: 'group_country',
            string: 'Country',
            context: {
              group_by: 'country_id'
            }
          }
        }
      }
    }
  },

  res_partner_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'otherview',
    arch: {}
  },

  action_partner_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Customers',
    type: 'ir.actions.act_window',
    search_view_id: 'view_res_partner_filter',
    res_model: 'res.partner',
    context: {
      res_partner_search_mode: 'customer'
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_partner_form_view1: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'res_partner_kanban_view',
    act_window_id: 'action_partner_form'
  },

  action_partner_form_view2: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'view_partner_form',
    act_window_id: 'action_partner_form'
  },

  action_partner_tree_view1: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'view_partner_tree',
    act_window_id: 'action_partner_form'
  },

  action_partner_customer_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Customers',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    domain: '[]',
    context: {
      res_partner_search_mode: 'customer',
      default_is_company: true
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_partner_customer_form_view1: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'res_partner_kanban_view',
    act_window_id: 'action_partner_customer_form'
  },

  action_partner_customer_form_view2: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'view_partner_tree',
    act_window_id: 'action_partner_customer_form'
  },

  action_partner_customer_form_view3: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'view_partner_form',
    act_window_id: 'action_partner_customer_form'
  },

  action_partner_supplier_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Vendors',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    domain: '[]',
    context: {
      res_partner_search_mode: 'supplier',
      default_is_company: true
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_partner_vendor_form_view1: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'res_partner_kanban_view',
    act_window_id: 'action_partner_supplier_form'
  },

  action_partner_vendor_form_view2: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'view_partner_tree',
    act_window_id: 'action_partner_supplier_form'
  },

  action_partner_vendor_form_view3: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'view_partner_form',
    act_window_id: 'action_partner_supplier_form'
  }
}
