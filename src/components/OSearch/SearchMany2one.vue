<template>
  <span>
    <!-- <span>
      {{ title }}
    </span>

    <a-select
      v-model="value2"
      labelInValue
      :filterOption="filterOption"
      mode="tags"
      style="width: 300px"
      :placeholder="placeholder"
      @change="handleChange"
    >
      <a-select-option v-for="op in options2" :key="op.key">
        {{ op.label }}
      </a-select-option>
    </a-select> -->
  </span>
</template>

<script>
// export default {
//   name: 'SearchM2o',

//   components: {},

//   mixins: [],

//   props: {
//     title: { type: String, default: undefined },
//     value: { type: Array, default: () => [] },
//     options: { type: Array, default: () => [] },

//     placeholder: { type: String, default: undefined }
//   },

//   data() {
//     return {
//       value2: []
//     }
//   },
//   computed: {
//     options2() {
//       return this.options.map(item => {
//         return {
//           key: `__id:${item[0]}`,
//           label: item[1],
//           res_id: item[0]
//         }
//       })
//     }
//   },
//   watch: {
//     value: {
//       handler: function (val = []) {
//         // console.log(val)

//         this.value2 = val.map(item => {
//           if (item.res_id) {
//             return { key: `__id:${item.res_id}`, label: item.string }
//           } else {
//             return { key: item.value, label: item.string }
//           }
//         })
//       },
//       deep: true
//     }
//   },

//   async created() {},

//   mounted() {},

//   methods: {
//     filterOption(inputValue, option) {
//       const key = option.key
//       const one = this.options2.find(item => item.key === key)
//       return one.label.toLowerCase().includes(inputValue.toLowerCase())
//     },

//     handleChange(value) {
//       const value2 = value.map(item => {
//         if (item.key.slice(0, 5) === '__id:') {
//           return {
//             res_id: Number(item.key.slice(5)),
//             string: item.label.trim()
//           }
//         } else {
//           return { value: item.key, string: item.label.trim() }
//         }
//       })
//       this.$emit('change', value2)
//     }
//   }
// }
</script>

<style type="text/css"></style>
