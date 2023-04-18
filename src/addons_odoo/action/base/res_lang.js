export default {
  res_lang_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.lang',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        code: { groups: 'base.group_no_one' },
        iso_code: { groups: 'base.group_no_one' },
        url_code: { groups: 'base.group_no_one', invisible: 1 },
        direction: { groups: 'base.group_no_one' },
        active: {}
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
          _button: {
            _attr: {
              name: 'base.action_view_base_language_install',
              type: 'action',
              string: 'Activate and Translate',
              icon: 'fa-refresh'
            }
          }
        },

        flag_image: { widget: 'image' },

        _div_title: {
          _label: { for: 'name' },
          _h1: { name: { placeholder: 'e.g. French' } }
        },

        _group_1: {
          _group_1: {
            code: {},
            iso_code: {},
            url_code: { invisible: 1, required: 0 },
            active: { widget: 'boolean_toggle' }
          },

          _group_2: {
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
          _attr: {
            class: 'row'
          },
          _div: {
            _attr: {
              class: 'col-md-8 row'
            },
            _div: {
              _attr: {
                class: 'col-12'
              },
              _div: {
                _attr: {
                  class:
                    'o_horizontal_separator mb-3 mt-4 text-uppercase fw-bolder small',
                  text: 'Legends for supported Date and Time Formats'
                }
              }
            },
            _div_515: {
              _attr: {
                class: 'col-sm'
              },
              _div: '%a - Abbreviated day of the week.',
              _div_181: '%A - Full day of the week.',
              _div_458: '%b - Abbreviated month name.',
              _div_624: '%B - Full month name."',
              _div_925: '%d - Day of the month [01,31]."',
              _div_325: '%j - Day of the year [001,366]."',
              _div_711: '%H - Hour (24-hour clock) [00,23]."',
              _div_126: '%I - Hour (12-hour clock) [01,12]."'
            },
            _div_629: {
              _attr: {
                class: 'col-sm'
              },
              _div: '%M - Minute [00,59]."',
              _div_356: '%p - Equivalent of either AM or PM."',
              _div_104: '%S - Seconds [00,61]."',
              _div_192: '%w - Day of the week number [0(Sunday),6]."',
              _div_628: '%y - Year without century [00,99]."',
              _div_556: '%Y - Year with century."',
              _div_794: '%m - Month number [01,12]."'
            }
          },
          _div_441: {
            _attr: {
              class: 'col-md-4 text-info'
            },
            _div: {
              _attr: {
                class:
                  'o_horizontal_separator mb-3 mt-4 text-uppercase fw-bolder small',
                text: 'Examples'
              }
            },
            _div_731: '1. %b, %B         ==> Dec, December',
            _div_537: '2. %a ,%A         ==> Fri, Friday',
            _div_712: '3. %y, %Y         ==> 08, 2008',
            _div_714: '4. %d, %m         ==> 05, 12',
            _div_660: '5. %H:%M:%S      ==> 18:25:20',
            _div_718: '6. %I:%M:%S %p  ==> 06:25:20 PM',
            _div_927: '7. %j              ==> 340',
            _div_192: '8. %S              ==> 20',
            _div_383: '9. %w              ==> 5 ( Friday is the 6th day)'
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
      fields: {
        name: {
          string: 'Language',
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['code', 'ilike', self],
              ['iso_code', 'ilike', self]
            ]
          }
        },
        direction: {}
      },

      filters: {
        group_active: {
          active: {
            name: 'active',
            string: 'Active',
            domain: [['active', '=', true]]
          }
        }
      }
    }
  },

  res_lang_act_window: {
    _odoo_model: 'ir.actions',
    name: 'Languages',
    type: 'ir.actions.act_window',
    res_model: 'res.lang',
    search_view_id: 'res_lang_search',
    domain: [],
    context: { active_test: false },
    views: {
      tree: 'res_lang_tree',
      form: 'res_lang_form'
    }
  }
}
