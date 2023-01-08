import treeMixin from '@/odooui/treeMixin'
import { try_call } from '@/odoorpc/tools'

export default {
  components: {},
  mixins: [treeMixin],
  props: {},
  data() {
    return {
      wizardVisible: false,
      wizardAction: undefined,
      h: 0
    }
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.activeIds,
        onChange: (selectedRowKeys, selectedRows) => {
          this.handleOnRowSelect(selectedRowKeys, selectedRows)
        }
      }
    },
    widthAndHeight() {
      // console.log(this.h);
      return { x: 1000, y: this.h }
    }
  },

  watch: {},

  created() {},

  mounted() {
    if (document.body.scrollHeight > 757 && document.body.scrollHeight < 935) {
      this.h = document.body.scrollHeight - 365
    } else {
      this.h = document.body.scrollHeight - 370
    }
    window.onresize = () => {
      // console.log(document.body.scrollHeight)
      if (
        document.body.scrollHeight > 757 &&
        document.body.scrollHeight < 935
      ) {
        this.h = document.body.scrollHeight - 410
      } else {
        this.h = document.body.scrollHeight - 370
      }
    }
  },

  methods: {
    // // eslint-disable-next-line no-unused-vars
    // handleTableChange(pagination, filters, sorter) {
    //   // console.log(pagination, filters, sorter)
    //   const page = pagination.current
    //   this.handlePageChange(page)
    // },

    tableCustomRow(record) {
      const that = this
      return {
        // props: {
        //   xxx... //属性
        // },
        on: {
          // 事件
          // eslint-disable-next-line no-unused-vars
          click: event => {
            // console.log(record, event)
            that.handleOnRowClick(record)
          } // 点击行
        }
      }
    },

    async handleOnUnlink() {
      const call_ok = async () => {
        const { error } = await try_call(async () => {
          return this.unlink()
        })

        if (error) {
          this.$error({ title: '用户错误', content: error.data.message })
        } else {
          this.fresh_data()
        }
      }
      this.$confirm({
        title: '确认删除?',
        content: '点击 ok 按钮, 将删除该条记录',
        async onOk() {
          call_ok()
        },
        onCancel() {}
      })
    },

    handleWizardDone() {
      console.log('handleWizardDone')
    },

    handleActionCall(action_xml_id) {
      const actionId = action_xml_id
      const activeIds = this.activeIds
      console.log('handleActionCall', actionId, activeIds)
      this.wizardAction = actionId
      this.wizardVisible = true
    },

    onClickRight(btn) {
      const btn_fns = {
        new: 'onClickNew',
        export_all: 'handleOnExportAll',
        unlink: 'handleOnUnlink',
        archive: 'handleOnArchive',
        unarchive: 'handleOnUnarchive'
      }

      if (!btn_fns[btn]) {
        this.handleActionCall(btn)
      } else {
        this[btn_fns[btn]]()
      }
    }
  }
}
