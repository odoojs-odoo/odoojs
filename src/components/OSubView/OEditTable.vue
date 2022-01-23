<template>
  <div>
    <a-table
      :columns="columns2"
      :data-source="dataSource2"
      rowKey="__key"
      :pagination="false"
      :customRow="tableCustomRow"
    >
      <template
        v-for="col in columns"
        :slot="col.key"
        slot-scope="text, record"
      >
        <div :key="col.key">
          <a-popconfirm
            v-if="
              columns[Math.floor(columns.length / 2)].key === col.key &&
              currentRow.__key === record.__key
            "
            v-model="popconfirmVisible"
            ok-text="确认"
            cancel-text="取消"
            @cancel="clickedRow = undefined"
            @confirm="handleRowRollbackThenChange"
          >
            <template slot="title">
              当前行已经编辑, <br />确认要放弃编辑, <br />切换到另一行?
            </template>
          </a-popconfirm>

          <template
            v-if="editable && rowEditable && record.__key === currentRow.__key"
          >
            <slot
              :row="record"
              :column="col"
              :text="text"
              name="colEdit"
            ></slot>
          </template>
          <template v-else>
            <slot
              :row="record"
              :column="col"
              :text="text"
              name="colRead"
            ></slot>
          </template>
        </div>
      </template>

      <template slot="action" slot-scope="text, record">
        <template v-if="editable && rowEditable">
          <template v-if="record.__key === currentRow.__key">
            <a-space>
              <a-icon type="check" @click="handleRowCommit" />
              <a-icon type="close" @click="handleRowRollback" />
            </a-space>
          </template>

          <!-- <template v-else> -->
          <template v-else-if="currentRow.__key === undefined">
            <a-icon
              type="rest"
              theme="filled"
              @click="e => handleRowRemove(e, record)"
            />
          </template>
        </template>

        <template v-else> </template>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'OTable',
  components: {},
  mixins: [],
  props: {
    columns: { type: Array, default: () => [] },
    dataSource: { type: Array, default: () => [] },
    rowKey: { type: String, default: undefined },
    rowEditable: { type: Boolean, default: false },

    editable: { type: Boolean, default: false },

    // 父组件 已经编辑过当前行
    changed: { type: Boolean, default: false }
  },
  data() {
    return {
      // 已编辑后, 切换行
      clickedRow: undefined,
      popconfirmVisible: false,

      currentRow: {}
    }
  },
  computed: {
    changed2: {
      get() {
        return this.changed
      },
      set(val) {
        this.$emit('update:changed', val)
      }
    },
    columns2() {
      const cols = this.columns.map(col => {
        return {
          ...col,
          dataIndex: col.key,
          scopedSlots: { customRender: col.key }
        }
      })

      const cols2 = this.rowEditable
        ? [{ scopedSlots: { customRender: 'action' } }, ...cols]
        : cols

      const cols3 = [
        // { key: '__key', title: 'Key', dataIndex: '__key' },
        // { key: 'id', title: 'ID', dataIndex: 'id' },
        ...cols2
      ]

      return cols3
    },

    dataSource2() {
      return this.dataSource.map(item => {
        const rowKeyVal = item[this.rowKey]
        const val = rowKeyVal || 'undefined'
        return { ...item, __key: val }
      })
    }
  },
  async created() {},

  methods: {
    // setChanged() {
    //   // console.log('setChanged')
    //   this.changed2 = true
    // },

    setCurrentRow(rec) {
      // console.log('setCurrentRow', rec, this.dataSource2)
      this.currentRow = { ...rec, __key: rec.id || 'undefined' }
    },

    handleRowRollbackThenChange() {
      // console.log('handleRowRollbackThenChange')
      const record = this.clickedRow
      this.clickedRow = undefined
      this.handleOnRowChange(record)
    },

    async handleRowRollback(e) {
      // console.log('handleRowRollback')
      e.preventDefault()
      e.stopPropagation()

      const done = () => {
        this.changed2 = false
        this.currentRow = {}
      }

      this.$emit('on-row-rollback', { done })
    },

    async handleRowRemove(e, record) {
      // console.log('handleRowRemove', record)

      e.preventDefault()
      e.stopPropagation()

      const done = () => {
        this.changed2 = false
        const cur = this.currentRow
        if (cur.__key === record.__key) {
          this.currentRow = {}
        }
      }

      const rec = { ...record }
      delete rec.__key

      this.$emit('on-row-remove', { record: rec, done })
    },

    async handleRowCommit(e) {
      // console.log('handleRowCommit')

      e.preventDefault()
      e.stopPropagation()

      const done = () => {
        this.changed2 = false
        this.currentRow = {}
      }
      this.$emit('on-row-commit', { done })
    },

    async handleOnRowChange(record) {
      // console.log('handleOnRowChange')

      if (this.editable && this.rowEditable) {
        this.currentRow = record
      }
      const rec = { ...record }
      delete rec.__key
      this.changed2 = false
      this.$emit('on-row-change', rec)
    },

    handleOnRowClick(record) {
      console.log('handleOnRowClick, 1st ')

      if (!Object.keys(this.currentRow).length) {
        // console.log('handleOnRowClick 1st click')
        this.handleOnRowChange(record)
      } else {
        if (this.currentRow.__key !== record.__key) {
          if (this.changed2) {
            console.log('handleOnRowClick, need save')
            this.clickedRow = record
            this.popconfirmVisible = true
          } else {
            // console.log('handleOnRowClick, change row')
            this.handleOnRowChange(record)
          }
        } else {
          // console.log('handleOnRowClick, same row')
        }
      }
    },

    tableCustomRow(record, index) {
      // console.log(record, ppp)
      const that = this
      return {
        on: {
          // eslint-disable-next-line no-unused-vars
          click: event => {
            that.handleOnRowClick(record, index)
          }
        }
      }
    }
  }
}
</script>

<style type="text/css"></style>
