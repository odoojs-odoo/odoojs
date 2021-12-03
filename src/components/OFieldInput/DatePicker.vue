<template>
  <a-form-model ref="ruleForm" :model="value2" :rules="rules">
    <a-form-model-item :prop="fname">
      <!--  -->
      <!-- {{ [type] }} -->
      <a-date-picker
        :class="required ? 'input-required' : undefined"
        :id="fname"
        :show-time="type === 'datetime'"
        v-model="value2[fname]"
        :placeholder="placeholder"
        @change="onDateChange"
      />
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import inputMixin from './inputMixin'
import moment from 'moment'

export default {
  name: 'DatePicker',
  components: {},
  mixins: [inputMixin],

  props: {
    type: { type: String, default: 'date' }
  },

  data() {
    return {}
  },
  computed: {
    rules() {
      return {
        [this.fname]: [
          { required: this.required, message: '请选择!', trigger: ['change'] }
          // { required: true, message: '请选择!', trigger: ['change'] }
        ]
      }
    },

    date_format() {
      return this.type === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    }
  },

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    set_value_in_watch(newValue, oldValue) {
      const valold = oldValue[this.fname]
      const valnew = newValue[this.fname]
      const myval = this.value2[this.fname]
      // console.log('watch date:', this.fname, valold, valnew, myval)

      if (valnew && valnew !== valold && valnew !== myval) {
        const val2 = moment(valnew, this.date_format)
        this.value2 = { [this.fname]: val2 }
      }
    },
    set_value_in_mounted() {
      const valnew = this.dataDict[this.fname]
      const myval = this.value2[this.fname]
      if (valnew && valnew !== myval) {
        const val2 = moment(valnew, this.date_format)
        this.value2 = { [this.fname]: val2 }
      }
    },

    onDateChange(date, dateString) {
      // console.log(date, dateString)

      this.$refs.ruleForm.validate(valid => {
        // console.log(valid)
        if (valid) this.onchange(dateString)
      })
    }
  }
}
</script>

<style type="text/css">
.input-required .ant-input {
  background: lightskyblue;
}
</style>
