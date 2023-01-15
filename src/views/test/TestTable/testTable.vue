<template>
  <div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <div>
      <a-button @click="debug = !debug"> Test change columns </a-button>
    </div>

    test table

    <ACTable :columns="columns" :data-source="dataSource" row-key="id" />

    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <div>&nbsp;</div>
  </div>
</template>

<script>
import ACTable from './ACTable'

export default {
  name: 'TestTable',
  components: { ACTable },
  mixins: [],

  data() {
    return {
      debug: false,
      dataSource: [
        {
          id: 1,
          name: '1234567890, 1234567890, ',
          email: 'mail2',
          code: 'code2'
        }
      ]
    }
  },
  computed: {
    columns() {
      const cols1 = [
        {
          dataIndex: 'name',
          key: 'name',
          title: 'Name',
          align: 'left',
          width: 260
        },
        {
          dataIndex: 'id',
          key: 'id',
          title: 'ID',
          align: 'right'
          //   width: 100
        }
      ]

      const cols2 = [
        {
          dataIndex: 'email',
          key: 'email',
          title: 'Email',
          align: 'left',
          width: 200
        }
      ]

      const cols3 = [
        {
          dataIndex: 'code',
          key: 'code',
          title: 'Code',
          align: 'left',
          width: 300
        }
      ]

      if (this.debug) {
        return [...cols2, ...cols1]
      } else {
        return [...cols2, ...cols3, ...cols1]
      }
    }
  },
  async created() {},

  methods: {}
}
</script>

<style type="text/css"></style>
