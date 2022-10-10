<template>
  <span>
    <template v-if="!editable || readonly">
      <a-tag v-for="tag in subRecords" :key="tag[0]">{{ tag[1] }}</a-tag>
    </template>

    <template v-else>
      <!-- {{ value_display }}
      {{ value_v_model }} -->
      <!-- {{ options }} -->
      <a-select
        mode="multiple"
        v-model="value_v_model"
        label-in-value
        style="width: 100%"
        placeholder="Please select"
        @change="handleChange"
      >
        <a-select-option v-for="op in options" :key="op[0]">
          {{ op[1] }}
        </a-select-option>
      </a-select>
    </template>
  </span>
</template>

<script>
import OFMixin from './OFMixin'

import api from '@/odoorpc'

// const tuples2ids = tuples => {
//   const ids = tuples.reduce((acc, tup) => {
//     const op = tup[0]
//     if (op === 6) acc = [...tup[2]]
//     return acc
//   }, [])

//   return ids
// }

const check_array_equ = (listA, listB) => {
  let result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => a === b)) &&
    listB.every(_b => listA.some(_a => _a === _b))

  return result
}

// function sleep(millisecond) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, millisecond)
//   })
// }

export default {
  name: 'FM2mTags',
  components: {},
  mixins: [OFMixin],
  props: {
    value: { type: Array, default: () => [] }
  },
  data() {
    return {
      subRecords: [],
      options: [],
      value_v_model: []
    }
  },
  computed: {
    value_readonly() {
      return this.record[this.fname] || []
    },

    value_edit() {
      if (this.fname in this.values) return this.values[this.fname]
      else {
        const val = this.record[this.fname]
        if (val && val.length) return [[6, false, val]]
        else return []
      }
    }
  },

  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function (/*val*/) {
        // console.log('in watch, $route.fullPath')
        // console.log('watch fullPath')
        this.subRecords = []
        this.value_v_model = []
      },
      deep: true
    },

    editable: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldval) {
        if (newVal) {
          // console.log('editable, watch', this.fieldInfo, newVal, oldval)
          this.load_select_options()
        }
      },
      deep: true,
      immediate: true
    }
  },

  created() {},

  mounted() {
    // console.log('m2m Tags, mounted', this.fieldInfo, this.value_readonly)

    if (this.editable) {
      // console.log('editable, mounted', this.fieldInfo, this.editable)
      this.load_select_options()
    }
  },

  methods: {
    // tuples2ids(tuples) {
    //   return tuples2ids(tuples)
    // },

    check_array_equ(listA, listB) {
      return check_array_equ(listA, listB)
    },

    async load_select_options() {
      // console.log('load_select_options', this.valueRead, this.value_v_model)

      const relation = api.env.relation(this.fieldInfo)
      this.options = await relation.load_select_options()
    },

    async load_relation_data() {
      const ids = this.value_readonly

      this.value_v_model = ids.map(item => {
        return { key: item }
      })

      if (ids.length) {
        const relation = api.env.relation(this.fieldInfo)
        const result = await relation.name_get(ids)
        this.subRecords = result
      } else {
        this.subRecords = []
      }
    },

    async handleChange(value) {
      const value2 = value.map(item => item.key)
      this.$emit('change', this.fieldInfo.name, [[6, false, value2]])
    }
  }
}
</script>

<style type="text/css"></style>
