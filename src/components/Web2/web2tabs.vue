<template>
  <div>
    <a-tabs v-model="activeKey" type="editable-card" hide-add @edit="onEdit">
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :closable="pane.closable"
      >
        <!-- :tab="pane.title" -->
        <template #tab>
          <span style="word-break: break-all; word-wrap: break-word">
            {{ pane.title }}
          </span>
        </template>
        <template v-if="pane.key === 'home'">
          <Web2Home
            :webName="pane.name"
            @on-event="(...args) => handleOnEvent(pane, ...args)"
          />
        </template>
        <template v-else>
          <Web2View
            :editable.sync="pane.editable"
            :defaultSearchValue="pane.defaultSearchValue"
            :searchValue.sync="pane.searchValue"
            :query="pane.query"
            :viewInfo="pane.viewInfo"
            @on-event="(...args) => handleOnEvent(pane, ...args)"
          />
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Web2Home from './Web2Home.js'
import Web2View from './Web2View.vue'

import { menus as localMenus } from '@/layout/menu'

const mods = localMenus.reduce((acc, menu) => {
  acc[menu.name] = menu
  return acc
}, {})

// const mods = {
//   sale: { name: 'sale', title: '销售' },
//   purchase: { name: 'purchase', title: '采购' }
// }

export default {
  name: 'web2tabs',
  components: { Web2Home, Web2View },
  mixins: [],

  data() {
    const panes2 = [
      // { title: 'Tab 1', content: 'Content of Tab 1', key: '1' }
      // { title: 'Tab 2', content: 'Content of Tab 2', key: '2' }
    ]
    return {
      activeKey: 'home',
      panes2,
      newTabIndex: 0,

      editable: false
    }
  },

  computed: {
    mod() {
      const { params = {} } = this.$route
      const { mod } = params
      return mod
    },
    home_pane() {
      const mod = this.mod

      return { ...mods[mod], key: 'home', closable: false }
    },

    panes: {
      get() {
        return [this.home_pane, ...this.panes2]
      },
      set(val) {
        // console.log(val)
        const val2 = val.filter(item => item.key !== 'home')
        this.panes2 = val2
      }
    }
  },

  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function (/*val*/) {
        this.init()
      },
      deep: true
    }
  },

  async created() {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      console.log(this.$route)
      this.panes2 = []
      this.activeKey = 'home'
    },

    handleOnEvent(pane, event_name, ...args) {
      console.log('node,handleOnEvent,  ', pane, event_name, ...args)

      if (event_name === 'on-router') this.handleOnRouter(pane, ...args)
      else if (event_name === 'on-router-replace')
        this.handleOnRouterReplace(pane, ...args)
      else if (event_name === 'on-update-title')
        this.handleOnUpdateTitle(pane, ...args)
      // else if (event_name === 'on-write') this.handleOnwrite(...args)
      // else if (event_name === 'on-write-ok')
      //   this.$emit('on-event', event_name, ...args)
      // else if (event_name === 'action-return')
      //   this.$emit('on-event', event_name, ...args)
    },

    handleOnUpdateTitle(pane, name) {
      pane.title = name
    },

    async handleOnRouterReplace(pane, kwargs, done) {
      const pane_new = await this._handleOnRouter(kwargs)

      pane.title = pane_new.title
      pane.content = pane_new.content
      pane.query = pane_new.query
      pane.editable = pane_new.editable
      pane.title = pane_new.title

      if (done) done()

      // title: breadcrumbName,
      // content: breadcrumbName,
      // query,
      // editable,
      // // viewType: 'tree',
      // viewInfo: info,
      // key: activeKey
    },

    async handleOnRouter(pane, kwargs) {
      const pane_new = await this._handleOnRouter(kwargs)
      const activeKey = pane_new.key
      const panes = this.panes
      panes.push(pane_new)
      this.panes = panes
      this.activeKey = activeKey
    },

    _handleOnRouter(kwargs) {
      //  query: { action: actionId },
      //     breadcrumbName: action.display_name || action.name,
      //     action,
      //     context,
      //     views

      const { query, breadcrumbName, defaultSearchValue, ...info } = kwargs

      const resId = query.id ? parseInt(query.id) : undefined
      const editable = !resId ? true : false

      // 如果是  copy , 如何传递参数 editable

      console.log('handleOnRouter,  ', kwargs)
      // const { action } = info

      const activeKey = `newTab${this.newTabIndex++}`
      const pane_new = {
        title: breadcrumbName,
        content: breadcrumbName,
        query,
        editable,
        // viewType: 'tree',
        viewInfo: info,
        defaultSearchValue,
        searchValue: { ...defaultSearchValue },
        key: activeKey
      }

      return pane_new
    },

    callback(key) {
      console.log(key)
    },
    onEdit(targetKey, action) {
      console.log('onEdit, ', targetKey, action)
      this[action](targetKey)
    },

    add() {
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({
        title: 'New Tab',
        content: 'Content of new Tab',
        key: activeKey
      })
      this.panes = panes
      this.activeKey = activeKey
    },

    remove(targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    }
  }
}
</script>

<style type="text/css"></style>
