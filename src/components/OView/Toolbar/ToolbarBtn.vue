<template>
  <div>
    <a-space>
      <template v-if="editable && viewType === 'form'">
        <a-button size="small" type="primary" @click="handleOnCommit">
          保存
        </a-button>
        <a-button size="small" @click="handleOnCancel">放弃</a-button>
      </template>

      <template v-if="!editable && viewType === 'form'">
        <a-button
          v-if="!hideButton.edit && viewType === 'form'"
          size="small"
          type="primary"
          @click="handleOnWrite"
        >
          编辑
        </a-button>

        <a-button
          v-if="!hideButton.create"
          size="small"
          @click="handleOnCreate"
        >
          创建
        </a-button>
      </template>

      <template v-if="['kanban', 'list'].includes(viewType)">
        <a-button
          v-if="!hideButton.create"
          size="small"
          type="primary"
          @click="handleOnCreate"
        >
          创建
        </a-button>
      </template>

      <template v-if="['list'].includes(viewType)">
        <a-tooltip placement="bottom">
          <template slot="title"> 导出全部 </template>
          <a-button size="small" icon="download" @click="handleOnExportAll" />
        </a-tooltip>
        <!-- TBD  导入功能 暂时屏蔽  -->
        <!-- &nbsp;&nbsp;&nbsp;
        <a-tooltip placement="bottom">
          <template slot="title"> 导入记录 </template>
          <a-button size="small" icon="upload" @click="handleOnImport" />
        </a-tooltip> -->
      </template>
    </a-space>

    &nbsp;&nbsp;&nbsp;

    <a-space
      style="float: right"
      v-if="
        (viewType === 'form' && !editable) ||
          (viewType === 'list' && activeIds.length)
      "
    >
      <a-dropdown :trigger="['click']">
        <a-button size="small" style="margin-left: 8px">
          <a-icon type="printer" /> 打印
        </a-button>
        <a-menu slot="overlay" @click="handleOnPrint">
          <template v-for="btn in printBtns">
            <a-menu-item :key="btn.id"> {{ btn.display_name }} </a-menu-item>
          </template>
        </a-menu>
      </a-dropdown>

      <a-dropdown :trigger="['click']">
        <a-button size="small" style="margin-left: 8px">
          <a-icon type="setting" /> 操作
        </a-button>
        <a-menu slot="overlay" @click="handleMenuClick">
          <template v-if="viewType === 'list'">
            <!-- TBD   导出功能 暂时屏蔽  -->
            <!-- <a-menu-item key="export"> 导出 </a-menu-item> -->
            <a-menu-item v-if="!hideButton.delete" key="unlink_multi">
              删除
            </a-menu-item>
            <a-menu-item key="archive" v-if="hasActive"> 存档 </a-menu-item>
            <a-menu-item key="unarchive" v-if="hasActive">
              取消存档
            </a-menu-item>
          </template>
          <template v-if="viewType === 'form'">
            <a-menu-item v-if="!hideButton.create" key="copy">
              复制
            </a-menu-item>
            <a-menu-item v-if="!hideButton.delete" key="unlink">
              删除
            </a-menu-item>
          </template>
          <template v-for="btn in actionBtns">
            <a-menu-item :key="btn.id"> {{ btn.display_name }} </a-menu-item>
          </template>
        </a-menu>
      </a-dropdown>
    </a-space>
  </div>
</template>

<script>
import viewMixin from '@/mixins/viewMixin'

// const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'ToolbarBtn',
  components: {},
  mixins: [viewMixin],

  props: {
    editable: { type: Boolean, default: false },
    viewType: { type: String, default: '' },

    activeIds: { type: Array, default: () => [] },

    hideButton: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      // 判断 存档和取消存档 菜单是否显示
      hasActive: undefined
    }
  },

  computed: {
    toolbar() {
      const vt = this.viewType
      if (!['list', 'form'].includes(vt)) return {}
      const { views = {} } = this.viewInfo || {}
      const { toolbar = {} } = views[vt] || {}
      return toolbar
    },

    printBtns() {
      const toolbar = this.toolbar
      const { print = [] } = toolbar
      return print
    },

    actionBtns() {
      const toolbar = this.toolbar
      const { action = [] } = toolbar
      return action
    }
  },

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    async initData() {
      const model = this.modelGet()
      // const info = this.viewInfo
      // console.log(cp(info), model)
      const active = model.action.fields.active
      this.hasActive = active
    },

    // list view
    handleOnCreate() {
      this.$emit('on-event', 'on-new')
    },

    // form view edit
    handleOnWrite() {
      console.log(' handleOnWrite ')
      this.$emit('on-event', 'on-form-event', 'on-edit')
    },

    handleOnCommit() {
      this.$emit('on-event', 'on-form-event', 'on-commit')
    },

    handleOnCancel() {
      this.$emit('on-event', 'on-form-event', 'on-rollback')
    },

    async handleOnExportAll() {
      this.$emit('on-event', 'on-list-event', 'on-export-all')
    },

    async handleOnImport() {
      this.$emit('on-event', 'on-list-event', 'on-import')
    },

    async handleOnPrint({ key }) {
      // console.log(' handleOnPrint ')
      const printBtns = this.printBtns
      const action = printBtns.find(btn => btn.id === key)
      if (!action) return

      if (this.viewType === 'list') {
        this.$emit('on-event', 'on-list-event', 'on-print', action)
      } else if (this.viewType === 'form') {
        this.$emit('on-event', 'on-form-event', 'on-print', action)
      }
    },

    handleMenuClick({ key }) {
      if (typeof key === 'string') this.handleActionString(key)
      if (typeof key === 'number') this.handleActionBtn(key)
    },

    async handleActionBtn(key) {
      const action = this.actionBtns.find(item => item.id === key)
      if (this.viewType === 'list') {
        this.$emit('on-event', 'on-list-event', 'on-action', action)
      } else if (this.viewType === 'form') {
        this.$emit('on-event', 'on-form-event', 'on-action', action)
      }
    },

    async handleActionString(key) {
      console.log('string', key)
      if (key === 'export') this.handleOnExport()
      else if (key === 'unlink_multi') this.handleOnUnlink(1)
      else if (key === 'unarchive') this.handleOnUnarchive()
      else if (key === 'archive') this.handleOnArchive()
      else if (key === 'copy') this.handleOnCopy()
      else if (key === 'unlink') this.handleOnUnlink()
    },

    async handleOnExport() {
      this.$emit('on-event', 'on-list-event', 'on-export')
    },

    async handleOnUnlink(multi = false) {
      const call_ok = () => {
        if (multi) this.$emit('on-event', 'on-list-event', 'on-unlink')
        else this.$emit('on-event', 'on-form-event', 'on-unlink')
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

    async handleOnUnarchive() {
      this.$emit('on-event', 'on-list-event', 'on-unarchive')
    },

    async handleOnArchive() {
      this.$emit('on-event', 'on-list-event', 'on-archive')
    },

    async handleOnCopy() {
      this.$emit('on-event', 'on-form-event', 'on-copy')
    }
  }
}
</script>

<style type="text/css"></style>
