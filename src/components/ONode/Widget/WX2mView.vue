<template>
  <div>
    <div>
      <div align="left" v-if="editable && !readonly">
        <!-- rowEditchanged= {{ rowEditchanged }} -->

        <a-popconfirm
          v-if="rowEditchanged"
          ok-text="确认"
          cancel-text="取消"
          @confirm="handleOnCreateO2m"
        >
          <template slot="title">
            当前行已经编辑, <br />确认要放弃编辑, <br />创建一新行?
          </template>

          <a-button size="small">
            {{ field.type === 'many2many' ? '添加' : '创建' }}
          </a-button>
        </a-popconfirm>

        <a-button v-else size="small" @click="handleOnCreateO2m">
          {{ field.type === 'many2many' ? '添加' : '创建' }}
        </a-button>
      </div>

      <div align="right" v-if="subViewMode.length > 1">
        <!--  v-if="subViewMode.length > 1 && 
        (!editable || (editable && !readonly))" -->
        <a-radio-group
          v-model="subViewType"
          :default-value="subViewMode[0]"
          button-style="solid"
          size="small"
          @change="handleChangeSubViewType"
        >
          <a-radio-button value="kanban">
            <a-icon type="appstore" theme="filled" />
          </a-radio-button>
          <a-radio-button value="tree">
            <a-icon type="unordered-list" />
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <div :class="className">
      <!-- m2m Non widget {{ [field.type, fname] }}
     
      {{ field.type }} 
      {{ subRecords }} -->

      <!-- {{ subViewMode }} -->

      <template v-if="subViewMode.includes('tree')">
        <div v-show="subViewType === 'tree'">
          <!-- sub tree-->
          <!-- 
           :x2m-type="field.type"
             -->
          <OSubTree
            ref="subTree"
            :fname="fname"
            :field="field"
            :editable="editable"
            :rowEditchanged.sync="rowEditchanged"
            :viewInfo="relationInfo"
            :data.sync="subData"
            :parentViewInfo="{ ...viewInfo, node }"
            :parentData="{ record, values }"
            @on-change="onchange"
          />
        </div>
      </template>

      <template v-if="subViewMode.includes('kanban')">
        <div v-show="subViewType === 'kanban'">
          <!-- sub kanban -->
          <OSubKanban
            ref="subKanban"
            :fname="fname"
            :field="field"
            :editable="editable"
            :viewInfo="relationInfo"
            :data.sync="subData"
            :parentViewInfo="{ ...viewInfo, node }"
            :parentData="{ record, values }"
            @on-change="onchange"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import OWX2mMixin from './OWX2mMixin'
import OSubTree from '@/components/OSubView/OSubTree.vue'
import OSubKanban from '@/components/OSubView/OSubKanban.vue'

import api from '@/odooapi'
// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

const check_array_equ = (listA, listB) => {
  let result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => a === b)) &&
    listB.every(_b => listA.some(_a => _a === _b))

  return result
}

export default {
  name: 'WX2mView',
  components: { OSubTree, OSubKanban },
  mixins: [OWX2mMixin],
  props: {},

  data() {
    return {
      rowEditchanged: false,
      subViewType: 'tree',
      subData: { records: [] },
      relationInfo: undefined
    }
  },
  computed: {
    subViewMode() {
      const { views = {} } = this.relationInfo || {}
      const { fields_views = {} } = views
      return Object.keys(fields_views).filter(item =>
        ['kanban', 'tree'].includes(item)
      )
    },
    subRecords() {
      const { records = [] } = this.subData
      return records
    },
    dataLoadStatus() {
      if (!this.relationInfo) return 'wait_relation_load'
      const ids = this.record[this.fname]
      if (!ids) return 'wait_parent_data'
      if (!ids.length) return 'need_not_load'
      const ids_loaded = this.subRecords.map(item => item.id)
      // console.log(
      //   'o2m dataLoadStatus',
      //   this.fname,
      //   ids,
      //   ids_loaded,
      //   check_array_equ(ids, ids_loaded)
      // )
      if (check_array_equ(ids, ids_loaded)) return 'loaded'
      else return 'toload'
    }
  },

  watch: {
    // // eslint-disable-next-line no-unused-vars
    // dataLoadStatus(newValue, oldValue) {
    //   console.log('watch dataLoadStatus', this.fname, newValue, oldValue)
    //   if (newValue === 'toload') {
    //     this.load_relation_data()
    //   }
    // },

    dataLoadStatus: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newValue, oldValue) {
        // console.log('watch dataLoadStatus', this.fname, newValue, oldValue)
        if (newValue === 'toload') {
          this.load_relation_data()
        }
      },
      deep: true,
      immediate: true
    },
    editable(newVal, oldVal) {
      // console.log(newVal, oldVal, cp(this.subData))
      if (!newVal && oldVal) {
        this.subData = { records: [] }
      }
    }
  },

  async created() {},

  async mounted() {
    // console.log('m2m mounted', this.fname)
    if (!this.relationInfo) {
      this.relationInfo = await this.load_relation_info()
      // console.log('load_relation_info ', this.relationInfo)
      // console.log('load_relation_info ', cp(this.field), cp(this.relationInfo))

      const svm = this.subViewMode
      this.subViewType = svm.length ? svm[0] : 'tree'
      // console.log(
      //   'x2m relation',
      //   this.fname,
      //   this.relationInfo && cp(this.relationInfo),
      //   this.subViewMode
      // )
    }
  },

  methods: {
    async load_relation_info() {
      //
      return await api.Node.load_relation_info(this.viewInfo)
    },
    async load_relation_data() {
      //
      const { node } = this.viewInfo
      const ids = this.record[this.fname]
      // console.log('o2m load_data', this.fname, ids, cp(this.relationInfo || {}))
      const { records, relation } = await api.Node.load_relation_data(
        this.relationInfo,
        ids,
        { node, record: this.record }
      )

      const values = [] // records.map(item => [4, item.id, false])
      this.subData = { records, values }
      // console.log('load_relation_data ', cp(relation))
      this.relationInfo = relation
    },

    handleOnCreateO2m() {
      // console.log('createO2m')
      if (this.subViewType === 'tree') {
        // console.log('createO2m', this.subViewType, this.$refs.subTree)
        this.$refs.subTree.handleOnCreate()
      } else if (this.subViewType === 'kanban') {
        // console.log('createO2m', this.subViewType, this.$refs.subKanban)
        this.$refs.subKanban.handleOnCreate()
      }
    },

    // eslint-disable-next-line no-unused-vars
    handleChangeSubViewType(e) {
      // const viewType = e.target.value
      // console.log('xxxx', viewType, this.subViewType)
    }
  }
}
</script>

<style type="text/css" scoped></style>
