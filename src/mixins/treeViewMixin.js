import api from '@/odooapi'

import treeSearchMixin from './treeSearchMixin'

const PageSize = 2

export default {
  mixins: [treeSearchMixin],

  props: {},

  data() {
    return {
      loading: false,

      pagination: {
        // position: 'top'
        total: 0,
        pageSize: PageSize
      }
    }
  },
  computed: {
    pagination2() {
      const { pagination } = this.data
      if (pagination) return pagination

      return { current: 1, total: 0, pageSize: PageSize }
    }
  },
  watch: {
    pagination2: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldval) {
        // console.log('watch, pagination2, val', newVal, oldval)
        // this.$emit('update:searchValue', newVal)
        this.pagination = JSON.parse(JSON.stringify(newVal))
      },
      deep: true,
      immediate: true
    }
  },

  async created() {},

  mounted() {},

  methods: {
    async load_data(search) {
      // console.log('load_data', [search, this.searchValue])
      this.data = await api.Views[this.viewType].load_data(this.viewInfo2, {
        search: search || this.searchValue,
        pagination: this.pagination
      })
      // console.log(this.data)
    },

    async handleOnSearchChange(search) {
      this.handlePageChange(1, undefined, search)
    },

    fresh_data() {
      this.handlePageChange(1)
      // this.load_data()
    },

    async handlePageChange(page, pageSize, search) {
      this.pagination = { ...this.pagination, current: page }
      this.load_data(search)
    },

    async onExpend(expanded, record) {
      if (expanded) {
        const res = await api.Views.list.web_read_group2(this.viewInfo2, {
          groupby: this.groupby,
          record
        })

        const { records } = res
        record.children = records
      }
    },

    async handleOnRowClick(row) {
      const { action } = this.viewInfo
      // console.log(row.id, this.expandedRowKeys)

      if (typeof row.id === 'string') {
        const expid = this.expandedRowKeys.find(item => item === row.id)

        if (expid)
          this.expandedRowKeys = this.expandedRowKeys.filter(
            item => item !== row.id
          )
        else {
          this.expandedRowKeys = [...this.expandedRowKeys, row.id]
          this.onExpend(true, row)
        }
      } else {
        // const active_id = context.active_id
        this.$route.meta.viewInfo = this.viewInfo
        const path = `/web`
        const query = {
          action: action.id,
          view_type: 'form',
          id: row.id
          // ...(active_id ? { active_id } : {})
        }
        this.$router.push({ path, query })
      }
    }
  }
}
