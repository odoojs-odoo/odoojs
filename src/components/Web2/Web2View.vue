<template>
  <div>
    <!-- web2view -->

    <a-page-header style="border: 1px solid rgb(235, 237, 240)">
      <template slot="extra">
        <template v-if="viewType !== 'form'">
          <SearchViewBox
            v-model="searchValue2"
            :defaultValue="defaultSearchValue"
            :searchValue.sync="searchValue_edit"
            :viewInfo="viewInfo"
            @on-event="handleToolbarEvent"
          />
        </template>
      </template>

      <a-row>
        <a-col :span="12">
          <template v-if="['kanban', 'list', 'form'].includes(viewType)">
            <!-- ToolbarBtn -->
            <ToolbarBtn
              :editable.sync="editable2"
              :viewInfo="viewInfo"
              :viewType="viewType"
              :activeIds="activeIds"
              @on-event="handleToolbarEvent"
            />
          </template>
          <template v-else-if="['pivot', 'graph'].includes(viewType)">
            <PivotViewToolbar
              :viewType="viewType"
              :pivotData.sync="pivotData"
              :viewInfo="viewInfo"
              @on-event="handleToolbarEvent"
            />
          </template>
          <template v-else-if="['calendar'].includes(viewType)">
            <CalendarToolbar
              v-model="calendarData"
              @on-event="handleToolbarEvent"
            />
          </template>
        </a-col>
        <a-col :span="1"> </a-col>
        <a-col :span="11">
          <!-- SearchViewBtn -->
          <SearchViewBtn
            style="float: left"
            v-if="viewType !== 'form'"
            v-model="searchValue2"
            :viewType2="viewType"
            :defaultValue="defaultSearchValue"
            :searchValue.sync="searchValue_edit"
            :viewInfo="viewInfo"
            @on-event="handleToolbarEvent"
          />

          <ToolbarViewmode
            style="float: right"
            v-model="viewType"
            :viewMode="viewMode"
            :viewInfo="viewInfo"
            @on-event="handleToolbarEvent"
          />
        </a-col>
      </a-row>
    </a-page-header>
    <template v-if="viewType === 'form'">
      <!-- form
      {{ query }} -->

      <FormView
        ref="formView"
        :editable.sync="editable2"
        :query="query"
        :viewInfo="viewInfo"
        @on-event="handleOnEvent"
      />
    </template>

    <template v-else-if="viewType === 'list'">
      <TreeView
        ref="listView"
        :searchValue="searchValue"
        :viewInfo="viewInfo"
        @on-row-select="handleOnRowSelect"
        @on-event="handleOnEvent"
      />
    </template>

    <template v-else-if="viewType === 'kanban'">
      <!-- kanban -->

      <KanbanView
        ref="kanbanView"
        :searchValue="searchValue"
        :viewInfo="viewInfo"
        @on-event="handleOnEvent"
      />
    </template>

    <template v-else-if="viewType === 'calendar'">
      <!-- ok {{ viewType }} -->
      <CalendarView
        ref="calendarView"
        :calendarData.sync="calendarData"
        :viewInfo="viewInfo"
      />
    </template>

    <template v-else-if="viewType === 'pivot'">
      <!-- pivot -->
      <PivotView
        ref="pivotView"
        :searchValue="searchValue"
        :viewInfo="viewInfo"
        :pivotData.sync="pivotData"
        :toolbar="false"
      />
    </template>

    <template v-else-if="viewType === 'graph'">
      <!-- graph -->
      <GraphView
        ref="graphView"
        :searchValue="searchValue"
        :viewInfo="viewInfo"
        :pivotData.sync="pivotData"
        :toolbar="false"
      />
    </template>

    <template v-else> todo {{ viewType }} </template>
  </div>
</template>

<script>
import api from '@/odooapi'

import ToolbarBtn from '@/components/OView/Toolbar/ToolbarBtn.vue'
import ToolbarViewmode from '@/components/OView/Toolbar/ToolbarViewmode.vue'
import SearchViewBtn from '@/components/OView/SearchViewBtn.vue'
import SearchViewBox from '@/components/OView/SearchViewBox.vue'
import PivotViewToolbar from '@/components/OView/PivotViewToolbar.vue'

import CalendarToolbar from '@/components/OCalendar/CalendarToolbar.vue'

import TreeView from '@/components/OView/TreeView.vue'
import FormView from '@/components/OView/FormView.vue'
import KanbanView from '@/components/OView/KanbanView.vue'
import CalendarView from '@/components/OView/CalendarView.vue'
import PivotView from '@/components/OView/PivotView.vue'
import GraphView from '@/components/OView/GraphView.vue'

