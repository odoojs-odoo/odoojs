import { watch, computed, reactive, ref } from 'vue'
import api from '@/odoorpc'
import { useLang } from '@/components/useApi/useLang'

export function useTreeView(props) {
  const { lang } = useLang()

  const localState = {
    treeview: null
  }

  const state = reactive({
    treeviewReady: false,
    treeviewFieldsReady: false,

    lang_changed: 1,
    pagination_changed: 1,
    search_changed: 1,

    records: []
  })

  const activeIds = ref([])

  function check_lang() {
    return state.lang_changed
  }

  function view_get() {
    check_lang()
    return state.treeviewFieldsReady ? localState.treeview : undefined
  }

  function langChange(lg) {
    const view = view_get()
    if (!view) return false
    view.set_lang(lg)
    state.lang_changed += 1
    loadDataByIds()
  }

  watch(
    lang,
    // eslint-disable-next-line no-unused-vars
    async (newVal, oldVal) => {
      console.log(newVal, oldVal)
      langChange(newVal)
    },
    { immediate: true }
  )

  const viewActions = computed(() => {
    check_lang(lang.value)
    return api.global_config.view.actions
  })

  const buttons = computed(() => {
    const view = view_get()
    return view ? view.buttons : {}
  })

  const hasActive = computed(() => {
    // 判断 存档和取消存档 菜单是否显示
    const view = view_get()
    if (!view) return false
    const active = view.fields.active
    return active ? true : false
  })

  function fields2cols(fields) {
    const cols = Object.keys(fields).map(fld => {
      const meta = fields[fld] || {}
      return {
        dataIndex: fld,
        key: fld,
        title: meta.string,
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
    const view = view_get()
    if (!view) return []

    const flds = view.get_columns()
    const cols91 = fields2cols(flds)
    const cols92 = cols91.filter(item => item._widget !== 'handle')
    return cols92
  })

  const pagination = computed(() => {
    const view = view_get(state.pagination_changed)
    return view ? view.pagination : {}
  })
  const searchValues = computed(() => {
    const view = view_get(state.search_changed)
    return view ? view.search_values : {}
  })

  const searchItems = computed(() => {
    const view = view_get()
    return view ? view.search_items : {}
  })

  // load data

  async function loadDataByIds() {
    const view = view_get()
    if (!view) return

    const treeview = view
    const ids = state.records.map(item => item.id)
    const records = await treeview.read(ids)
    state.records = records
  }
  async function loadData(treeview) {
    const records = await treeview.search_read()
    state.pagination_changed += 1
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
      await treeview.load_fields()

      state.treeviewFieldsReady = true
      await treeview.searchview.load_search()
      // await sleep(1000)
      await loadData(treeview)
    },
    { immediate: true }
  )

  async function onTableChange(pagination) {
    const view = view_get()
    if (!view) return

    view.pagination = pagination
    await loadData(view)
  }

  async function onSearchChange(item, value) {
    const view = view_get()
    if (!view) return

    view.search_change(item, value)
    state.search_changed += 1
    await loadData(view)
  }

  function onExportAll() {
    const view = view_get()
    if (!view) return

    view.export_xlsx_all()
  }

  async function onUnarchive() {
    const view = view_get()
    if (!view) return

    const ids = activeIds.value
    // console.log(ids, ids.length)
    await view.unarchive(ids)
    activeIds.value = []
    loadDataByIds()
  }

  async function onArchive() {
    const view = view_get()
    if (!view) return

    const ids = activeIds.value

    await view.archive(ids)
    activeIds.value = []
    loadDataByIds()
  }

  async function onClickDel() {
    const view = view_get()
    if (!view) return

    const ids = activeIds.value
    //   // console.log(' handleUnlink ', ids)
    await view.unlink(ids)
    activeIds.value = []
    loadData(view)
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

  const records = computed(() => state.records)

  return {
    records,
    columns,
    viewActions,
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
