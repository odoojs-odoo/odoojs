<template>
  <div v-if="readonly || !editable" :class="className">
    <!-- m2m tag {{ [field.type, fname] }}
    {{ value_display }} -->

    <template v-for="one in subRecords">
      <a-tag :key="one.id"> {{ one.display_name }} </a-tag>
    </template>
  </div>
  <div v-else>
    <!-- edit tags: {{ [field.type, fname] }}
    {{ value }}
    {{ options }} -->
    <!-- {{ value_edit }}
    {{ value_with_label }} -->
    <OSearchSelect
      :value="value_with_label"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      mode="multiple"
      :limit="7"
      :optionsMethod="optionsMethod"
      @on-change="handleOnchange"
    />
  </div>
</template>

<script>
import OWX2mMixin from './OWX2mMixin'
import api from '@/odooapi'

import OSearchSelect from './OInput/OSelect/OSearchSelect.vue'

const check_array_equ = (listA, listB) => {
  let result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => a === b)) &&
    listB.every(_b => listA.some(_a => _a === _b))

  return result
}

export default {
  name: 'WM2mTags',
  components: { OSearchSelect },
  mixins: [OWX2mMixin],
  props: {},
  data() {
    return {
      subRecords: [],
      options: [],
      value_with_label: []
    }
  },
  computed: {
    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_many2manytags')
      return arr.join(' ')
    }
  },

  watch: {
    value_readonly: {
      handler: function(newVal = [], oldval = []) {
        if (newVal.length && !this.check_array_equ(newVal, oldval)) {
          // console.log('m2m Tags, watch', this.fname, newVal, oldval)
          this.load_m2m_tags_data(newVal)
        }
      },
      deep: true,
      immediate: true
    },

    value_edit: {
      handler: function(newVal = [], oldval = []) {
        // console.log('m2m Tags, watch', this.fname, newVal, oldval)
        const ov = this.tuples2ids(oldval)
        const nv = this.tuples2ids(newVal)
        if (!this.check_array_equ(nv, ov)) {
          // console.log('m2m Tags, watch  edit:', this.fname, nv, ov)

          this.set_value_with_label(nv)
        }
      },
      deep: true,
      immediate: true
    }
  },

  created() {},

  mounted() {
    if (this.value_readonly.length) {
      // console.log('m2m Tags, mounted', this.fname, this.value_readonly)
      this.load_m2m_tags_data(this.value_readonly)
    }
  },

  methods: {
    check_array_equ(listA, listB) {
      return check_array_equ(listA, listB)
    },

    set_value_with_label(ids) {
      this.value_with_label = ids.map(item => {
        const label = this.options.find(it => it[0] === item)
        return [item, label ? label[1] : '']
      })
    },

    async load_m2m_tags_data(ids) {
      // console.log('m2m Tags, load_m2m_tags_data', this.fname, ids)
      const result = await api.Node.load_m2m_tags_data(this.viewInfo, ids)
      // console.log('m2m Tags, load_m2m_tags_data2', this.fname, ids, result)

      this.subRecords = result
      this.options = result.map(item => [item.id, item.display_name])

      this.set_value_with_label(this.value_readonly)
    },

    handleOnchange(value) {
      // console.log('handleOnchange', value, this.options)
      const ids = value.map(item => item[0])
      const ops = this.options.filter(item => !ids.includes(item[0]))
      this.options = [...ops, ...value]
      this.onchange([[6, false, ids]])
    },

    optionsMethod(payload = {}) {
      // console.log('get_options', payload)
      const { parentData } = this.dataInfo
      const parent_kw = parentData ? { parentData } : {}

      return api.Node.get_selection(this.viewInfo, {
        record: this.record,
        values: this.values,
        field: this.fname,
        ...parent_kw,
        ...payload
      })
    }
  }
}
</script>

<style type="text/css"></style>
