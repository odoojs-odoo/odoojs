<template>
  <div>
    <div>
      <dialog :open="showDialog">
        <div>
          {{ message }}
        </div>
        <button @click="onOk">确认</button>
        <button @click="onCancel">取消</button>
      </dialog>

      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
/*
 一个简单的 对话框
 在 选择组件库以后, 使用组件库的对话框组件, 不要用该组件
*/

export default {
  name: 'Dialog',
  components: {},

  data() {
    return {
      showDialog: undefined,
      message: '?',
      onConfirm: undefined
    }
  },

  computed: {},

  async created() {},

  methods: {
    open(payload = {}) {
      const { onConfirm, message } = payload
      this.onConfirm = onConfirm
      this.message = message || '?'
      this.showDialog = 'open'
    },

    onOk() {
      if (this.onConfirm) {
        this.onConfirm()
      }

      this.showDialog = undefined
    },
    onCancel() {
      this.showDialog = undefined
    }
  }
}
</script>

<style type="text/css"></style>
