export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'base.res_config_settings_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[hasclass('settings')]",
            position: 'inside'
          },
          _div: {
            _attr: {
              string: 'Manufacturing',
              groups: 'mrp.group_mrp_manager',
              class: 'app_settings_block'
            },
            _h2: 'Operations',
            _div_process_operations_setting_container: {
              _attr: {
                name: 'process_operations_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'work_order',
                  title: 'Work Order Operations allow you to create and manage the manufacturing operations that should be followed within your work centers in order to produce a product. They are attached to bills of materials that will define the required components.',
                  class: 'col-lg-6 col-12 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_mrp_routings: {},
                  module_mrp_workorder: { invisible: '1' }
                },
                _div_789: {
                  _attr: {
                    id: 'workorder_settings',
                    class: 'o_setting_right_pane'
                  },
                  _label_group_mrp_routings: {
                    for: 'group_mrp_routings',
                    string: 'Work Orders'
                  },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/inventory_and_mrp/manufacturing/management/bill_configuration.html#adding-a-routing',
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Process operations at specific work centers'
                    }
                  },
                  _div_360: {
                    _attr: {
                      id: 'workorder_settings_workcenters',
                      invisible: [['group_mrp_routings', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt8' },
                      _div: {
                        _button_mrp__mrp_workcenter_action: {
                          _attr: {
                            name: 'mrp.mrp_workcenter_action',
                            type: 'action',
                            string: 'Work Centers',
                            icon: 'fa-arrow-right',
                            class: 'btn-link'
                          }
                        }
                      }
                    }
                  },
                  _div_625: {
                    _attr: {
                      id: 'workorder_settings_dependencies',
                      invisible: [['group_mrp_routings', '=', false]],
                      class: 'row mt-2'
                    },
                    group_mrp_workorder_dependencies: { class: 'col-lg-1 mr0' },
                    _div: {
                      _attr: { class: 'col ps-0' },
                      _label_group_mrp_workorder_dependencies: { for: 'group_mrp_workorder_dependencies' },
                      _div: {
                        _attr: {
                          class: 'text-muted',
                          text: "Set the order that work orders should be processed in. Activate the feature within each BoM's Miscellaneous tab"
                        }
                      }
                    }
                  }
                }
              },
              _div_108: {
                _attr: { class: 'col-lg-6 col-12 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_mrp_subcontracting: {}
                },
                _div_141: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_mrp_subcontracting: { for: 'module_mrp_subcontracting' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/inventory_and_mrp/manufacturing/management/subcontracting.html',
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Subcontract the production of some products'
                    }
                  }
                }
              },
              _div_907: {
                _attr: {
                  id: 'quality_control_mrp',
                  class: 'col-lg-6 col-12 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_quality_control: { widget: 'upgrade_boolean' }
                },
                _div_237: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_quality_control: { for: 'module_quality_control' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add quality checks to your work orders'
                    }
                  },
                  _div_898: {
                    _attr: {
                      invisible: [['module_quality_control', '=', false]],
                      class: 'row mt-2'
                    },
                    module_quality_control_worksheet: {
                      widget: 'upgrade_boolean',
                      class: 'col-lg-1 ml16 mr0'
                    },
                    _div: {
                      _attr: { class: 'col ps-0' },
                      _label_module_quality_control_worksheet: { for: 'module_quality_control_worksheet' },
                      _div: {
                        _attr: {
                          class: 'text-muted',
                          text: 'Create customizable worksheets for your quality checks'
                        }
                      }
                    }
                  }
                }
              },
              _div_652: {
                _attr: {
                  id: 'mrp_lock',
                  class: 'col-lg-6 col-12 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_unlocked_by_default: {}
                },
                _div_630: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_unlocked_by_default: { for: 'group_unlocked_by_default' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Allow manufacturing users to modify quantities to consume, without the need for prior approval'
                    }
                  }
                }
              },
              _div_922: {
                _attr: {
                  id: 'mrp_byproduct',
                  title: 'Add by-products to bills of materials. This can be used to get several finished products as well. Without this option you only do: A + B = C. With the option: A + B = C + D.',
                  class: 'col-lg-6 col-12 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_mrp_byproducts: {}
                },
                _div_478: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_mrp_byproducts: { for: 'group_mrp_byproducts' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Produce residual products (A + B -> C + D)'
                    }
                  }
                }
              },
              _div_592: {
                _attr: {
                  id: 'mrp_reception_report',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_mrp_reception_report: {}
                },
                _div_615: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_mrp_reception_report: { for: 'group_mrp_reception_report' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'View and allocate manufactured quantities'
                    }
                  }
                }
              }
            },
            _h2_383: 'Planning',
            _div: {
              _attr: { class: 'row mt16 o_settings_container' },
              _div: {
                _attr: {
                  id: 'mrp_mps',
                  title: 'Using a MPS report to schedule your reordering and manufacturing operations is useful if you have long lead time and if you produce based on sales forecasts.',
                  class: 'col-lg-6 col-12 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_mrp_mps: { widget: 'upgrade_boolean' }
                },
                _div_343: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_mrp_mps: { for: 'module_mrp_mps' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/inventory_and_mrp/manufacturing/management/use_mps.html',
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Plan manufacturing or purchase orders based on forecasts'
                    }
                  },
                  _div_760: {
                    _attr: {
                      id: 'content_mrp_mps',
                      class: 'content-group'
                    }
                  }
                }
              },
              _div_207: {
                _attr: {
                  id: 'security_lead_time',
                  class: 'col-lg-6 col-12 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  use_manufacturing_lead: {}
                },
                _div_208: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_use_manufacturing_lead: {
                    for: 'use_manufacturing_lead',
                    string: 'Security Lead Time'
                  },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/inventory_and_mrp/inventory/management/planning/scheduled_dates.html',
                      title: 'Documentation',
                      class: 'me-2 o_doc_link'
                    }
                  },
                  _span: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Schedule manufacturing orders earlier to avoid delays'
                    }
                  },
                  _div_553: {
                    _attr: {
                      invisible: [['use_manufacturing_lead', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16',
                        text: 'days'
                      },
                      manufacturing_lead: { class: 'oe_inline' }
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

  action_mrp_configuration: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    search_view_id: 'tooooooodoooooo',
    context: {
      module: 'mrp',
      bin_size: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
