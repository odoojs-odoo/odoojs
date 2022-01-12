<template>
  <div>
    <!--  -->

    <a-tabs v-if="node.children.length" type="card" @change="handleTabsChange">
      <template v-for="(page, index) in node.children">
        <template v-if="get_invisible(page)">
          <!-- <a-tab-pane :key="index" :tab="page.attrs.string">
            invisble {{ index }}
          </a-tab-pane> -->
        </template>

        <template v-else>
          <a-tab-pane :key="index" :tab="page.attrs.string">
            <!-- {{ index }}: -->

            <template v-for="(item, index2) in page.children">
              <!-- {{ index2 }} -->

              <ONode
                :key="index2"
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: item }"
                @on-event="handleOnEvent"
              />
            </template>
          </a-tab-pane>
        </template>
      </template>
    </a-tabs>
  </div>
</template>

<script>
import OMixin from './OMixin'

import ONode from './ONode'

export default {
  name: 'ONotebook',
  components: { ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    // eslint-disable-next-line no-unused-vars
    async handleTabsChange(activeKey) {
      // console.log(activeKey)
      // this.initFinished = false
      // await sleep(10)
      // this.initFinished = true
    }
  }
}
</script>

<style type="text/css"></style>
