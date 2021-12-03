<template>
  <div>
    <!-- // 
    <h1>{{ actionName }}</h1>
    {{ viewType }} -->
    <!-- labelAlign="left"
      :colon="false" -->

    <!--control panel -->

    <template v-if="actionTarget === 'inline'">
      <FormConfig
        debugName="FormConfig"
        :initReady="initReady"
        :modelGet="modelGet"
        @on-reload="handleReload"
      />
    </template>

    <template v-else-if="actionType === 'ir.actions.client'">
      {{ action.action_name }} 建设中...
    </template>

    <template v-else-if="actionType === 'ir.actions.act_window'">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        @back="$router.go(-1)"
      >
        <template slot="title"> {{ actionName }} </template>
        <template slot="subTitle">
          <template v-if="viewType === 'calendar'">
            ({{ calendarData.title }} )
          </template>
        </template>

        <template slot="extra">
          <template v-if="viewType !== 'form'">
            <SearchViewBox
              debugName="SearchViewBox"
              :initReady="initReady"
              :modelGet="modelGet"
              :searchChange="searchChange"
              @on-event="handleToolbarEvent"
            />
          </template>
        </template>

        <a-row>
          <a-col :span="12">
            <template v-if="['kanban', 'list', 'form'].includes(viewType)">
              <ToolbarBtn
                :initReady="initReady"
                :modelGet="modelGet"
                :editable="editable"
                :viewType="viewType"
                :activeIds="activeIds"
                :hideButton="hideButton"
                @on-event="handleToolbarEvent"
              />
            </template>
            <template v-else-if="['pivot', 'graph'].includes(viewType)">
              <PivotViewToolbar
                debugName="PivotViewToolbar"
                :viewType="viewType"
                :pivotData.sync="pivotData"
                :initReady="initReady"
                :modelGet="modelGet"
              />
            </template>

            <template v-else-if="['calendar'].includes(viewType)">
              <CalendarToolbar
                debugName="CalendarToolbar"
                @on-event="handleToolbarEvent"
              />
            </template>
          </a-col>
          <a-col :span="1"> </a-col>
          <a-col :span="11">
            <SearchViewBtn
              style="float: left"
              v-if="viewType !== 'form'"
              debugName="SearchViewBtn"
              :searchChange="searchChange"
              :initReady="initReady"
              :modelGet="modelGet"
              @on-event="handleToolbarEvent"
            />
            <ToolbarViewmode
              style="float: right"
              v-model="viewType"
              :viewMode="viewMode"
              :modelGet="modelGet"
            />
          </a-col>
        </a-row>
      </a-page-header>
      <a-divider type="vertical" />
      <div>
        <template v-if="viewType === 'list'">
          <TreeView
            ref="listView"
            debugName="TreeView"
            :initReady="initReady"
            :modelGet="modelGet"
            :searchChange="searchChange"
            @on-row-select="handleOnRowSelect"
            @on-action-return="handleOnActionReturn"
          />
        </template>

        <template v-else-if="viewType === 'kanban'">
          <KanbanView
            debugName="kanban"
            :initReady="initReady"
            :modelGet="modelGet"
            :searchChange="searchChange"
          />
        </template>

        <template v-else-if="viewType === 'form'">
          <FormView
            ref="formView"
            debugName="form"
            :initReady="initReady"
            :modelGet="modelGet"
            :editable.sync="editable"
            @on-action-return="handleOnActionReturn"
          />
        </template>

        <template v-else-if="viewType === 'calendar'">
          <!-- ok {{ viewType }} -->
          <CalendarView
            debugName="calendar"
            :initReady="initReady"
            :modelGet="modelGet"
            :calendarData="calendarData"
            :searchChange="searchChange"
          />
        </template>

        <template v-else-if="viewType === 'pivot'">
          <PivotView
            debugName="pivot"
            :toolbar="false"
            :initReady="initReady"
            :modelGet="modelGet"
            :pivotData.sync="pivotData"
          />
        </template>

        <template v-else-if="viewType === 'graph'">
          <GraphView
            debugName="graph"
            :toolbar="false"
            :initReady="initReady"
            :modelGet="modelGet"
            :pivotData.sync="pivotData"
          />
        </template>

        <template v-else> {{ viewType }}</template>
      </div>

      <WizardForm :visible="showWizard" :modelGet="wizardModelGet" />
    </template>
  </div>
</template>

<script>
import webMixin from '@/mixins/webMixin'

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

import WizardForm from '@/components/OView/WizardForm.vue'
import FormConfig from '@/components/OView/FormConfig.vue'

// import { sleep } from '@/odoorpc/utils'

export default {
  name: 'Web',
  components: {
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
    WizardForm,
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
      handler: function(/*val*/) {
        console.log('in watch, $route.fullPath')
        console.log('watch fullPath')
        this.init()
      },
      deep: true
    }
  },

  async created() {
    // console.log('web create')
    this.init()
  },

  mounted() {
    // console.log('web mounted')
  },

  methods: {}
}
</script>

<style type="text/css"></style>
