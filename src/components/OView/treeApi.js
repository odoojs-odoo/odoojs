import { watch, computed, reactive, ref, toRaw } from 'vue'
import api from '@/odoorpc'

import { useTreeColumns } from '@/components/tools/treeColumns'

import { useL10n } from '@/components/tools/useL10n'

// function sleep(millisecond) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, millisecond)
//   })
// }

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

  const { tr } = useL10n()

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

  const activeIds = ref([])

  const buttons = computed(() => {
    // console.log(state.treeviewReady)
    //
    if (state.treeviewReady && localState.treeview) {
      return localState.treeview.buttons
    } else {
      return {}
    }
  })

  const hasActive = computed(() => {
    // 判断 存档和取消存档 菜单是否显示
    const active = state.fields.active
    return active ? true : false
  })

  const { computedColumns } = useTreeColumns()

  const columns = computed(() => {
    function fields_filter(treeview, fields) {
      return Object.keys(fields).reduce((acc, fld) => {
        const meta = fields[fld]
        const inv = treeview.check_invisible(meta)

        if (!inv) {
          acc[fld] = meta
        }
        return acc
      }, {})
    }

    if (state.treeviewReady && localState.treeview) {
      const fields = toRaw(state.fields)
      const fields2 = fields_filter(localState.treeview, fields)
      const context = localState.treeview.context
      const cols = computedColumns(fields2, context)
      const cols2 = cols.filter(item => item._widget !== 'handle')
      return cols2
    } else {
      return []
    }
  })

  const records = computed(() => state.records)
  const pagination = computed(() => state.pagination)
  const searchValues = computed(() => state.searchValues)
  const searchItems = computed(() => state.searchItems)

  async function loadDataByIds() {
    const treeview = localState.treeview
    const ids = state.records.map(item => item.id)
    const records = await treeview.read(ids)
    state.records = records
    const withRelationData = await treeview.relation_read(records)
    state.records = withRelationData
  }
  async function loadData(treeview) {
    const records = await treeview.search_read()
    state.pagination = { ...treeview.pagination }
    state.records = records
    const withRelationData = await treeview.relation_read(records)
    state.records = withRelationData
  }

  // watch actionId
  watch(
    () => props.actionId,
    async newVal => {
      state.treeviewReady = false
      localState.treeview = null
      activeIds.value = []

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

      // console.log(state.searchValues)
    },
    { immediate: true }
  )

  async function onTableChange(pagination) {
    if (localState.treeview) {
      localState.treeview.pagination = pagination
      await loadData(localState.treeview)
    }
  }

  async function onSearchChange(item, value) {
    if (localState.treeview) {
      const searchValues = localState.treeview.search_change(item, value)
      state.searchValues = searchValues
      state.pagination = {
        ...localState.treeview.pagination,
        current: 1,
        total: 0
      }

      await loadData(localState.treeview)
    }
  }

  function onExportAll() {
    if (localState.treeview) {
      localState.treeview.export_xlsx_all(tr)
    }
  }

  async function onUnarchive() {
    if (!localState.treeview) return
    const ids = activeIds.value
    console.log(ids, ids.length)
    await localState.treeview.unarchive(ids)
    activeIds.value = []
    loadDataByIds()
  }

  async function onArchive() {
    if (!localState.treeview) return
    const ids = activeIds.value

    await localState.treeview.archive(ids)
    activeIds.value = []
    loadDataByIds()
  }

  async function onClickDel() {
    if (!localState.treeview) return
    const ids = activeIds.value
    //   // console.log(' handleUnlink ', ids)
    await localState.treeview.unlink(ids)
    activeIds.value = []
    loadData(localState.treeview)
  }

  const onSelectChange = keys => {
    console.log('selectedRowKeys changed: ', keys)
    activeIds.value = keys
  }

  function onClickCRUD(btn) {
    const btn_fns = {
      unlink: onClickDel,
      archive: onArchive,
      unarchive: onUnarchive
    }
    console.log([btn, btn_fns[btn]])
    btn_fns[btn]()
  }

  return {
    records,
    columns,
    buttons,
    hasActive,
    pagination,
    searchValues,
    searchItems,
    onTableChange,
    activeIds,
    onSearchChange,
    onExportAll,
    onSelectChange,
    onClickCRUD
  }
}
