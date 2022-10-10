<!--
 * @Author: Nn
 * @Date: 2022-06-24 14:22:38
 * @LastEditors: Nn
 * @LastEditTime: 2022-06-28 10:52:10
 * @Description: 
-->
<template>
  <div>
    <!-- <div>
      <div>这里是bmx自定义产品页面的 公共表头. 可以自行设计</div>
      {{ actionInfo.name }}
      <div>-------</div>
    </div> -->

    <div>
      <template v-if="viewType === 'tree'">
        <TreeView />
      </template>

      <template v-else-if="viewType === 'form'">
        <FormView />
      </template>

      <template v-else> todo:{{ viewType }}</template>
    </div>
  </div>
</template>

<script>
import api from '@/odoorpc'

import TreeView from './tree.vue'
import FormView from './form.vue'

export default {
  name: 'WebView',
  components: { TreeView, FormView },
  mixins: [],

  data() {
    return {
      actionInfo: {}, // actionview info
      viewType: 'tree' // kanban/list/pivot/... view 切换
    }
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
    init() {
      const query = this.$route.query
      const { view_type: viewType } = query

      const actionId = api.tools.path2action_id(this.$route.path)
      const actionInfo = api.env.action_info_get(actionId)

      this.actionInfo = actionInfo
      this.viewType = viewType
    }
  }
}
</script>

<style type="text/css"></style>
