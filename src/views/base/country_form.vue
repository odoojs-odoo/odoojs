<template>
  <div>
    <h1>{{ '国家或地区' }}</h1>

    <Divider />

    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
// 重写 formview 的 例子

import formMixin from '@/mixins/formMixin'

export default {
  name: 'FormView2',
  components: {},
  mixins: [formMixin],

  data() {
    return {}
  },
  computed: {
    //   页面需要的字段, 自定义

    sheet_left_columns() {
      //  key, title, key__name, meta
      if (this.model) {
        return [
          { key: 'name', title: '国家名称', meta: this.model.fields.name },
          {
            key: 'currency_id',
            key__name: 'currency_id__name',
            title: '币种',
            meta: this.model.fields.currency_id
          },
          { key: 'code', title: '国家代码', meta: this.model.fields.code }
        ]
      } else {
        return []
      }
    },

    sheet_right_columns() {
      if (this.model) {
        return [
          {
            key: 'phone_code',
            title: '国家长途区号',
            meta: this.model.fields.phone_code
          }
        ]
      } else {
        return []
      }
    },

    one2many_fields_set() {
      return [{ name: 'state_ids', label: '省/州', columns: [] }]
    }
  },

  async created() {
    await this.init()
  },

  methods: {
    async handleOnCommit() {
      const error = e => {
        this.$Message.error(e.data.message)
      }
      this.handleCommit(null, error)
    }
  }
}
</script>

<style type="text/css"></style>
