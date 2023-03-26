<template>
  <span>
    <template v-if="!editable || readonly">
      <a-radio-group v-model="value_display3" disabled :options="options" />
    </template>

    <template v-else>
      <a-radio-group
        v-model="value2"
        :options="options"
        @change="handleChange2"
      />
    </template>
  </span>
</template>

<script>
//   computed: {
//     value_display3: {
//       get() {
//         return this.value_display
//       },

//       set() {
//         //
//       }
//     },

//     value_display2() {
//       const value = this.value_display
//       const selection = this.fieldInfo.selection || []

//       const get_label = v => {
//         const elm = selection.find(item => item[0] === v)
//         return elm ? elm[1] : ''
//       }

//       return value ? get_label(value) : ''
//     },

//     options() {
//       return this.fieldInfo.selection.map(item => {
//         return { label: item[1], value: item[0] }
//       })
//     }
//   },

//   methods: {
//     handleChange2() {
//       this.handleChange(this.value2)
//     }
//   }
// }
</script>

<style type="text/css"></style>
