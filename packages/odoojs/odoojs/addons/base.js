const res_partner_extend = BaseClass => {
  class cls extends BaseClass {
    async address_get() {
      const data = this.call('address_get');
      // cls._records = ??
      //this.setattr('address_fields', data)
      return data;
    }

    async update_address(vals) {
      const data = this.call('update_address', [vals]);
      if (data) {
        //TBD
      }
      return this.address_get();
    }

    async create_company() {
      const data = this.call('create_company', []);
      if (data) {
        //TBD
      }
      return await this.browse({ parent_id: 0, child_ids: 0 });
    }
  }

  cls.main_partner = async () => {
    const data = cls.call('main_partner', []);
    return data;
  };

  cls.find_or_create = async email => {
    const data = cls.call('find_or_create', [email]);
    return await cls.browse(data);
  };

  return cls;
};

const res_country_extend = BaseClass => {
  class cls extends BaseClass {
    get_address_fields() {
      const data = this.call('get_address_fields', []);
      //this.setattr('address_fields', data)
      return data;
    }
  }

  return cls;
};

const res_currency_extend = BaseClass => {
  class cls extends BaseClass {
    amount_to_text(amount) {
      const data = this.call('amount_to_text', [amount]);
      return data;
    }

    round(amount) {
      const data = this.call('round', [amount]);
      return data;
    }

    compare_amounts(amount1, amount2) {
      const data = this.call('compare_amounts', [amount1, amount2]);
      return data;
    }

    is_zero(amount) {
      const data = this.call('is_zero', [amount]);
      return data;
    }
  }

  return cls;
};

const res_company_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.create_with_user = async (vals, user_vals) => {
    const data = await cls.call('create_with_user', [vals, user_vals]);
    if (data) {
      return cls.browse(data, { user_ids: 1, user_id: 1 });
    }
    return data;
  };

  return cls;
};

const res_users_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.change_password = async (old_passwd, new_passwd) => {
    const data = cls.call('change_password', [old_passwd, new_passwd]);
    return data;
  };

  cls.has_group = async group_ext_id => {
    const data = cls.call('has_group', [group_ext_id]);
    return data;
  };

  cls.copy_admin = async vals => {
    const user = await cls.create(vals);
    if (!user) {
      return user;
    }
    const [model, admin_id] = await cls.ref('base.user_admin');

    if (model !== 'res.users') {
    }

    const admin = await cls.browse(admin_id, { groups_id: { name: 0 } });
    await user.write({ groups_id: [[6, 0, admin.attr('groups_id').ids()]] });
    return user;
  };

  return cls;
};

const res_users_template = {
  treeview: [],
  formview: [
    {
      title: '基本信息',
      columns: [
        { title: '账号', dataIndex: 'login' },
        { title: '名称', dataIndex: 'name' },
      ],
    },
    {
      title: '',
      columns: [],
    },
    {
      title: '其他信息',
      columns: [
        { title: '邮箱', dataIndex: 'partner_id.email' },
        { title: '名称2', dataIndex: 'partner_id.name' },
      ],
    },
  ],

  editview: [
    { label: '名称', field: 'name', type: 'char' },
    { label: 'ref', field: 'ref', type: 'char' },
  ],
};

const res_partner_template = {
  formview: [
    {
      title: '基本信息',
      columns: [{ title: '名称', dataIndex: 'name' }],
    },
    {
      title: '',
      columns: [],
    },
    {
      title: '其他信息',
      columns: [
        { title: '邮箱', dataIndex: 'email' },
        { title: 'ref', dataIndex: 'ref' },
        {
          title: 'child_ids',
          dataIndex: 'child_ids',
          type: 'one2many',
          relation: 'res.partner',
        },
      ],
    },
  ],

  editview2: [
    { label: '名称', field: 'name', type: 'char' },
    { label: '邮箱', field: 'email', type: 'char' },
    { label: 'ref', field: 'ref', type: 'char', rules: [{ required: true }] },
    { label: 'color', field: 'color', type: 'integer' },

    { label: 'title', field: 'title', type: 'many2one' },
  ],

  treeview: [
    { title: '名称', dataIndex: 'name' },
    { title: 'ref', dataIndex: 'ref' },
  ],
};

