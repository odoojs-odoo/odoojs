<template>
  <div>
    <Table :columns="columns" :data="data" @on-row-click="handleOnRowClick">
    </Table>

    <Divider />
  </div>
</template>

<script>
// import api from '@/api'

export default {
  name: 'TreeView',
  components: {},
  mixins: [],

  props: {
    title: { type: String, default: '列表视图' },
    columns: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },
  computed: {},
  watch: {},

  async created() {},

  methods: {
    async handleOnRowClick(row) {
      // console.log('handleOnRowClick,', row)
      this.$emit('on-row-click', row)
    }
  }
}
</script>

<style type="text/css"></style>
