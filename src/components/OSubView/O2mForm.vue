<template>
  <span>
    <a-modal v-model="showModal" :title="relationInfo && relationInfo.string">
      <!-- {{ relationInfo }} -->
      <a-form-model
        ref="refForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="formValues"
        :rules="rules_edit"
      >
        <template v-for="meta in fields">
          <template v-if="invisible_get(meta)">
            <!-- invisible: {{ meta.name }}: {{ record[meta.name] }} -->
          </template>

          <template v-else>
            <!-- :view-info="viewInfo" -->
            <FormField
              :key="meta.name"
              :field-name="meta.name"
              width="120px"
              v-model="formValues"
              :editable="relationInfo.readonly ? false : editable"
              :fields="fields"
              :data-info="dataInfo"
              @change="handleChange"
            />
          </template>
        </template>
      </a-form-model>

      <template slot="footer">
        <a-space v-if="editable">
          <a-button size="small" key="commit" @click="() => handleOnCommit()">
            保存
          </a-button>
          <a-button
            size="small"
            key="rollback"
            @click="() => handleOnRollback()"
          >
            丢弃
          </a-button>

          <a-button size="small" key="remove" @click="() => handleOnRemove()">
            移出
          </a-button>
        </a-space>

        <a-space v-else>
          <a-button size="small" key="back" @click="() => (showModal = false)">
            关闭
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </span>
</template>

<script>
import O2mFormMixin from '@/odooui/O2mFormMixin'

export default {
  name: 'O2MForm',
  components: {
    FormField: () => import('@/components/OView/FormField.vue')
  },
  mixins: [O2mFormMixin],
  props: {},
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
