<template>
  <div>
    <div>
      <PivotToolbar
        v-if="toolbar"
        :measures="pivotData.measures"
        @on-change="handleOnPivotChange"
      />
    </div>

    <!-- {{ records }} -->

    <div>row:</div>
    <div v-for="item in rows" :key="item">
      string: {{ groupbys[item.split(':')[0]].string }}, name: {{ item }}
    </div>
    <div>----</div>
    <div>columns:</div>
    <div v-for="item in cols" :key="item">
      string: {{ groupbys[item.split(':')[0]].string }}, name: {{ item }}
    </div>
    <div>----</div>
    <div>measures:</div>

    <div v-for="item in measures" :key="item">
      string:
      {{
        { ...measures_all, __count: { string: '个数' } }[item.split(':')[0]]
          .string
      }}, name: {{ item }}
    </div>

    <div>----</div>

    <div>data:</div>

    <div v-for="(rec, index) in records" :key="index">
      <span>--- {{ index }}: ---</span>
      <span v-for="me in measures" :key="me">
        {{
          { ...measures_all, __count: { string: '个数' } }[me.split(':')[0]]
            .string
        }}: {{ rec[me] }}
      </span>
      <span>-----</span>
      <span v-for="ax in [...rows, ...cols]" :key="ax">
        {{ groupbys[ax.split(':')[0]].string }}: {{ rec[ax] }}
      </span>
    </div>

    <div></div>
  </div>
</template>

<script>
import graphMixin from '@/mixins/graphMixin'

import PivotToolbar from '@/components/OPivot/PivotToolbar.vue'

export default {
  name: 'GraphView',
  components: { PivotToolbar },

  mixins: [graphMixin],

  props: {
    toolbar: { type: Boolean, default: false }
  },

  data() {
    return {}
  },
  computed: {},

  watch: {},

  async created() {},
  async mounted() {},

  methods: {}
}
</script>

<style scoped></style>
