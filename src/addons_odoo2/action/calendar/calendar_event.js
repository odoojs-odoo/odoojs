export default {
  view_calendar_event_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'calendar.event',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_action_open_composer: {
            _attr: {
              name: 'action_open_composer',
              type: 'object',
              string: 'Send Mail',
              context: { composition_mode: 'mass_mail' }
            }
          }
        },
        name: {
          string: 'Subject',
          readonly: [['recurrency', '=', true]]
        },
        start: {
          string: 'Start Date',
          readonly: '1'
        },
        stop: {
          string: 'End Date',
          readonly: '1'
        },
        user_id: {
          widget: 'many2one_avatar_user',
          readonly: [['recurrency', '=', true]],
          optional: 'hide'
        },
        partner_ids: {
          widget: 'many2many_tags',
          readonly: [['recurrency', '=', true]],
          optional: 'show'
        },
        alarm_ids: {
          widget: 'many2many_tags',
          readonly: [['recurrency', '=', true]],
          optional: 'hide'
        },
        categ_ids: {
          widget: 'many2many_tags',
          readonly: [['recurrency', '=', true]],
          optional: 'hide'
        },
        recurrency: {
          readonly: '1',
          optional: 'hide'
        },
        privacy: {
          readonly: [['recurrency', '=', true]],
          optional: 'hide'
        },
        show_as: {
          readonly: [['recurrency', '=', true]],
          optional: 'hide'
        },
        location: {
          readonly: [['recurrency', '=', true]],
          optional: 'show'
        },
        duration: {
          widget: 'float_time',
          readonly: '1'
        },
        description: {
          readonly: [['recurrency', '=', true]],
          optional: 'hide'
        },
        allday: { invisible: '1' },
        message_needaction: { invisible: '1' }
      }
    }
  },

  view_calendar_event_form: {
    _odoo_model: 'ir.ui.view',
    model: 'calendar.event',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: { class: 'd-flex align-items-baseline' },
          partner_ids: {
            widget: 'many2manyattendee',
            domain: [['type', '!=', 'private']],
            context: { force_email: true },
            class: 'oe_inline o_calendar_attendees',
            placeholder: 'Select attendees...'
          },
          _div_send_buttons: {
            _attr: {
              name: 'send_buttons',
              class: 'sm-2'
            },
            _button_action_open_composer: {
              _attr: {
                name: 'action_open_composer',
                type: 'object',
                string: ' EMAIL',
                icon: 'fa-envelope',
                help: 'Send Email to attendees'
              }
            }
          },
          _button_action_join_video_call: {
            _attr: {
              name: 'action_join_video_call',
              type: 'object',
              string: 'Join Video Call',
              help: 'Join Video Call',
              invisible: [['videocall_location', '=', false]],
              class: 'btn-primary'
            }
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_open_calendar_event: {
            _attr: {
              name: 'action_open_calendar_event',
              type: 'object',
              string: 'Document',
              icon: 'fa-bars',
              invisible: ['|', ['res_model', '=', false], ['res_id', '=', false]]
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        res_model: { invisible: '1' },
        res_id: { invisible: '1' },
        attendee_status: { invisible: '1' },
        active: { invisible: '1' },
        _div_title: {
          _attr: { class: 'oe_title mb-3' },
          _div: {
            _label_name: { for: 'name' }
          },
          _h1: {
            name: { placeholder: 'e.g. Business Lunch' }
          }
        },
        _div_179: {
          _attr: {
            invisible: [['invalid_email_partner_ids', '=', []]],
            class: 'alert alert-warning o_form_header mt-2'
          },
          _p: { _strong: "The following attendees have invalid email addresses and won't receive any email notifications:" },
          invalid_email_partner_ids: {
            widget: 'many2manyattendee',
            class: 'oe_inline o_calendar_attendees'
          }
        },
        _notebook: {
          _page_page_details: {
            _attr: {
              name: 'page_details',
              string: 'Meeting Details'
            },
            _group: {
              _group: {
                start_date: {
                  string: 'Starting at',
                  required: [['allday', '=', true]],
                  invisible: [['allday', '=', false]],
                  force_save: '1'
                },
                stop_date: {
                  string: 'Ending at',
                  required: [['allday', '=', true]],
                  invisible: [['allday', '=', false]],
                  force_save: '1'
                },
                start: {
                  string: 'Starting at',
                  required: [['allday', '=', false]],
                  invisible: [['allday', '=', true]]
                },
                stop: {
                  string: 'Ending At',
                  invisible: [['allday', '=', true]]
                },
                _label_duration: {
                  for: 'duration',
                  invisible: [['allday', '=', true]]
                },
                _div: {
                  _attr: { invisible: [['allday', '=', true]] },
                  duration: {
                    string: 'Duration',
                    widget: 'float_time',
                    readonly: [['id', '!=', false], ['recurrency', '=', true]],
                    class: 'oe_inline'
                  },
                  _span: 'hours'
                },
                event_tz: { invisible: [['recurrency', '=', false]] },
                allday: { force_save: '1' },
                user_id: { widget: 'many2one_avatar_user' }
              },
              _group_735: {
                alarm_ids: {
                  widget: 'many2many_tags',
                  no_quick_create: true
                },
                location: {},
                _label_videocall_location: { for: 'videocall_location' },
                _div: {
                  _attr: { class: 'o_row' },
                  videocall_location: {
                    string: 'Videocall URL',
                    widget: 'CopyClipboardChar',
                    readonly: '1',
                    class: 'oe_inline',
                    force_save: '1'
                  },
                  _button_clear_videocall_location: {
                    _attr: {
                      name: 'clear_videocall_location',
                      type: 'object',
                      invisible: [['videocall_location', '=', false]],
                      context: { todo_ctx: "{'recurrence_update': recurrence_update}" },
                      class: 'btn btn-link'
                    },
                    _span: {
                      _attr: { class: 'fa fa-times' }
                    },
                    _span_238: 'Clear meeting'
                  },
                  _button_set_discuss_videocall_location: {
                    _attr: {
                      name: 'set_discuss_videocall_location',
                      type: 'object',
                      invisible: [['videocall_location', '!=', false]],
                      context: { todo_ctx: "{'recurrence_update': recurrence_update}" },
                      class: 'btn btn-link'
                    },
                    _span: {
                      _attr: { class: 'fa fa-plus' }
                    },
                    _span_117: 'Add Odoo meeting'
                  }
                },
                videocall_source: { invisible: '1' },
                access_token: {
                  invisible: '1',
                  force_save: '1'
                },
                categ_ids: {
                  widget: 'many2many_tags',
                  color_field: 'color',
                  no_create_edit: true
                }
              }
            },
            _group_166: {
              description: {}
            }
          },
          _page_page_options: {
            _attr: {
              name: 'page_options',
              string: 'Options'
            },
            _group: {
              _div: {
                _group: {
                  recurrency: {}
                },
                _div: {
                  _attr: { invisible: [['recurrency', '=', false]] },
                  _group: {
                    _label_interval: { for: 'interval' },
                    _div: {
                      _attr: { class: 'o_col' },
                      _div: {
                        _attr: { class: 'o_row' },
                        interval: {
                          required: [['recurrency', '=', true]],
                          class: 'oe_inline'
                        },
                        rrule_type: { required: [['recurrency', '=', true]] }
                      },
                      _widget_week_days: {
                        _attr: {
                          name: 'week_days',
                          invisible: [['rrule_type', '!=', 'weekly']]
                        }
                      }
                    },
                    _label_end_type: {
                      for: 'end_type',
                      string: 'Until'
                    },
                    _div_180: {
                      _attr: { class: 'o_row' },
                      end_type: { required: [['recurrency', '=', true]] },
                      count: {
                        invisible: [['end_type', '!=', 'count']],
                        required: [['recurrency', '=', true]]
                      },
                      until: {
                        invisible: [['end_type', '!=', 'end_date']],
                        required: [['end_type', '=', 'end_date'], ['recurrency', '=', true]]
                      }
                    }
                  },
                  _group_482: {
                    _attr: { invisible: [['rrule_type', '!=', 'monthly']] },
                    _label_month_by: {
                      for: 'month_by',
                      string: 'Day of Month'
                    },
                    _div: {
                      _attr: { class: 'o_row' },
                      month_by: {},
                      day: {
                        required: [['month_by', '=', 'date'], ['rrule_type', '=', 'monthly']],
                        invisible: [['month_by', '!=', 'date']]
                      },
                      byday: {
                        string: 'The',
                        required: [['recurrency', '=', true], ['month_by', '=', 'day'], ['rrule_type', '=', 'monthly']],
                        invisible: [['month_by', '!=', 'day']]
                      },
                      weekday: {
                        required: [['recurrency', '=', true], ['month_by', '=', 'day'], ['rrule_type', '=', 'monthly']],
                        invisible: [['month_by', '!=', 'day']]
                      }
                    }
                  }
                }
              },
              _group: {
                privacy: {},
                show_as: {},
                recurrence_id: { invisible: '1' }
              }
            }
          },
          _page_page_invitations: {
            _attr: {
              name: 'page_invitations',
              string: 'Invitations',
              groups: 'base.group_no_one'
            },
            _button_action_sendmail: {
              _attr: {
                name: 'action_sendmail',
                type: 'object',
                string: 'Send Invitations',
                icon: 'fa-envelope',
                class: 'oe_link'
              }
            },
            attendee_ids: {
              widget: 'one2many',
              readonly: '1',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Invitation details' },
                      partner_id: {},
                      email: { widget: 'email' },
                      phone: { widget: 'phone' },
                      state: {},
                      _button_do_tentative: {
                        _attr: {
                          name: 'do_tentative',
                          type: 'object',
                          string: 'Uncertain',
                          icon: 'fa-asterisk',
                          states: 'needsAction,declined,accepted'
                        }
                      },
                      _button_do_accept: {
                        _attr: {
                          name: 'do_accept',
                          type: 'object',
                          string: 'Accept',
                          icon: 'fa-check text-success',
                          states: 'needsAction,tentative,declined'
                        }
                      },
                      _button_do_decline: {
                        _attr: {
                          name: 'do_decline',
                          type: 'object',
                          string: 'Decline',
                          icon: 'fa-times-circle text-danger',
                          states: 'needsAction,tentative,accepted'
                        }
                      }
                    }
                  }
                },
                kanban: {
                  arch: {
                    sheet: {
                      _attr: { class: 'o_kanban_mobile' },
                      partner_id: {},
                      state: {},
                      email: { widget: 'email' },
                      _templates: {
                        _t: {
                          _div: {
                            _attr: { class: 'd-flex flex-column justify-content-between' },
                            partner_id: {},
                            email: { widget: 'email' },
                            _span: {
                              _attr: { text: 'Status:' },
                              state: {}
                            },
                            _div: {
                              _attr: { class: 'text-end' },
                              _button_do_tentative: {
                                _attr: {
                                  name: 'do_tentative',
                                  type: 'object',
                                  string: 'Uncertain',
                                  states: 'needsAction,declined,accepted',
                                  class: 'btn fa fa-asterisk'
                                }
                              },
                              _button_do_accept: {
                                _attr: {
                                  name: 'do_accept',
                                  type: 'object',
                                  string: 'Accept',
                                  states: 'needsAction,tentative,declined',
                                  class: 'btn fa fa-check text-success'
                                }
                              },
                              _button_do_decline: {
                                _attr: {
                                  name: 'do_decline',
                                  type: 'object',
                                  string: 'Decline',
                                  states: 'needsAction,tentative,accepted',
                                  class: 'btn fa fa-times-circle text-danger'
                                }
                              }
                            }
                          }
                        }
                      }
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

  view_calendar_event_calendar: {
    _odoo_model: 'ir.ui.view',
    model: 'calendar.event',
    type: 'otherview',
    arch: {}
  },

  view_calendar_event_search: {
    _odoo_model: 'ir.ui.view',
    model: 'calendar.event',
    type: 'search',
    arch: {
      name: {
        string: 'Meeting',
        filter_domain: { todo_ctx: "[('name', 'ilike', self)]" }
      },
      partner_ids: {},
      user_id: {},
      location: {},
      show_as: {},
      categ_ids: {},
      description: {},
      _filter_mymeetings: {
        _attr: {
          name: 'mymeetings',
          string: 'My Meetings',
          help: 'My Meetings',
          domain: { todo_ctx: "[('partner_ids.user_ids', 'in', [uid])]" }
        }
      },
      _separator: {},
      _filter_filter_start_date: {
        _attr: {
          name: 'filter_start_date',
          string: 'Date',
          date: 'start'
        }
      },
      _separator_566: {},
      _filter_busy: {
        _attr: {
          name: 'busy',
          string: 'Busy',
          domain: [['show_as', '=', 'busy']]
        }
      },
      _filter_free: {
        _attr: {
          name: 'free',
          string: 'Free',
          domain: [['show_as', '=', 'free']]
        }
      },
      _separator_779: {},
      _filter_public: {
        _attr: {
          name: 'public',
          string: 'Public',
          domain: [['privacy', '=', 'public']]
        }
      },
      _filter_private: {
        _attr: {
          name: 'private',
          string: 'Private',
          domain: [['privacy', '=', 'private']]
        }
      },
      _filter_confidential: {
        _attr: {
          name: 'confidential',
          string: 'Only Internal Users',
          domain: [['privacy', '=', 'confidential']]
        }
      },
      _separator_769: {},
      _filter_recurrent: {
        _attr: {
          name: 'recurrent',
          string: 'Recurrent',
          domain: [['recurrency', '=', true]]
        }
      },
      _separator_162: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_responsible: {
          _attr: {
            name: 'responsible',
            string: 'Responsible',
            domain: [],
            context: { group_by: 'user_id' }
          }
        }
      }
    }
  },

  action_calendar_event: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Meetings',
    res_model: 'calendar.event',
    search_view_id: 'view_calendar_event_search',
    views: {
      tree: 'view_calendar_event_calendar',
      form: '=======todo=========='
    }
  },

  action_view_calendar_event_calendar: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'calendar',
    view_id: 'view_calendar_event_calendar',
    act_window_id: 'action_calendar_event'
  },

  action_view_calendar_event_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'view_calendar_event_tree',
    act_window_id: 'action_calendar_event'
  },

  action_view_calendar_event_form: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'view_calendar_event_form',
    act_window_id: 'action_calendar_event'
  }
}
