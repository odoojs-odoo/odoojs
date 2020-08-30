const modelName = 'res.partner'

const Model = {
  data() {
    return {
      model: modelName,

      fieldsForSearch: {
        company_id: null,
        name: null,
        email: null,
        date: null,
        type: null,
        employee: null,
        is_company: null,
        title: null,
        category_id: { name: null },
        color: null,
        // // image_1920: null,
        parent_id: null
      },

      fieldsForBrowse: {
        name: null,
        email: null,
        title: null,
        category_id: { name: null },
        color: null,
        bank_ids: { bank_id: null },
        child_ids: { name: null }
      },

      fieldsForOption: {
        bank_ids: { type: 'table', label: '银行账户' },
        name: { name: 'name', label: '姓名', sortable: true, default: 'n2' },
        email: {
          name: 'email',
          label: '邮箱',
          default: params => {
            return this.get_email_default()
          }
        },
        date: {
          type: 'datetime',
          name: 'date',
          label: '日期',
          sortable: true,
          default: new Date()
        },

        type: {
          // type: 'select2',
          type: 'radio',
          label: '类型',
          sortable: true,
          asyncOptionsParams: { type: null },
          default: 'contact'
        },

        company_id: {
          type: 'select',
          label: '公司',
          sortable: true,
          asyncOptionsParams: { company_id: null }
        },

        title: {
          type: 'select',
          label: '头衔',
          sortable: true,
          asyncOptionsParams: { title: null }
        },

        category_id: {
          type: 'select',
          label: 'Tags',
          multiple: true,
          asyncOptionsParams: { category_id: null }
        },

        employee: {
          type: 'check',
          label: '员工',
          text: '是员工?',
          sortable: true
        },

        is_company: {
          type: 'check',
          label: '个人或组织',
          text: '是公司?',
          sortable: true
        },

        color: { type: 'number', label: '颜色', sortable: true },

        image_128: {
          type: 'image',
          label: '头像',
          url: {
            url: '/web/image',
            params: {
              model: 'res.partner',
              field: 'image_128',
              id: 0
            }
          }
        },
        image_1920: {
          type: 'image',
          label: '头像',
          url: {
            url: '/web/image',
            params: {
              model: 'res.partner',
              field: 'image_1920',
              id: 0
            }
          }
          // '/web/image?model=res.partner&id=27&field=image_128&unique=20200316165317'
        },

        parent_id: {
          type: 'select',
          label: '组织',
          sortable: true,
          asyncOptionsParams: { parent_id: null },
          // eslint-disable-next-line space-before-function-paren
          // asyncOptions: async () => {
          //   return this.get_select_options_parent_id()
          // },

          computedOptions: ({ options, row }) => {
            return options.filter(item => item.id !== row.id)
          }
        }
      },

      optionForView: {
        leftColumns: ['name', 'email'],
        rightColumns: ['title', 'category_id'],
        tabs: {
          address: {
            label: '联系人和地址',
            type: 'card',
            column: 'child_ids'
            // name: 'name'
          },
          account: { label: '开票', columns: ['bank_ids'] }
        }
      },

      optionForList: {
        searchBox: {
          type: 'eq_ilike',
          name: 'name',
          label: '姓名',
          placeholder: '按名称搜索'
        },

        viewColumns: ['name', 'email', 'date'],
        formColumns: [
          'name',
          'email',
          'type',
          'employee',
          'company_id',
          'is_company',
          'title',
          'category_id',
          'date',
          'color'
          // 'image_1920',
          // 'parent_id'
        ],
        columns: [
          'name',
          'email',
          'type',
          'employee',
          'company_id',
          'is_company',
          'title',
          'image_1920',
          'category_id',
          'date',
          'color',
          'parent_id'
        ]
      }
    }
  },

  methods: {
    get_email_default() {
      return 'qweqweqweqweqew'
    },

    // async init_select_options() {
    //   const fields = { parent_id: {} }
    //   const res = await this.Model.get_options(fields)
    //   return res
    // },

    async get_select_options_parent_id() {
      const fields = {
        parent_id: {}
      }
      const res = await this.Model.get_options(fields)
      return res.parent_id
      //
    }
  }
}
export default Model
