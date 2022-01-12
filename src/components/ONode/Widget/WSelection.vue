<template>
  <div v-if="readonly || !editable" :class="className">
    <!-- WSelection {{ [field.type, fname] }} -->
    <span>
      <span v-if="edit_only"> todo class:{{ [edit_only] }} </span>
      {{ value_readonly }}
    </span>
  </div>
  <!-- <div v-else>
    edit:m2o selection {{ [field.type, fname] }}

    {{ value }}
    {{ selectionOptions }}
  </div> -->

  <OSelect
    v-else
    :value="value"
    :fname="fname"
    :selectionOptions="selectionOptions"
    :required="required"
    :placeholder="node.attrs.placeholder"
    :element-id="node.attrs.id || node.attrs.name"
    :className="className"
    @on-change="onchange"
  />
</template>

<script>
import OWMixin from './OWMixin'
import OSelect from './OInput/OSelect/OSelect.vue'

export default {
  name: 'WSelection',
  components: { OSelect },
  mixins: [OWMixin],
  props: {
    selectionOptions: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  computed: {
    value_display() {
      return this.value
    },

    className() {
      const arr = [...this.classNameByField]
      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
