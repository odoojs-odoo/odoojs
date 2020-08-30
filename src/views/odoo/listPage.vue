<template>
  <div>
    <div>
      <div>页面标题：{{ description }} 列表页面</div>

      <div>&nbsp;</div>
      <button @click="$router.back()">返回</button>
      <div>&nbsp;</div>

      <Dialog ref="delDialog" />

      <div>列表数据</div>

      <button @click="handleFlash">刷新</button>

      <button v-if="!btnNew.hidden" @click="onBtnNew">
        {{ btnNew.label }}
      </button>

      <Page
        :total="dataCount"
        :page-size.sync="pageSize"
        :current.sync="currentPage"
        @change="handleSearch"
        @size-change="handleFlash"
      />

      <ul>
        <li v-for="(rec, index) in dataList" :key="rec.id">
          {{ index }}
          <button v-if="!btnView.hidden" @click="onBtnView(rec)">
            {{ btnView.label }}
          </button>
          <button v-if="!btnEdit.hidden" @click="onBtnEdit(rec)">
            {{ btnEdit.label }}
          </button>
          <button v-if="!btnDel.hidden" @click="onBtnDel(rec)">
            {{ btnDel.label }}
          </button>

          <span>
            ID: {{ rec.id }}&nbsp;&nbsp;
            <span v-for="(col, cname) in columnsForList" :key="cname">
              {{ cname }} {{ col.label }}:{{ rec[cname] }}&nbsp;&nbsp;
            </span>
          </span>
          <div>
            <span> ForAppList: </span>
            <img :src="iconForAppList(rec)" alt="" width="30">
            <!-- <span> icon= {{ iconForAppList(rec) }} </span> -->
            <span> title= {{ titleForAppList(rec) }} </span>
            <span> label= {{ labelForAppList(rec) }} </span>
            <span> value= {{ valueForAppList(rec) }} </span>
          </div>
          <!-- <div>{{ rec }}</div> -->
        </li>
      </ul>

      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
/*
   1 开发时, 复制这个页面代码, 处理样式
   2 路由里定义 指向 该页面的路由
   3 路由里 正确设置 meta 里的值
   4 导入 @/mixins/moduleMixin, 里面有 各种控制
   5 基本上无需 再定义新函数 和 数据
   6 如果有需要, 则在这里自定义 扩展
*/

import moduleMixin from '@/mixins/moduleMixin'

import Dialog from './comps/Dialog'
import Page from './comps/Page'

export default {
  name: 'League',
  components: { Dialog, Page },
  mixins: [moduleMixin],

  data() {
    return {}
  },

  computed: {},

  async created() {
    // 在路由中的 meta 中, 取 name 设置 moduleName
    this.setModuleName()
  },

  methods: {
    onBtnDel(rec) {
      this.$refs.delDialog.open({
        message: `确认删除? rec id is: ${rec.id}`,
        onConfirm: () => this.handleDel(rec)
      })
    }
  }
}
</script>

<style type="text/css"></style>
