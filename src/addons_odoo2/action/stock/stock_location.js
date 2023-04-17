export default {
  view_location_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.location',
    type: 'form',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_location_open_putaway: {
            _attr: {
              name: 'location_open_putaway',
              string: 'Putaway Rules',
              groups: 'stock.group_stock_multi_locations',
              context: {
                todo_ctx: "{'default_company_id': company_id}"
              },
              class: 'oe_stat_button',
              type: 'action',
              icon: 'fa-random'
            }
          },
          _button_location_open_quants: {
            _attr: {
              name: 'location_open_quants',
              string: 'Current Stock',
              class: 'oe_stat_button',
              type: 'action',
              icon: 'fa-cubes'
            }
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
        _label_name: {
          for: 'name'
        },
        _h1: {
          name: {
            placeholder: 'e.g. Spare Stock'
          }
        },
        _label_location_id: {
          for: 'location_id'
        },
        _h2: {
          location_id: {
            placeholder: 'e.g. Physical Locations',
            no_create: true
          }
        },
        _group: {
          _group_additional_info: {
            _attr: {
              name: 'additional_info',
              string: 'Additional Information'
            },
            active: {
              invisible: '1'
            },
            usage: {},
            storage_category_id: {
              groups: 'stock.group_stock_storage_categories',
              attrs: {
                invisible: "[('usage', '!=', 'internal')]"
              }
            },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            scrap_location: {
              attrs: {
                invisible: "[('usage', 'not in', ('inventory', 'internal'))]"
              }
            },
            return_location: {},
            replenish_location: {
              attrs: {
                invisible: "[('usage', '!=', 'internal')]"
              }
            }
          },
          _group: {
            _attr: {
              string: 'Cyclic Counting',
              attrs: {
                invisible: "['|', ('usage', 'not in', ('internal', 'transit')), ('company_id', '=', False)]"
              }
            },
            cyclic_inventory_frequency: {},
            last_inventory_date: {},
            next_inventory_date: {
              attrs: {
                invisible: "[('active', '=', False)]"
              }
            }
          },
          _group_761: {
            _attr: {
              string: 'Logistics',
              groups: 'stock.group_adv_location'
            },
            removal_strategy_id: {
              no_create: true
            }
          }
        },
        comment: {
          placeholder: 'External note...'
        }
      }
    }
  },

  stock_location_view_form_editable: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.location',
    inherit_id: 'stock.view_location_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//form',
            position: 'attributes'
          },
          _attribute_create: {
            _attr: {
              name: 'create',
              text: 'false'
            }
          }
        }
      }
    }
  },

  view_location_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.location',
    type: 'search',
    arch: {
      complete_name: {
        string: 'Stock Locations'
      },
      _filter_in_location: {
        _attr: {
          name: 'in_location',
          string: 'Internal',
          domain: "[('usage', '=', 'internal')]"
        }
      },
      _filter_customer: {
        _attr: {
          name: 'customer',
          string: 'Customer',
          domain: "[('usage', '=', 'customer')]"
        }
      },
      _filter_prod_inv_location: {
        _attr: {
          name: 'prod_inv_location',
          string: 'Production',
          domain: "[('usage', 'in', ['inventory', 'production'])]"
        }
      },
      _filter_supplier: {
        _attr: {
          name: 'supplier',
          string: 'Vendor',
          domain: "[('usage', '=', 'supplier')]"
        }
      },
      location_id: {
        string: 'Parent Location'
      },
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: "[('active', '=', False)]"
        }
      }
    }
  },

  view_location_tree2: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.location',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        active: {
          invisible: '1'
        },
        complete_name: {
          string: 'Location'
        },
        usage: {},
        storage_category_id: {
          groups: 'stock.group_stock_storage_categories',
          attrs: {
            readonly: "[('usage', '!=', 'internal')]"
          }
        },
        _field_company_id_735: {
          company_id: {
            groups: 'base.group_multi_company'
          }
        }
      }
    }
  },

  stock_location_view_tree2_editable: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.location',
    inherit_id: 'stock.view_location_tree2',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_create: {
            _attr: {
              name: 'create',
              text: 'false'
            }
          }
        }
      }
    }
  },

  action_storage_category_locations: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Locations',
    type: 'ir.actions.act_window',
    res_model: 'stock.location',
    domain: "[('storage_category_id', '=', active_id)]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_location_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Locations',
    type: 'ir.actions.act_window',
    search_view_id: 'view_location_search',
    res_model: 'stock.location',
    context: {
      search_default_in_location: 1
    },
    views: {
      tree: 'view_location_tree2',
      form: '=======todo=========='
    }
  },

  action_prod_inv_location_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Locations',
    type: 'ir.actions.act_window',
    search_view_id: 'view_location_search',
    res_model: 'stock.location',
    context: {
      search_default_prod_inv_location: 1
    },
    views: {
      tree: 'view_location_tree2',
      form: '=======todo=========='
    }
  }
}