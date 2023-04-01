import { watch, computed, reactive, ref, toRaw } from 'vue'
import api from '@/odoorpc'

import { useL10n } from '@/components/tools/useL10n'

export function useTreeView(props) {
  const { tr } = useL10n()

  const localState = {
    treeview: null
  }

  const state = reactive({
    treeviewReady: false,
    treeviewFieldsReady: false,
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

  function fields2cols(fields) {
    const cols = Object.keys(fields).map(fld => {
      const meta = fields[fld] || {}
      return {
        dataIndex: fld,
        key: fld,
        title: tr(meta.string),
        // ellipsis: 'ellipsis' in meta ? meta.ellipsis : true,
        // align: 'center',
        width: meta.web_col_width,
        _widget: meta.widget,
        _meta: meta
      }
    })

    return cols
  }

  const columns = computed(() => {
    if (state.treeviewFieldsReady && localState.treeview) {
      const flds = localState.treeview.get_columns()
      const cols91 = fields2cols(flds)
      const cols92 = cols91.filter(item => item._widget !== 'handle')
      return cols92
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
  }
  async function loadData(treeview) {
    const records = await treeview.search_read()
    state.pagination = { ...treeview.pagination }
    state.records = records
  }

  // watch actionId
  watch(
    () => props.actionId,
    async newVal => {
      state.treeviewFieldsReady = false
      state.treeviewReady = false
      localState.treeview = null
      activeIds.value = []

      const treeview = api.env.treeview(newVal)
      // await sleep(1000)
      localState.treeview = treeview
      state.treeviewReady = true
      // await sleep(1000)
      state.fields = await treeview.load_fields()

      state.treeviewFieldsReady = true
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