export default {
  name: 'web2view',

  components: {
    ToolbarBtn,
    ToolbarViewmode,
    SearchViewBtn,
    SearchViewBox,
    PivotViewToolbar,
    CalendarToolbar,
    TreeView,
    FormView,
    KanbanView,
    CalendarView,
    PivotView,
    GraphView
  },

  mixins: [],

  props: {
    editable: { type: Boolean, default: false },

    defaultSearchValue: {
      type: Object,
      default: () => {
        return {}
      }
    },
    searchValue: {
      type: Object,
      default: () => {
        return {}
      }
    },

    query: { type: Object, default: () => undefined },

    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      view_type: undefined,
      searchValue2: undefined, // searchBox 和 searchBtn 通讯

      activeIds: [], // listview 通知 toolbar.

      calendarData: undefined, // calendar toolbar  和  calendarview 通讯
      pivotData: {} // pivot toolbar  和  pivot view 通讯
    }
  },
  computed: {
    editable2: {
      get() {
        return this.editable
      },
      set(val) {
        this.$emit('update:editable', val)
      }
    },

    searchValue_edit: {
      get() {
        return this.searchValue
      },
      set(val) {
        this.$emit('update:searchValue', val)
      }
    },

    viewMode() {
      const query = this.query || {}
      if (query.view_type === 'form') return []

      const view_mode = api.Action.view_mode(this.viewInfo)
      return view_mode.filter(
        mode => !['search', 'form', 'gantt', 'qweb', 'activity'].includes(mode)
      )
    },

    viewType: {
      get() {
        const query = this.query || {}
        if (query.view_type) return query.view_type

        if (this.view_type) return this.view_type

        const viewType2 = this.viewMode[0]
        return viewType2
      },

      set(val) {
        this.view_type = val
      }
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {
    handleOnRowSelect(activeIds) {
      this.activeIds = activeIds
    },

    handleToolbarEvent(event_name, ...args) {
      console.log('xxxx, handleToolbarEvent,  ', event_name, ...args)
      // 搜索条件 改变, 通知 listview 刷新数据
      if (event_name === 'on-search-change') this.handleOnSearchChange(...args)
      // 创建按钮, 跳转到 formview,
      else if (event_name === 'on-new') this.handleOnCreate(...args)
      // 通知, listview,
      else if (event_name === 'on-list-event') this.handleListEvent(...args)
      // 通知, formview,
      else if (event_name === 'on-form-event') this.handleFormEvent(...args)
    },

    handleOnSearchChange(value) {
      // console.log(' handleOnSearchChange ', value, cp(this.searchValue))
      this.searchValue = value
      const viewref = `${this.viewType}View`
      console.log('viewref', viewref)
      this.$refs[viewref].handleOnEvent('on-search-change', value)
    },

    async handleOnCreate() {
      // const { query: query_old } = this.$route
      const query_old = this.query || {}
      const { active_id } = query_old
      const active_query = active_id ? { active_id } : {}

      const { action, context, views } = this.viewInfo
      const query = { action: action.id, view_type: 'form', ...active_query }

      // this.editable = true

      this.$emit('on-event', 'on-router', {
        query,
        breadcrumbName: '',
        action,
        context,
        views
      })
    },

    handleFormEvent(event_name, ...args) {
      this.$refs.formView.handleOnEvent(event_name, ...args)
    },

    handleListEvent(event_name, ...args) {
      this.$refs.listView.handleOnEvent(event_name, ...args)
    },

    handleOnEvent(event_name, ...args) {
      console.log('xxxx, handleOnEvent,  ', event_name, ...args)

      if (event_name === 'on-router') this.handleOnRouter(...args)
      else if (event_name === 'on-router-replace')
        this.handleOnRouterReplace(...args)
      else if (event_name === 'on-update-title')
        this.$emit('on-event', event_name, ...args)

      // else if (event_name === 'on-write') this.handleOnwrite(...args)
      // else if (event_name === 'on-write-ok')
      //   this.$emit('on-event', event_name, ...args)
      // else if (event_name === 'action-return')
      //   this.$emit('on-event', event_name, ...args)
    },

    async handleOnRouterReplace(kwargs) {
      const kw = await this._handleOnRouter(kwargs)
      this.$emit('on-event', 'on-router-replace', kw, () => {
        console.log('cb')
        new Promise(resolve => {
          setTimeout(() => {
            this.$refs.formView.load_data()
            resolve()
          }, 200)
        })
      })
    },
    async handleOnRouter(kwargs) {
      const kw = await this._handleOnRouter(kwargs)
      this.$emit('on-event', 'on-router', kw)
    },

    async _handleOnRouter(kwargs) {
      const { query, breadcrumbName, ...info } = kwargs
      const { action, context } = info
      console.log('xxxx,, handleOnRouter,  ', kwargs)

      // 检查 action / context / views ok
      const views_get = async () => {
        const { views: views_in } = info
        if (views_in) return views_in
        const views_new = await api.Action.load_views({ context, action })
        return views_new
      }
      const views = await views_get()

      const kw = {
        query,
        breadcrumbName: breadcrumbName || action.display_name || action.name,
        ...info,
        views
      }
      return kw
    }
  }
}
</script>

<style type="text/css"></style>
