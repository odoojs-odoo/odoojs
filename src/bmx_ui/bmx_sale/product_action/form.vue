<template>
  <div>
    <!-- <div>这里是bmx自定义产品 详情页面, 以及编辑页面. 可以自行设计</div>
    <div>-------</div> -->

    <a-form-model
      ref="refForm"
      layout="horizontal" 
      v-bind="layout"
      :model="formValues"
      :rules="rules_edit"
    >
      <div 
        style="
          width:100%;
          height:40px;
          marginRight:0px; 
          textAlign:right;
          paddingTop:8px;
        "
      >
        <template v-if="!editable">
          <a-button @click="onClickEdit"> 编辑 </a-button>
          <a-button @click="onClickNew"> 创建 </a-button>
          <a-button @click="onClickDel"> 删除 </a-button>
        </template>

        <template v-if="editable">
          <a-button 
            type="primary" 
            style="marginRight:15px;"
            @click="onClickSave"
          > 
            保存 
          </a-button>
          <a-button 
            type="danger"
            @click="onClickCancel"
          > 
            取消 
          </a-button>
        </template>
      </div>
      
      <a-divider>
        <h3 style="font-weight: bold; font-size: 16px;"> 新建产品</h3>
      </a-divider>
      <a-form-model-item label="名称1" prop="display_name">
        <FString
          v-model="formValues.display_name"
          :field-info="fields.display_name"
          :editable="editable"
          :data-info="dataInfo"
          @change="handleChange"
        />
      </a-form-model-item>

      <a-form-model-item label="名称2" prop="name">
        <FString
          v-model="formValues.name"
          :field-info="fields.name"
          :editable="editable"
          :data-info="dataInfo"
          @change="handleChange"
        />
      </a-form-model-item>

      <a-form-model-item label="code" prop="default_code">
        <FString
          v-model="formValues.default_code"
          :field-info="fields.default_code"
          :editable="editable"
          :data-info="dataInfo"
          @change="handleChange"
        />
      </a-form-model-item>

      <a-form-model-item label="detailed_type" prop="detailed_type">
        <FSelection
          v-model="formValues.detailed_type"
          :editable="editable"
          :field-info="fields.detailed_type"
          :data-info="dataInfo"
          @change="handleChange"
        />
      </a-form-model-item>

      <a-form-model-item label="list_price" prop="list_price">
        <FNumber
          v-model="formValues.list_price"
          :editable="editable"
          :field-info="fields.list_price"
          :data-info="dataInfo"
          @change="handleChange"
        />
      </a-form-model-item>

      <a-form-model-item label="code" prop="tax_string">
        <FString
          v-model="formValues.tax_string"
          :field-info="fields.tax_string"
          :editable="editable"
          :data-info="dataInfo"
          @change="handleChange"
        />
      </a-form-model-item>

      <a-form-model-item label="categ_id" prop="categ_id">
        <FMany2one
          v-model="formValues.categ_id"
          :field-info="fields.categ_id"
          :editable="editable"
          :data-info="dataInfo"
          @change="handleChange"
        />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import formMixin from '@/odooui/formMixin'

import FSelection from '@/components/OField/FSelection.vue'
import FMany2one from '@/components/OField/FMany2one.vue'
import FString from '@/components/OField/FString.vue'
import FNumber from '@/components/OField/FNumber.vue'
// import FDate from '@/components/OField/FDate.vue'
// import FDatetime from '@/components/OField/FDatetime.vue'

// import FBoolean from '@/components/OField/FBoolean.vue'

// import FM2mTags from '@/components/OField/FM2mTags.vue'
// import FOne2many from '@/components/OField/FOne2many.vue'

// import FMany2many from '@/components/OField/FMany2many.vue'

export default {
  name: 'FormView',
  components: {
    FSelection,
    FMany2one,
    FString,
    FNumber
    // FDate,
    // FDatetime,
    // FBoolean,

    // FM2mTags,
    // FOne2many,
    // FMany2many
  },

  mixins: [formMixin],

  props: {},

  data() {
    return {
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
    }
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style scoped></style>
