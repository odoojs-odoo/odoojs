<template>
  <a-form-model ref="ruleForm" :model="value2" :rules="rules">
    <a-form-model-item :prop="fname">
      <a-date-picker
        v-model="value2[fname]"
        :show-time="showTime"
        :class="className2"
        :id="elementId"
        :placeholder="placeholder"
        @change="onDateChange"
      />
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import OInputMixin from './OInputMixin'
import moment from 'moment'

export default {
  name: 'ODatePicker',
  components: {},
  mixins: [OInputMixin],

  props: {
    showTime: { type: Boolean, default: false }
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
      return this.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    }
  },

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    initValue(value) {
      if (value) this.value2 = { [this.fname]: moment(value, this.date_format) }
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
/* .input-required .ant-input {
  background: lightskyblue;
} */
</style>
