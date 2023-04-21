export default {
  res_lang_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.lang',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_action_activate_langs: {
            _attr: {
              name: 'action_activate_langs',
              type: 'object',
              string: 'Activate'
            }
          }
        },
        name: {},
        code: { groups: 'base.group_no_one' },
        iso_code: { groups: 'base.group_no_one' },
        url_code: {
          groups: 'base.group_no_one',
          invisible: '1'
        },
        direction: { groups: 'base.group_no_one' },
        active: {},
        _button_base__action_view_base_language_install: {
          _attr: {
            name: 'base.action_view_base_language_install',
            type: 'action',
            string: 'Activate',
            icon: 'fa-check',
            invisible: [['active', '=', true]]
          }
        },
        _button_base__action_view_base_language_install_251: {
          _attr: {
            name: 'base.action_view_base_language_install',
            type: 'action',
            string: 'Update',
            icon: 'fa-refresh',
            invisible: [['active', '!=', true]]
          }
        },
        _button_action_archive: {
          _attr: {
            name: 'action_archive',
            type: 'object',
            string: 'Disable',
            icon: 'fa-times',
            invisible: [['active', '!=', true]]
          }
        }
      }
    }
  },

  res_lang_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.lang',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_base__action_view_base_language_install: {
            _attr: {
              name: 'base.action_view_base_language_install',
              type: 'action',
              string: 'Activate and Translate',
              icon: 'fa-refresh',
              class: 'oe_stat_button'
            }
          }
        },
        flag_image: {
          widget: 'image',
          class: 'oe_avatar'
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: { placeholder: 'e.g. French' }
          }
        },
        _group: {
          _group: {
            code: {},
            iso_code: {},
            url_code: {
              invisible: '1',
              required: '0'
            },
            active: { widget: 'boolean_toggle' }
          },
          _group_951: {
            direction: {},
            grouping: {},
            decimal_point: {},
            thousands_sep: {},
            date_format: {},
            time_format: {},
            week_start: {}
          }
        },
        _div: {
          _attr: { class: 'row' },
          _div: {
            _attr: { class: 'col-md-8 row' },
            _div: {
              _attr: { class: 'col-12' },
              _div: {
                _attr: {
                  class: 'o_horizontal_separator mb-3 mt-4 text-uppercase fw-bolder small',
                  text: 'Legends for supported Date and Time Formats'
                }
              }
            },
            _div_957: {
              _attr: { class: 'col-sm' },
              _div: '%a - Abbreviated day of the week.',
              _div_198: '%A - Full day of the week.',
              _div_126: '%b - Abbreviated month name.',
              _div_376: '%B - Full month name."',
              _div_351: '%d - Day of the month [01,31]."',
              _div_256: '%j - Day of the year [001,366]."',
              _div_790: '%H - Hour (24-hour clock) [00,23]."',
              _div_374: '%I - Hour (12-hour clock) [01,12]."'
            },
            _div_999: {
              _attr: { class: 'col-sm' },
              _div: '%M - Minute [00,59]."',
              _div_397: '%p - Equivalent of either AM or PM."',
              _div_656: '%S - Seconds [00,61]."',
              _div_996: '%w - Day of the week number [0(Sunday),6]."',
              _div_294: '%y - Year without century [00,99]."',
              _div_662: '%Y - Year with century."',
              _div_332: '%m - Month number [01,12]."'
            }
          },
          _div_897: {
            _attr: { class: 'col-md-4 text-info' },
            _div: {
              _attr: {
                class: 'o_horizontal_separator mb-3 mt-4 text-uppercase fw-bolder small',
                text: 'Examples'
              }
            },
            _div_915: '1. %b, %B         ==> Dec, December',
            _div_889: '2. %a ,%A         ==> Fri, Friday',
            _div_550: '3. %y, %Y         ==> 08, 2008',
            _div_355: '4. %d, %m         ==> 05, 12',
            _div_169: '5. %H:%M:%S      ==> 18:25:20',
            _div_579: '6. %I:%M:%S %p  ==> 06:25:20 PM',
            _div_228: '7. %j              ==> 340',
            _div_640: '8. %S              ==> 20',
            _div_919: '9. %w              ==> 5 ( Friday is the 6th day)'
          }
        }
      }
    }
  },

  res_lang_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.lang',
    type: 'search',
    arch: {
      name: {
        string: 'Language',
        filter_domain: { todo_ctx: "['|', '|', ('name', 'ilike', self), ('code', 'ilike', self), ('iso_code', 'ilike', self)]" }
      },
      direction: {},
      _separator: {},
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Active',
          domain: [['active', '=', true]]
        }
      }
    }
  },

  res_lang_act_window: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Languages',
    res_model: 'res.lang',
    search_view_id: 'res_lang_search',
    context: { active_test: false },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
