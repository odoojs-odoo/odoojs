<template>
  <div v-if="readonly || !editable" :class="className">
    <!-- m2m bin {{ [field.type, fname] }}
    {{ value_display }}
    {{ subRecords }} -->

    <template v-for="one in subRecords">
      <a-tag :key="one.id"> {{ one.name }} </a-tag>
    </template>
  </div>
  <div v-else>
    <!-- edit bin: {{ [field.type, fname] }}
    {{ value }} -->

    <!-- {{ subRecords }} -->

    <UploadBinary :fileList="subRecords" @on-change="handleOnchange" />
  </div>
</template>

<script>
import OWX2mMixin from './OWX2mMixin'
import api from '@/odooapi'

import UploadBinary from './OInput/UploadBinary.vue'

const check_array_equ = (listA, listB) => {
  let result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => a === b)) &&
    listB.every(_b => listA.some(_a => _a === _b))

  return result
}

export default {
  name: 'WM2mBinary',
  components: { UploadBinary },
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
      handler: function (newVal = [], oldval = []) {
        if (newVal.length && !this.check_array_equ(newVal, oldval)) {
          // console.log('m2m Tags, watch', this.fname, newVal, oldval)
          this.load_m2m_binary_data(newVal)
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
      this.load_m2m_binary_data(this.value_readonly)
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
    async load_m2m_binary_data(ids) {
      // console.log('m2m bin, load_m2m_binary_data', this.fname, ids)
      const result = await api.Node.load_m2m_binary_data(this.viewInfo, ids)
      // console.log('m2m bin, load_m2m_binary_data2', this.fname, ids, result)

      this.subRecords = result
    },

    handleOnchange(value) {
      // console.log('handleOnchange', value)
      this.subRecords = value
      const ids = value.map(item => item.id)
      this.onchange([[6, false, ids]])
    }
  }
}
</script>

<style type="text/css"></style>
