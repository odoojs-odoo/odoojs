<template>
  <div v-if="readonly || !editable" :class="className">
    <!-- <span>
    todo:WBooleanFavorite
    {{ fname }}
    {{ value }}
  </span> -->
    <ORate
      :value="value"
      :selectionOptions="selectionOptions"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      @on-change="handleOnchange"
    />
    <template v-if="!node.attrs.nolabel">
      {{ value ? '从收藏移除' : '添加到收藏' }}
    </template>
  </div>

  <ORate
    v-else
    :value="value"
    :selectionOptions="selectionOptions"
    :fname="fname"
    :required="required"
    :placeholder="node.attrs.placeholder"
    :element-id="node.attrs.id || node.attrs.name"
    :className="className"
    @on-change="onchange"
  />
</template>

<script>
import OWMixin from './OWMixin'
import ORate from './OInput/ORate.vue'

export default {
  name: 'WBooleanFavorite',
  components: { ORate },
  mixins: [OWMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    value() {
      return this.value_edit ? 1 : 0
    },

    selectionOptions() {
      return [
        ['0', false],
        ['1', true]
      ]
    },

    className() {
      const arr = [...this.classNameByField]

      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {
    // console.log(this.fname, this.node, this.field)
  },

  methods: {
    async handleOnchange(value) {
      console.log('handleOnchange', [this.fname, value])
      this.$emit('on-event', 'on-write', { [this.fname]: value })
    }

    // async onchange(value) {
    //   console.log('handleOnchange', [this.fname, value])
    //   //   this.$emit('on-event', 'on-write', { [this.fname]: value })
    // }
  }
}
</script>

<style type="text/css"></style>
