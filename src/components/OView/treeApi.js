import { watch, computed, reactive } from 'vue'
import api from '@/odoorpc'

import { useTreeColumns } from '@/components/tools/treeColumns'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

// treeview.export_xlsx_all

export function useTreeView(props) {
  // props 里的东西不能随便 解构
  // 需定义 计算变量 获取到 props 中的值
  // 然后再使用
  //
  // 1. watch props.actionId be set
  // 2. async load treeview by actionId
  // 3. get fields from treeview
  // 4. compute columns from fields
  // 5. async load data
  // 6. get records from data
  // 7. columns and records for tree view

  const localState = {
    treeview: null
  }

  const state = reactive({
    treeviewReady: false,
    fields: {},

    pagination: {
      // current
      // position: 'top'
      // total: 0,
      // pageSize: PageSize
      // pageSizeOptions: ['10', '20', '30', '40']
    },
    searchItems: {},
    searchValues: {},
    records: []
  })

  const buttons = computed(() => {
    // console.log(state.treeviewReady)
    //
    if (state.treeviewReady && localState.treeview) {
      return localState.treeview.buttons
    } else {
      return {}
    }
  })

  const { computedColumns } = useTreeColumns()
  const columns = computed(() => computedColumns(state.fields))
  const records = computed(() => state.records)
  const pagination = computed(() => state.pagination)
  const searchValues = computed(() => state.searchValues)
  const searchItems = computed(() => state.searchItems)

  watch(
    () => props.actionId,
    async newVal => {
      state.treeviewReady = false
      localState.treeview = null

      const treeview = api.env.treeview(newVal)
      // await sleep(1000)
      localState.treeview = treeview
      state.treeviewReady = true
      // await sleep(1000)
      state.fields = await treeview.load_fields()
      await treeview.searchview.load_search()
      state.searchItems = { ...treeview.search_items }
      state.searchValues = { ...treeview.search_values }
      // await sleep(1000)
      await loadData(treeview)

      console.log(state.searchValues)
    },
    { immediate: true }
  )

  async function loadData(treeview) {
    const records = await treeview.search_read()
    state.pagination = { ...treeview.pagination }
    state.records = records
    const relationData = await treeview.relation_read(records)
    state.records = relationData
  }

  async function onTableChange(pagination) {
    if (localState.treeview) {
      localState.treeview.pagination = pagination
      await loadData(localState.treeview)
    }
  }

  async function onSearchChange(item, value) {
    if (localState.treeview) {
      const searchValues = localState.treeview.search_change(item, value)
      // console.log(searchValues)
      state.searchValues = searchValues
      state.pagination = {
        ...localState.treeview.pagination,
        current: 1,
        total: 0
      }

      await loadData(localState.treeview)
    }
  }

  return {
    records,
    columns,
    buttons,
    pagination,
    searchValues,
    searchItems,
    onTableChange,
    onSearchChange
  }
}

// hasActive() {
//   // 判断 存档和取消存档 菜单是否显示
//   const active = this.fields.active
//   return active ? true : false
// }

// handleOnExportAll() {
//   this.treeview.export_xlsx_all()
// },

// handleOnRowSelect(activeIds) {
//   this.activeIds = activeIds
// },

// async unlink() {
//   const ids = this.activeIds
//   // console.log(' handleUnlink ', ids)
//   await this.treeview.unlink(ids)
//   this.activeIds = []

//   return true
// },

// async handleOnUnarchive() {
//   const ids = this.activeIds
//   await this.treeview.unarchive(ids)
//   this.activeIds = []
//   this.fresh_data()
// },

// async handleOnArchive() {
//   const ids = this.activeIds
//   await this.treeview.archive(ids)
//   this.activeIds = []
//   this.fresh_data()
// }
