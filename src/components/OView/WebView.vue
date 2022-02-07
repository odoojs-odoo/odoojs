<template>
  <div>
    <!--control panel -->

    <template v-if="actionInfo.target === 'inline'">
      <!-- @on-reload="handleReload" -->
      <FormConfig :viewInfo="viewInfo" />
    </template>

    <template v-else-if="actionInfo.type === 'ir.actions.client2'">
      <!-- client2 -->
      <Client :viewInfo="viewInfo" />
    </template>

    <template v-else-if="actionInfo.type === 'ir.actions.client'">
      {{ pageHeaderTitle }} 建设中...
    </template>

    <template v-else-if="actionInfo.type === 'ir.actions.act_window'">
      <a-page-header style="border: 1px solid rgb(235, 237, 240)">
        <template slot="title">
          <template v-if="routes.length">
            <template
              v-for="(route, index) in routes.slice(0, routes.length - 1)"
            >
              <a
                href="javascript:;"
                @click="onClickBreadcrumb(route)"
                :key="index"
              >
                {{ route.breadcrumbName }}
              </a>

              <span :key="index + 'span'"> / </span>
            </template>

            <span> {{ routes[routes.length - 1].breadcrumbName }} </span>
          </template>
        </template>
        <template slot="subTitle">
          {{
            viewType === 'calendar' && calendarData ? calendarData.title : ''
          }}
        </template>

        <template slot="extra">
          <template v-if="viewType !== 'form'">
            <SearchViewBox
              v-model="searchValue2"
              :defaultValue="defaultSearchValue"
              :searchValue.sync="searchValue"
              :viewInfo="viewInfo"
              @on-event="handleToolbarEvent"
            />
          </template>
        </template>

        <a-row>
          <a-col :span="12">
            <template v-if="['kanban', 'list', 'form'].includes(viewType)">
              <ToolbarBtn
                :editable.sync="editable"
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
            <SearchViewBtn
              style="float: left"
              v-if="viewType !== 'form'"
              v-model="searchValue2"
              :viewType2="viewType"
              :defaultValue="defaultSearchValue"
              :searchValue.sync="searchValue"
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

      <div>
        <template v-if="viewType === 'list'">
          <TreeView
            ref="listView"
            :searchValue="searchValue"
            :viewInfo="viewInfo"
            @on-row-select="handleOnRowSelect"
          />
        </template>

        <template v-else-if="viewType === 'kanban'">
          <!-- kanban -->

          <KanbanView
            ref="kanbanView"
            :searchValue="searchValue"
            :viewInfo="viewInfo"
          />
        </template>

        <template v-else-if="viewType === 'form'">
          <FormView
            ref="formView"
            :editable.sync="editable"
            :viewInfo="viewInfo"
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

        <template v-else> todo:{{ viewType }}</template>
      </div>
    </template>
  </div>
</template>

<script>
import webMixin from '@/mixins/webMixin'
import Client from '@/components/Client/Client.vue'

import ToolbarBtn from '@/components/OView/Toolbar/ToolbarBtn.vue'
import ToolbarViewmode from '@/components/OView/Toolbar/ToolbarViewmode.vue'
import SearchViewBtn from '@/components/OView/SearchViewBtn.vue'
import SearchViewBox from '@/components/OView/SearchViewBox.vue'
import PivotViewToolbar from '@/components/OView/PivotViewToolbar.vue'

import CalendarToolbar from '@/components/OCalendar/CalendarToolbar.vue'

import KanbanView from '@/components/OView/KanbanView.vue'
import TreeView from '@/components/OView/TreeView.vue'
import FormView from '@/components/OView/FormView.vue'
import CalendarView from '@/components/OView/CalendarView.vue'
import PivotView from '@/components/OView/PivotView.vue'
import GraphView from '@/components/OView/GraphView.vue'

import FormConfig from '@/components/OView/FormConfig.vue'

export default {
  name: 'WebView',
  components: {
    Client,
    SearchViewBox,
    ToolbarBtn,
    ToolbarViewmode,
    SearchViewBtn,
    CalendarToolbar,
    PivotViewToolbar,
    TreeView,
    KanbanView,
    FormView,
    CalendarView,
    PivotView,
    GraphView,

    FormConfig
  },
  mixins: [webMixin],

  data() {
    return {}
  },

  computed: {},

  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function (/*val*/) {
        // console.log('in watch, $route.fullPath')
        // console.log('watch fullPath')
        this.init()
      },
      deep: true
    }
  },

  async created() {
    this.init()
  },

  mounted() {},

  methods: {
    onClickBreadcrumb(route) {
      //   console.log('onClickBreadcrumb', route)
      const { path, query } = route
      this.$router.push({ path, query })
    }
  }
}
</script>

<style type="text/css"></style>
