<template>
  <a-table
    :key="keyIndex"
    bordered
    :columns="myColumns"
    :data-source="dataSource"
    :row-key="rowKey"
    :custom-row="customRow"
    :row-selection="rowSelection"
    :pagination="pagination"
    :scroll="scroll"
    :components="tableComponents"
    @change="handleTableChange"
  >
  </a-table>
</template>

<script>
import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

export default {
  name: 'ACTable',
  components: {},
  mixins: [],

  props: {
    columns: { type: Array, default: () => [] }, //  columns default
    dataSource: { type: Array, default: () => [] },
    pagination: { type: Object, default: undefined },
    rowKey: { type: [String, Function], default: undefined },
    rowSelection: { type: Object, default: undefined },
    scroll: { type: Object, default: undefined },
    customRow: { type: Function, default: undefined }
  },

  data() {
    return {
      keyIndex: 1,
      myColumns: [],
      tableComponents: {}
    }
  },
  computed: {},

  watch: {
    // 菜单切换时, 触发
    columns: {
      handler: function (newVal, oldVal) {
        console.log('in watch, columns', newVal, oldVal)
        this.onWatchColumns(newVal)
      },
      deep: true
    }
  },

  async created() {},

  async mounted() {
    this.onWatchColumns(this.columns)
  },

  methods: {
    handleTableChange(...args) {
      this.$emit('change', ...args)
    },

    onWatchColumns(cols) {
      this.myColumns = cols.reduce((acc, col) => {
        acc.push({ ...col })
        //  托拉拽 xxxxxx
        return acc
      }, [])

      this.getTitle(this.myColumns)

      this.keyIndex = this.keyIndex + 1
    },

    getTitle(columns) {
      const draggingMap = {}
      columns.forEach(col => {
        draggingMap[col.key] = col.width //添加键值对，有key的才添加
      })
      const resizeableTitle = (h, props, children) => {
        let thDom = null
        const { key, ...restProps } = props
        const col = columns.find(col => {
          const k = col.dataIndex || col.key
          return k === key
        })
        if (!col.width) {
          return <th {...restProps}>{children}--</th>
        }
        const onDrag = x => {
          draggingMap[key] = 0
          col.width = Math.max(x, 1)
        }
        const onDragstop = () => {
          draggingMap[key] = thDom.getBoundingClientRect().width
        }

        return (
          <th
            {...restProps}
            v-ant-ref={r => (thDom = r)}
            width={col.width}
            class="resize-table-th"
          >
            {children}
            <vue-draggable-resizable
              key={col.key}
              class="table-draggable-handle"
              w={10}
              x={col.width}
              z={1}
              axis="x"
              draggable={true}
              resizable={false}
              onDragging={onDrag}
              onDragstop={onDragstop}
            />
          </th>
        )
      }
      this.tableComponents = {
        header: {
          cell: resizeableTitle
        }
      }
    }
  }
}
</script>

<style type="text/css">
.resize-table-th {
  position: relative;
}
.resize-table-th .table-draggable-handle {
  height: 100% !important;
  bottom: 0;
  /* left: auto !important; */
  /* right: -5px; */
  left: 0;
  cursor: col-resize;
  /* touch-action: none; */
  position: absolute;
  background-color: pink;
}
</style>
