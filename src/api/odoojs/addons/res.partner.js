const ResPartner = {
  // _name: 'res.partner',
  metadata: {
    description: '参与人',

    // 这里定义基本的字段属性 可被其他地方利用
    // 目前实现了:
    // 1 图片字段的处理, saerch/browse 后, 生成 图片字段的 url
    fields: {
      image_1920: { type: 'image' },
      image_1024: { type: 'image' },
      image_512: { type: 'image' },
      image_256: { type: 'image' },
      image_128: { type: 'image' },
      date: { type: 'date' },
      type: { type: 'selection', string: '地址类型' }
    },

    //
    fieldsForQuery: {
      name: null,
      email: null,
      category_id: null,
      date: null,
      type: null,
      comment: null
    },

    fieldsForSearch: undefined,
    fieldsForBrowse: undefined,
    // 这里定义了 form 表单中的字段, 决定了 create 和 write 函数的 values
    fieldsForEdit: undefined,

    searchs: {
      type: {
        string: '个人或公司',
        filters: {
          type_person: { string: '个人', domain: [['is_company', '=', false]] },
          type_company: { string: '公司', domain: [['is_company', '=', true]] }
        }
      },
      sale_or_purchase: {
        string: '客户或供应商',
        filters: {
          customer: { string: '客户', domain: [['customer_rank', '>', 0]] },
          supplier: { string: '供应商', domain: [['supplier_rank', '>', 0]] },
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    },

    forAppList: {
      title: (rec) => {
        return `${rec.display_name}`
      },
      icon: (rec) => {
        return `${rec.image_128}`
        // get_image('res.partner', rec.id, 'image_1920')
      },

      label: (rec) => {
        return `${rec.email || ''}`
      },
      value: (rec) => {
        return `${rec.email || ''}`
      }
    },

    columnsForList: {
      name: { label: '名称' },
      email: { label: '邮箱' }
    },

    columnsForView: {
      name: { label: '名称' },
      email: { label: '邮箱' },
      category_id: { label: '标签' },
      date: { label: '日期' },
      type__name: { label: '类型' },
      image_128: { type: 'img', label: '图片' }
    },

    columnsForForm: {
      name: { label: '名称:', placeholder: '名称' },
      email: { label: '邮箱:', placeholder: '邮箱' },
      category_id: {
        type: 'select',
        multiple: 'multiple',
        label: '标签',
        placeholder: '标签'
      },
      date: { type: 'date', label: '日期' },
      type: { type: 'radio', label: '类型' },

      image_1920: { type: 'img', label: '图片' },
      comment: { type: 'textarea', label: '备注:', placeholder: '备注' }
    },

    optionsForForm: {
      category_id: {},
      type: {}
    },

    btnNew: { hidden: false, label: '新增' },
    btnView: { hidden: false, label: '查看' },
    btnEdit: { hidden: false, label: '编辑' },
    btnDel: { hidden: false, label: '删除' }
  },

  extend: (BaseClass) => {
    class ModelClass extends BaseClass {
      global_domain(payload = {}) {
        const { domain = {} } = payload
        return super.global_domain({
          ...payload,
          domain: { ...domain, id___not_in: [1, 3] }
        })
      }

      main_partner() {
        return this.call('main_partner')
      }

      find_or_create(email) {
        return this.call('find_or_create', [email])
      }

      async browse_one(rid, kwargs) {
        const res = await super.browse_one(rid, kwargs)
        return res
      }

      async search(params = {}) {
        console.log('search in addons res partner')
        const res = await super.search(params)
        return res
      }
    }
    return ModelClass
  }
}

const ResPartnerEmployee = {
  _inherit: 'res.partner', // 继承自 哪个 js model. 若为空, 本身就是 根 model, 直接对应 odoo model
  // _name: 'res.partner', // 对应 odoo model, 若为空, 则依次取 [ 父 js model 的 _name, 自己的 env参数名 ]

  metadata: {
    description: '参与人 员工',
    filter: ['sale_or_purchase.customer']
  },

  extend: (BaseClass) => {
    class ModelClass extends BaseClass {
      global_domain(payload = {}) {
        const { domain = {} } = payload
        return super.global_domain({
          ...payload,
          domain: { ...domain, employee: true }
        })
      }

      async create(values = {}, kwargs = {}) {
        const values2 = { ...values, employee: true }
        return super.create(values2, kwargs)
      }
    }
    return ModelClass
  }
}

const ResPartnerCompany = {
  _inherit: 'res.partner',

  metadata: {
    description: '公司'
  },

  extend: (BaseClass) => {
    class ModelClass extends BaseClass {
      global_domain(payload = {}) {
        // const { domain = {}, domain2 = [] } = payload
        // return super.global_domain(payload)
        const { domain = {} } = payload
        return super.global_domain({
          ...payload,
          domain: { ...domain, is_company: true }
        })
      }

      async create(values = {}, kwargs = {}) {
        const values2 = { ...values, is_company: true }
        return super.create(values2, kwargs)
      }
    }
    return ModelClass
  }
}

const ResPartnerPerson = {
  _inherit: 'res.partner',

  metadata: {
    description: '个人'
  },

  extend: (BaseClass) => {
    class ModelClass extends BaseClass {
      global_domain(payload = {}) {
        // const { domain = {}, domain2 = [] } = payload
        // return super.global_domain(payload)
        const { domain = {} } = payload
        return super.global_domain({
          ...payload,
          domain: { ...domain, is_company: false }
        })
      }
    }
    return ModelClass
  }
}

const Models = {
  'res.partner': ResPartner,
  'res.partner.employee': ResPartnerEmployee,
  'res.partner.company': ResPartnerCompany,
  'res.partner.person': ResPartnerPerson
}

export default Models
