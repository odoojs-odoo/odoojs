<template>
  <div>
    <a-modal v-model="showMoreMadal" title="先点击选中一条, 再点确定按钮">
      <!-- <p>先点击选中, 再点确定按钮</p> -->

      <template slot="footer">
        <a-button key="submit" type="primary" @click="handleOk">
          Submit
        </a-button>

        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'SearchMore',
  components: {},
  mixins: [],

  props: {
    show: { type: Boolean, default: false },
    data: { type: Array, default: () => [] }
  },

  data() {
    return {
      currentRow: {}
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

  async created() {},

  methods: {
    handleOk() {
      // this.loading = true;
      // setTimeout(() => {
      //   this.visible = false;
      //   this.loading = false;
      // }, 3000);

      this.handleOnRowClick({ id: 1, name: 'p1' })
    },

    handleCancel() {
      this.showMoreMadal = false
    },

    async handleOnRowClick(row) {
      console.log('handleOnRowClick,', row)
      this.$emit('on-select', { key: row.id, label: row.name })
    }
  }
}
</script>

<style type="text/css"></style>
