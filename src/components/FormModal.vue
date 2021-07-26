<template>
  <div>
    <Modal
      v-model="showMoreMadal"
      :title="node.attrs.string"
      footer-hide
      @on-ok="modalOk"
    >
      <!-- 
      @on-change="handleOnchange"
      -->

      <OFormView
        v-model="formData"
        :dataDict="dataDict"
        :node="node"
        :editable="true"
        :modelMethod="modelMethod"
        @on-change="handleOnchange"
        @button-clicked="handleButtonClicked"
      />

      <!-- {{ node }} -->

      <!-- <p>先点击选中, 再点确定按钮</p> -->
      <!-- <Table
        :columns="[{ key: 'name' }]"
        :data="data"
        :show-header="false"
        highlight-row
        max-height="600"
        @on-row-click="onRowClick"
      ></Table> -->
    </Modal>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const deep_copy = node => {
  return JSON.parse(JSON.stringify(node))
}

import OFormView from '@/components/OFormView'

export default {
  name: 'FormModal',
  components: { OFormView },
  props: {
    show: { type: Boolean, default: false },

    node: {
      type: Object,
      default: () => {
        return {
          attrs: {},
          children: []
        }
      }
    },

    modelMethod: { type: Function, default: () => false }
  },

  data() {
    return {
      dataDict: {},
      formData: {},
      editable: false,
      select_options: {}
    }
  },

  computed: {
    showMoreMadal: {
      get() {
        return this.show
      },

      set(value) {
        this.$emit('update:show', value)
      }
    }
  },

  watch: {
    show(newVal, oldVal) {
      console.log('watch, show, val', newVal, oldVal)

      if (newVal) {
        this.init()
      }
    }
  },

  async created() {},

  methods: {
    modalOk() {
      console.log(' modalOk, ')
    },

    async init() {
      const model = this.modelMethod()

      // this.dataDict = {}
      // this.formData = {}

      console.log('from modal, created,', model)

      // await model.onchange()
      this.model = model

      this.dataDict = { ...model.values }
      this.formData = { ...model.values }
      this.editable = true
      console.log('init, model new,', model, deep_copy(this.dataDict))
    },

    async handleOnchange(field, value, text) {
      console.log('handleOnchange', [field, value, text])
      await this.model.onchange(field, value, text)
      console.log('handleOnchange2', this.model)
      this.dataDict = { ...this.model.values }
      this.formData = { ...this.model.values }
      console.log('handleOnchange3', this.model.values)
    },

    async handleButtonClicked(payload = {}) {
      console.log(payload)
      const { special } = payload

      if (special) {
        if (special === 'cancel') {
          this.showMoreMadal = false
        } else {
          throw 'error'
        }

        return
      }

      const model = this.model
      await model.commit()

      console.log(model)

      // const { type, name } = payload
      // const res = await this.model.button_clicked(type, name)

      // if (!res) {
      //   // this.dataDict = { ...this.model.values }
      //   // this.formData = { ...this.model.values }
      // } else {
      //   // console.log(res, deep_copy(res.view.view_node))
      //   // this.modal_node = res.view.view_node
      //   // this.modal_model = res
      //   // this.showModal = true
      // }
    }
  }
}
</script>

<style scoped></style>
