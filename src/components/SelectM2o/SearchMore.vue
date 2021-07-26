<template>
  <div>
    <Modal
      v-model="showMoreMadal"
      title="先点击选中一条, 再点确定按钮"
      @on-ok="modalOk"
    >
      <!-- <p>先点击选中, 再点确定按钮</p> -->
      <Table
        :columns="[{ key: 'name' }]"
        :data="data"
        :show-header="false"
        highlight-row
        max-height="600"
        @on-row-click="onRowClick"
      ></Table>
    </Modal>
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
    modalOk() {
      console.log(' modalOk, ', [this.currentRow])
      const row = this.currentRow
      if (row.id) {
        this.$emit('on-select', row.id, row.name)
      }
    },
    onRowClick(row) {
      console.log('onRowClick', row)
      this.currentRow = { ...row }
    }
  }
}
</script>

<style type="text/css"></style>