export default {
  name: 'base',
  depends: {},
  models: {
    'res.bank': {
      fields: [
        'name',
        'street',
        'street2',
        'zip',
        'city',
        'state',
        'country',
        'email',
        'phone',
        'active',
        'bic',
      ],
    },

    'res.partner.bank': {
      fields: [
        'acc_type',
        'acc_number',
        'sanitized_acc_number',
        'acc_holder_name',
        'partner_id',
        'bank_id',
        'bank_name',
        'bank_bic',
        'sequence',
        'currency_id',
        'company_id',
        'qr_code_valid',
      ],
    },

    'res.company': {
      fields: [
        'name',
        //  'sequence',
        'parent_id',
        'child_ids',
        'partner_id',
        //  'report_header',
        //  'report_footer',
        //  'logo',
        //  'logo_web',
        //  'currency_id',
        'user_ids',
        //  'account_no',
        'street',
        'street2',
        'zip',
        'city',
        'state_id',
        //  'bank_ids',
        //  'country_id',
        'email',
        'phone',
        //  'website',
        'vat',
        'company_registry',
        //  'base_onboarding_company_state',
        'user_id', // the admin user of this company
      ],

      extend: res_company_extend,
    },

    'res.country': {
      fields: [
        'name',
        'code',
        'address_format',
        'currency_id',
        'image',
        'phone_code',
        'country_group_ids',
        'state_ids',
        'name_position',
        'vat_label',
      ],

      extend: res_country_extend,
    },

    'res.country.group': {
      fields: ['name', 'country_ids'],
    },

    'res.country.state': {
      fields: ['country_id', 'name', 'code'],
    },

    'res.currency': {
      fields: [
        'name',
        'symbol',
        'rate',
        'rate_ids',
        'rounding',
        'decimal_places',
        'active',
        'position',
        'date',
        'currency_unit_label',
        'currency_subunit_label',
      ],
      extend: res_currency_extend,
    },

    'res.currency.rate': {
      fields: ['name', 'rate', 'currency_id', 'company_id'],
    },

    'res.partner.category': {
      fields: [
        'name',
        'color',
        'parent_id',
        'child_ids',
        'active',
        'parent_path',
        'partner_ids',
      ],
    },

    'res.partner.title': {
      fields: ['name', 'shortcut'],
    },

    'res.partner': {
      fields: [
        'name',
        //  'display_name',
        'date',
        'title',
        'parent_id',
        'parent_name',
        'child_ids',
        'ref',
        //  'lang',
        //  'tz',
        //  'tz_offset',
        //  'user_id',
        'vat',
        //  'bank_ids',
        //  'website',
        //  'comment',
        'category_id',
        //  'credit_limit',
        //  'barcode',
        //  'active',
        'customer',
        'supplier',
        //  'employee',
        //  'function',
        'type',
        //  'street',
        //  'street2',
        //  'zip',
        //  'city',
        //  'state_id',
        //  'country_id',
        'email',
        //  'email_formatted',
        //  'phone',
        //  'mobile',
        'is_company',
        //  'industry_id',
        //  'company_type',
        'company_id',
        'color',
        'user_ids',
        //  'partner_share',
        //  'contact_address',
        //  'commercial_partner_id',
        //  'commercial_company_name',
        //  'company_name',
        //  'image',
        //  'image_medium',
        //  'image_small'
      ],

      template: res_partner_template,

      extend: res_partner_extend,
    },

    'res.partner.industry': {
      fields: ['name', 'full_name', 'active'],
    },

    'res.groups': {
      fields: [
        'name',
        'users',
        'model_access',
        'rule_groups',
        'comment',
        'category_id',
        'color',
        'full_name',
        'share',
      ],
    },

    'res.users.log': {
      fields: ['create_uid', 'create_date'],
    },

    'res.users': {
      fields: [
        'partner_id',
        'login',
        'ref',
        //  'password',
        //  'new_password',
        //  'signature',
        //  'active',
        'groups_id',
        'log_ids',
        'login_date',
        //  'share',
        //  'companies_count',
        //  'tz_offset',
        'company_id',
        'company_ids',
        'name',
        'email',
      ],
      template: res_users_template,
      extend: res_users_extend,
    },
  },
};
