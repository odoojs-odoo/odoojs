<template>
  <span v-if="invisible"></span>

  <div v-else-if="widget === 'remaining_days'">
    <!-- remaining_days {{ value_readonly }} -->
    {{ remaining_days }}
    <!--  {{ [field.type, fname, widget] }} -->

    <!-- <WImage
      :value_readonly="value_readonly"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    /> -->
  </div>

  <div v-else-if="widget_todo">
    {{ [field.type, fname, widget] }}
  </div>
  <div v-else-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname] }} -->
    <span>
      {{ value_display }}
    </span>
  </div>
  <div v-else>
    <!-- edit: {{ [field.type, fname] }} -->
    <ODatePicker
      :value="value"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      @on-change="onchange"
    />
  </div>
</template>

<script>
import OFMixin from './OFMixin'

import ODatePicker from './OInput/ODatePicker.vue'

export default {
  name: 'FDate',
  components: { ODatePicker },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    remaining_days() {
      if (!this.value_readonly) return undefined
      const date = new Date(this.value_readonly)
      const today = new Date()
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      today.setMilliseconds(0)

      const delta = date - today
      const days = Math.floor(delta / (24 * 3600 * 1000))
      // console.log(this.value_readonly, today, days)
      if (days > 0) return `在${days}天内`
      else if (days < 0) return `${-days}天前`
      else return '今天'
    },

    value_readonly() {
      return this.record[this.fname] || ''
    },

    value() {
      return this.value_edit || ''
    },
    widget_todo() {
      // 'date'  暂时未知
      // daterange 是 把两个关联的date字段, 用一个组件处理
      //   需要设计一个很特别的组件才能完成. 可参考 OA 里的处理 Kanban下拉菜单的思路
      const done = ['date', 'daterange']
      return done.includes(this.widget) ? '' : this.widget
    },
    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_date')

      if (!this.record[this.fname]) arr.push('o_field_empty')
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
