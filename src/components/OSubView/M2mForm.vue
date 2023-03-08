<template>
  <span>
    <!-- <a-modal v-model="showModal" :title="relationInfo && relationInfo.string">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <template v-for="meta in fields">
          <template v-if="invisible_get(meta)">
            invisible: {{ meta.name }}: {{ record[meta.name] }}
          </template>

          <template v-else>
            <FormField
              :key="meta.name"
              :field-name="meta.name"
              width="120px"
              :editable="false"
              :fields="fields"
              :data-info="dataInfo"
            />
          </template>
        </template>
      </a-form-model>

      <template slot="footer">
        <a-space v-if="editable">
          <a-button
            size="small"
            key="rollback"
            @click="() => (showModal = false)"
          >
            取消
          </a-button>

          <template v-if="!(relationInfo && relationInfo.readonly)">
            <a-button size="small" key="remove" @click="() => handleOnRemove()">
              移出
            </a-button>
          </template>
        </a-space>

        <a-space v-else>
          <a-button size="small" key="back" @click="() => (showModal = false)">
            关闭
          </a-button>
        </a-space>
      </template>
    </a-modal> -->
  </span>
</template>

<script>
// import M2mFormMixin from '@/odooui/M2mFormMixin'

// export default {
//   name: 'M2mForm',
//   components: {
//     FormField: () => import('@/components/OView/FormField.vue')
//   },
//   mixins: [M2mFormMixin],
//   props: {},
//   data() {
//     return {
//       labelCol: { span: 4 },
//       wrapperCol: { span: 14 }
//     }
//   },
//   computed: {},

//   watch: {},

//   created() {},

//   mounted() {},

//   methods: {}
// }
</script>

<style type="text/css"></style>
