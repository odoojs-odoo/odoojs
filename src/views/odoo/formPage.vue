<template>
  <div>
    <div>
      <div>页面标题：{{ description }} 表单页面</div>
      <div>&nbsp;</div>
      <button @click="$router.back()">返回</button>
      <div>&nbsp;</div>
      <button @click="handleView">刷新</button>

      <div>表单</div>

      <div>
        <div v-for="(col, index) in columnsForForm" :key="index">
          {{ col.label }} {{ index }}
          <span v-if="col.type === 'select'">
            <select v-model="formData[index]" :multiple="col.multiple">
              <option
                v-for="op in getSelectOptins(index)"
                :key="op.value"
                :value="op.value"
              >
                {{ op.text }}
              </option>
            </select>
          </span>

          <span v-else-if="col.type === 'radio'">
            <span v-for="op in getSelectOptins(index)" :key="op.value">
              <input
                v-model="formData[index]"
                type="radio"
                :name="index"
                :value="op.value"
              >
              {{ op.text }}
            </span>
          </span>

          <span v-else-if="col.type === 'textarea'">
            <textarea
              v-model="formData[index]"
              :placeholder="col.placeholder"
            />
          </span>

          <span v-else-if="col.type === 'img'">
            <UploadImage v-model="formData[index]" :img-url="dataDict[index]" />
          </span>

          <span v-else-if="col.type === 'date'">
            <input
              v-model="formData[index]"
              type="date"
              :placeholder="col.placeholder"
            >
          </span>

          <span v-else-if="col.type === 'datetime'">
            <input
              v-model="formData[index]"
              type="datetime"
              :placeholder="col.placeholder"
            >
          </span>

          <span v-else>
            <input
              v-model="formData[index]"
              type="text"
              :placeholder="col.placeholder"
            >
          </span>
        </div>

        <div>&nbsp;</div>
        <button @click="handleSubmit">提交</button>
        <div>&nbsp;</div>

        <!-- <div>可选项:</div>
          <div>{{ options }}</div> -->
      </div>

      <div>表单数据</div>
      <div>{{ formData }}</div>
      <div>&nbsp;</div>

      <div>详情数据</div>
      <div v-for="(fld, index) in dataDict" :key="index">
        {{ index }}: {{ fld }}
      </div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import moduleMixin from '@/mixins/moduleMixin'

import UploadImage from './comps/UploadImage'

// import api from '@/api'

export default {
  name: 'League',
  components: { UploadImage },
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
