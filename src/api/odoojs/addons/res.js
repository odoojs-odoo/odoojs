const ResBank = {
  metadata: {
    // model: 'res.bank'
    description: '银行',
    fields: {
      name: { type: 'char', string: '名称' },
      bic: { type: 'char', string: '编码' }
    },

    fieldsForQuery: {
      name: null,
      bic: null
    },

    fieldsForSearch: undefined,
    fieldsForBrowse: undefined,
    // 这里定义了 form 表单中的字段, 决定了 create 和 write 函数的 values
    fieldsForEdit: undefined,

    columnsForForm: {
      name: { type0: 'char', label: '名称:', placeholder: '名称' },
      bic: { type0: 'char', label: '编码:', placeholder: '编码' }
    }
  },

  extend: (BaseClass) => {
    class ModelClass extends BaseClass {
      global_domain(payload = {}) {
        // const { domain = {}, domain2 = [] } = payload
        return super.global_domain(payload)
      }

      async browse_one(rid, kwargs) {
        const res = await super.browse_one(rid, kwargs)
        return res
      }

      async search(params = {}) {
        const res = await super.search(params)
        return res
      }
    }
    return ModelClass
  }
}

const ResPartnerBank = {
  metadata: {
    description: '银行账号',
    fields: {
      acc_number: { type: 'char', string: '账号' },
      acc_holder_name: { type: 'char', string: '账号名称' },
      partner_id: { type: 'many2one', string: '持有人' },
      bank_id: { type: 'many2one', string: '银行' },
      bank_name: { type: 'char', string: '银行名称' },
      bank_bic: { type: 'char', string: '银行编码' }
    },

    fieldsForQuery: {
      acc_number: null,
      acc_holder_name: null,
      partner_id: null,
      bank_id: null,
      bank_name: null,
      bank_bic: null
    },

    optionsForForm: {
      partner_id: {},
      bank_id: {}
    },

    columnsForForm: {
      acc_number: { label: '账号:', placeholder: '账号' },
      acc_holder_name: { label: '名称:', placeholder: '名称' },
      partner_id: { type: 'select', label: '持有人:', placeholder: '持有人' },
      bank_id: { type: 'select', label: '银行:', placeholder: '银行' }
    },

    forAppList: {
      title: (rec) => {
        return `${rec.display_name} ${rec.acc_holder_name ||
          rec.partner_id__name} `
      },

      label: (rec) => {
        return `${rec.bank_id__name}`
      }
    }
  }
}

const ResPartnerTitle = {
  // _name: 'res.partner.title',

  metadata: {
    description: '参与人头衔',
    fields: {
      name: { type: 'char', string: '名称' },
      shortcut: { type: 'char', string: '缩写' }
    },

    fieldsForQuery: {
      name: null,
      shortcut: null
    },

    columnsForForm: {
      name: { label: '名称:', placeholder: '名称' },
      shortcut: { label: '缩写:', placeholder: '缩写' }
    },

    forAppList: {
      title: (rec) => {
        return `${rec.display_name} ${rec.shortcut} `
      }

      // label: rec => {
      //   return ``
      // }
    }
  }
}

const PartnerCategory = {
  // _name: 'res.partner.category',

  metadata: {
    order: 'display_name',

    description: '参与人标签',

    fields: {
      name: { type: 'char', string: '名称' },
      parent_path: { type: 'char', string: 'parent_path' },
      parent_id: { type: 'many2one', string: '父标签' }
    },

    fieldsForQuery: {
      name: null,
      parent_id: null
    },

    optionsForForm: {
      parent_id: {
        // fields 为 get_options 的参数
        // filter 为 最后渲染时 调用的函数
        fields: { name: null, parent_path: null },

        filter: (payload) => {
          // const { self, formData, options } = payload
          const { formData: record, options } = payload

          // console.log('PartnerCategory,', record, options)
          // parent_id 不能选自己, 不能选儿孙
          return options.filter((item) => {
            const parent_path = item.object.parent_path
              .split('/')
              .map((item) => Number(item))
            return item.value !== record.id && !parent_path.includes(record.id)
          })
        }
      }
    },

    columnsForForm: {
      name: { label: '名称:', placeholder: '名称' },
      parent_id: { type: 'select', label: '父标签:', placeholder: '父标签' }
    },

    forAppList: {
      title: (rec) => {
        return `${rec.display_name}`
      },

      label: (rec) => {
        return `${rec.parent_path}`
      }
    }
  }
}

const Models = {
  'res.bank': ResBank,
  'res.partner.bank': ResPartnerBank,
  'res.partner.title': ResPartnerTitle,
  'res.partner.category': PartnerCategory
}

export default Models
