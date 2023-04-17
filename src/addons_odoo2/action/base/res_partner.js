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
          domain: "[('share', '=', False)]"
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
              attrs: {
                required: "[('type', '=', 'contact'), ('is_company', '=', True)]",
                invisible: "[('is_company', '=', False)]"
              },
              placeholder: 'e.g. Lumber Inc'
            },
            _field_name_252: {
              name: {
                attrs: {
                  required: "[('type', '=', 'contact'), ('is_company', '=', False)]",
                  invisible: "[('is_company', '=', True)]"
                },
                placeholder: 'e.g. Brandom Freeman'
              }
            }
          },
          parent_id: {
            widget: 'res_partner_many2one',
            domain: "[('is_company', '=', True)]",
            attrs: {
              invisible: "[('is_company', '=', True)]"
            },
            context: {
              todo: "{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id}"
            },
            placeholder: 'Company Name...'
          }
        },
        _group: {
          function: {
            attrs: {
              invisible: "[('is_company', '=', True)]"
            },
            placeholder: 'e.g. Sales Director'
          },
          user_ids: {
            invisible: '1'
          },
          email: {
            widget: 'email',
            attrs: {
              required: "[('user_ids', '!=', [])]"
            },
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
              attrs: {
                invisible: "[('parent_id', '=', False)]"
              }
            },
            _div_div_type: {
              _attr: {
                name: 'div_type',
                groups: 'base.group_no_one',
                attrs: {
                  invisible: "[('parent_id', '=', False)]"
                }
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
                  todo: "{'default_country_id': country_id}"
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
          _group_217: {}
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
              attrs: {
                required: "[('type', '=', 'contact')]",
                invisible: "[('is_company', '=', False)]"
              },
              class: 'text-break',
              placeholder: 'e.g. Lumber Inc'
            },
            _field_name_217: {
              name: {
                attrs: {
                  required: "[('type', '=', 'contact')]",
                  invisible: "[('is_company', '=', True)]"
                },
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
              domain: "[('is_company', '=', True)]",
              attrs: {
                invisible: "['|', '&', ('is_company', '=', True), ('parent_id', '=', False), ('company_name', '!=', False), ('company_name', '!=', '')]"
              },
              context: {
                todo: "{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id}"
              },
              placeholder: 'Company Name...'
            },
            company_name: {
              attrs: {
                invisible: "['|', '|', ('company_name', '=', False), ('company_name', '=', ''), ('is_company', '=', True)]"
              }
            },
            _button_create_company: {
              _attr: {
                name: 'create_company',
                string: 'Create company',
                attrs: {
                  invisible: "['|', '|', ('is_company', '=', True), ('company_name', '=', ''), ('company_name', '=', False)]"
                },
                class: 'oe_edit_only btn-link',
                type: 'object',
                icon: 'fa-plus-square'
              }
            }
          }
        },
        _div_305: {
          _attr: {
            attrs: {
              invisible: "[('same_company_registry_partner_id', '=', False)]"
            },
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
            attrs: {
              invisible: "[('active', '=', True)]"
            },
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
                attrs: {
                  invisible: "[('is_company', '=', True)]",
                  required: "[('is_company', '!=', True)]",
                  readonly: "[('user_ids', '!=', [])]"
                },
                class: 'fw-bold'
              },
              _b: {
                _attr: {
                  attrs: {
                    invisible: "[('is_company', '=', False)]"
                  },
                  text: 'Address'
                }
              }
            },
            _div: {
              _attr: {
                class: 'o_address_format'
              },
              street: {
                attrs: {
                  readonly: "[('type', '=', 'contact'), ('parent_id', '!=', False)]"
                },
                class: 'o_address_street',
                placeholder: 'Street...'
              },
              street2: {
                attrs: {
                  readonly: "[('type', '=', 'contact'), ('parent_id', '!=', False)]"
                },
                class: 'o_address_street',
                placeholder: 'Street 2...'
              },
              city: {
                attrs: {
                  readonly: "[('type', '=', 'contact'), ('parent_id', '!=', False)]"
                },
                class: 'o_address_city',
                placeholder: 'City'
              },
              state_id: {
                attrs: {
                  readonly: "[('type', '=', 'contact'), ('parent_id', '!=', False)]"
                },
                context: {
                  todo: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
                },
                class: 'o_address_state',
                placeholder: 'State',
                no_open: true,
                no_quick_create: true
              },
              zip: {
                attrs: {
                  readonly: "[('type', '=', 'contact'), ('parent_id', '!=', False)]"
                },
                class: 'o_address_zip',
                placeholder: 'ZIP'
              },
              _div_partner_address_country: {
                _attr: {
                  name: 'partner_address_country',
                  class: 'd-flex justify-content-between'
                },
                country_id: {
                  attrs: {
                    readonly: "[('type', '=', 'contact'), ('parent_id', '!=', False)]"
                  },
                  class: 'o_address_country',
                  placeholder: 'Country',
                  no_open: true,
                  no_create: true
                }
              }
            },
            vat: {
              attrs: {
                readonly: "[('parent_id', '!=', False)]"
              },
              placeholder: 'e.g. BE0477472701'
            }
          },
          _group_286: {
            function: {
              attrs: {
                invisible: "[('is_company', '=', True)]"
              },
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
              attrs: {
                required: "[('user_ids', '!=', [])]"
              },
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
              attrs: {
                invisible: "[('is_company', '=', True)]"
              },
              placeholder: 'e.g. Mister',
              no_open: true
            },
            active_lang_count: {
              invisible: '1'
            },
            lang: {
              attrs: {
                invisible: "[('active_lang_count', '<=', 1)]"
              }
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
                todo: "{'default_parent_id': active_id, 'default_street': street, 'default_street2': street2, 'default_city': city, 'default_state_id': state_id, 'default_zip': zip, 'default_country_id': country_id, 'default_lang': lang, 'default_user_id': user_id, 'default_type': 'other'}"
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
                            _div_689: {
                              _attr: {
                                class: 'oe_kanban_details'
                              },
                              name: {},
                              _div: {
                                function: {}
                              },
                              _div_498: {
                                email: {
                                  widget: 'email'
                                }
                              },
                              _div_130: {
                                _div: {
                                  zip: {},
                                  city: {}
                                },
                                state_id: {},
                                country_id: {}
                              },
                              _div_891: {
                                _attr: {
                                  text: 'Phone:'
                                },
                                _t: {}
                              },
                              _div_830: {
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
                              attrs: {
                                invisible: "[('type', '!=', 'contact')]"
                              },
                              class: 'mb-0'
                            },
                            _span: 'Use this to organize the contact details of employees of a given company (e.g. CEO, CFO, ...).'
                          },
                          _p_574: {
                            _attr: {
                              attrs: {
                                invisible: "[('type', '!=', 'invoice')]"
                              },
                              class: 'mb-0'
                            },
                            _span: 'Preferred address for all invoices. Selected by default when you invoice an order that belongs to this company.'
                          },
                          _p_567: {
                            _attr: {
                              attrs: {
                                invisible: "[('type', '!=', 'delivery')]"
                              },
                              class: 'mb-0'
                            },
                            _span: 'Preferred address for all deliveries. Selected by default when you deliver an order that belongs to this company.'
                          },
                          _p_357: {
                            _attr: {
                              attrs: {
                                invisible: "[('type', '!=', 'private')]"
                              },
                              class: 'mb-0'
                            },
                            _span: 'Private addresses are only visible by authorized users and contain sensitive data (employee home addresses, ...).'
                          },
                          _p_490: {
                            _attr: {
                              attrs: {
                                invisible: "[('type', '!=', 'other')]"
                              },
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
                              attrs: {
                                required: "[('type', '=', 'contact')]"
                              }
                            },
                            title: {
                              attrs: {
                                invisible: "[('type', '!=', 'contact')]"
                              },
                              placeholder: 'e.g. Mr.',
                              no_open: true
                            },
                            function: {
                              attrs: {
                                invisible: "[('type', '!=', 'contact')]"
                              },
                              placeholder: 'e.g. Sales Director'
                            },
                            _label_street: {
                              for: 'street',
                              string: 'Address',
                              attrs: {
                                invisible: "[('type', '=', 'contact')]"
                              }
                            },
                            _div: {
                              _attr: {
                                attrs: {
                                  invisible: "[('type', '=', 'contact')]"
                                }
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
                                    todo: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
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
                          _group_937: {
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
                        _group_884: {
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
                  domain: "[('share', '=', False)]"
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
                  attrs: {
                    invisible: "[('parent_id', '!=', False)]"
                  }
                },
                ref: {
                  string: 'Reference'
                },
                company_id: {
                  groups: 'base.group_multi_company',
                  attrs: {
                    readonly: "[('parent_id', '!=', False)]"
                  },
                  force_save: '1',
                  no_create: true
                },
                industry_id: {
                  attrs: {
                    invisible: "[('is_company', '=', False)]"
                  },
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
                    todo: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
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
          _group_500: {
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
        _group_401: {
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
        domain: "[('is_company', '=', True)]"
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
          domain: "[('is_company', '=', False)]"
        }
      },
      _filter_type_company: {
        _attr: {
          name: 'type_company',
          string: 'Companies',
          domain: "[('is_company', '=', True)]"
        }
      },
      _separator_256: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: "[('active', '=', False)]"
        }
      },
      _separator_103: {},
      _group_group_by: {
        _attr: {
          name: 'group_by',
          string: 'Group By'
        },
        _filter_salesperson: {
          _attr: {
            name: 'salesperson',
            string: 'Salesperson',
            domain: "[]",
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
