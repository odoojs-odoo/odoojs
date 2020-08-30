<template>
  <div>
    <div>
      <div>页面标题：{{ description }} 详情页面</div>

      <div>&nbsp;</div>
      <button @click="$router.back()">返回</button>
      <div>&nbsp;</div>
      <button @click="handleView">刷新</button>

      <div>
        <div>详情数据</div>
        <div>ID: {{ dataDict.id }}</div>
        <div v-for="(col, cname) in columnsForView" :key="cname">
          <div v-if="col.type === 'img'">
            {{ cname }} {{ col.label }}:
            <img :src="dataDict[cname]" alt="" width="20%">

            <!-- {{ dataDict[cname] }} -->
          </div>
          <div v-else>{{ cname }} {{ col.label }}: {{ dataDict[cname] }}</div>
        </div>
      </div>

      <div>&nbsp;</div>

      <div>
        <div>dataDict</div>
        <div v-for="(fld, index) in dataDict" :key="index">
          {{ index }}: {{ fld }}
        </div>
      </div>

      <div>&nbsp;</div>

      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import moduleMixin from '@/mixins/moduleMixin'

export default {
  name: 'League',
  components: {},
  mixins: [moduleMixin],

  data() {
    return {}
  },

  computed: {},

  async created() {
    // 在路由中的 meta 中, 取 name 设置 moduleName
    this.setModuleName()
  },

  methods: {}
}
</script>

<style type="text/css"></style>
