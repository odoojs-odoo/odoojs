import treeViewMixin from '@/mixins/treeViewMixin'

import api from '@/odooapi'

export default {
  mixins: [treeViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    viewType() {
      return 'kanban'
    },

    kanban_class() {
      const node = this.node || {}
      const arr = ['o_kanban_view', ' o_kanban_ungrouped']
      if (node.attrs.class) arr.push(node.attrs.class)
      return arr.join(' ')
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {
    render_kanban(record) {
      const node = api.Views.kanban.render_kanban(this.viewInfo2, record)
      // console.log(node)
      return node
    },

    async handleOnRowClick2(row) {
      if (this.kanban_class.includes('o_account_kanban')) return
      else this.handleOnRowClick(row)
    }

    // // 判断是否为base64
    // isBase64(str) {
    //   if (str === '' || str.trim() === '') {
    //     return false
    //   }
    //   try {
    //     return btoa(atob(str)) == str
    //   } catch (err) {
    //     return false
    //   }
    // }
    // render_kanban(record) {
    //   const node = action_view.kanban.render_kanban({
    //     action: this.action,
    //     record: this.isBase64(record.image_128)?Object.assign(record, {image_128: 'data:image/png;base64,' + record.image_128}):record
    //   })
    // console.log('viewInfoForNode,,', record, this.viewInfoForNode);
    // isBase64(str) {
    //   if (str === '' || str.trim() === '') {
    //     return false
    //   }
    //   try {
    //     return btoa(atob(str)) == str
    //   } catch (err) {
    //     return false
    //   }
    // },
  }
}
