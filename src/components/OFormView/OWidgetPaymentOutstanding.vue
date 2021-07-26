<template>
  <div>
    <!-- {{ fullname }}
    {{ typeof dataDict[fname] }}
    {{ dataDict[fname] }} -->
    <div v-if="dataDict[fname] !== 'false'">
      <b>{{ value_readonly.title }} </b>

      <Table
        :columns="columns1"
        :data="value_readonly.content"
        :show-header="false"
      >
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="handleClick(row, index)"
            >添加</Button
          >
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import OMixin from './OMixin'

export default {
  name: 'OWidgetPaymentOutstanding',
  components: {},
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    fname() {
      return this.node.attrs.name
    },

    value_readonly() {
      const val_str = this.dataDict[this.fname]
      const val = val_str ? JSON.parse(val_str) : {}
      console.log(val)
      return val
    },

    columns1() {
      const value_readonly = this.dataDict[this.fname]

      if (!value_readonly) {
        return []
      }

      return [
        { title: 'Action', slot: 'action', width: 150, align: 'center' },

        { title: 'journal_name', key: 'journal_name' },
        {
          title: 'amount',
          key: 'amount',
          render: (h, { row, column }) => {
            return h('span', {}, [row.currency, row.amount])
          }
        },
        { title: 'payment_date', key: 'payment_date' }
      ]
    }
  },

  async created() {},

  mounted() {},

  methods: {
    //

    handleClick(row) {
      //
      //   js_assign_outstanding_line
      console.log(row)
    }
  }
}
</script>

<style type="text/css"></style>
