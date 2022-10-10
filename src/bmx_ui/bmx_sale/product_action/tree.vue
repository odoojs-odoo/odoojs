<!--
 * @Author: Nn
 * @Date: 2022-06-28 10:32:30
 * @LastEditors: Nn
 * @LastEditTime: 2022-06-28 11:17:28
 * @Description: 
-->
<template>
  <div>
    <div id="root1">
        <!-- <span>999</span> -->
        <a-button type="primary" style="marginRight:10px">
          批量删除
        </a-button>
        
        <a-button type="primary" @click="onClickNew">
          新建
        </a-button>
        <a-button type="primary">
          重置
        </a-button>
        
        <a-input-search
        placeholder="请输入客户名称"
        enter-button="搜索"
        size="default"
        style="width:300px;"
        @search="onSearch"
        />
    </div>

    <a-table
      :columns="columns"
      :data-source="records"
      rowKey="id"
      :customRow="tableCustomRow"
    >
    </a-table>
  </div>
</template>

<script>
import treeMixin from '@/odooui/treeMixin'

export default {
  name: 'TreeView',
  components: {},
  mixins: [treeMixin],

  props: {},

  data() {
    return {}
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    // // eslint-disable-next-line no-unused-vars
    // handleTableChange(pagination, filters, sorter) {
    //   // console.log(pagination, filters, sorter)
    //   const page = pagination.current
    //   this.handlePageChange(page)
    // },

    tableCustomRow(record) {
      const that = this
      return {
        // props: {
        //   xxx... //属性
        // },
        on: {
          // 事件
          // eslint-disable-next-line no-unused-vars
          click: event => {
            // console.log(record, event)
            that.handleOnRowClick(record)
          } // 点击行
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
  #root1 {
      background-color: white;
      width: 100%;
      height: 50px;
      position: relative;
      top: 0;
      left: 0;
      .ant-btn {
          float: right;
          margin-right: 20px;
          margin-bottom: 10px;
          margin-top: 10px;
      }
      .ant-input-search {
          float: right;
          margin-right: 10px;
          margin-top: 10px;
      }
  }
</style>
