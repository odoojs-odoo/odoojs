<template>
  <div>
    view_partner_form

    <div>
      <div></div>
      {{
        !editable
          ? `${actionInfo.name} ${record.display_name}`
          : res_id
          ? `${actionInfo.name} ${record.display_name}`
          : `${actionInfo.name} 新增`
      }}
      <a-divider />
    </div>

    <a-space>
      <template v-if="!editable">
        <a-button @click="onClickBack"> 返回 </a-button>

        <a-button size="small" v-if="buttons.edit" @click="onClickEdit">
          编辑
        </a-button>
        <a-button size="small" v-if="buttons.create" @click="onClickNew">
          创建
        </a-button>
        <a-button size="small" v-if="buttons.delete" @click="onClickDel">
          删除
        </a-button>
      </template>

      <template v-if="editable">
        <a-button size="small" @click="onClickSave"> 保存 </a-button>
        <a-button size="small" @click="onClickCancel"> 取消 </a-button>
      </template>
    </a-space>

    <!-- style="float: right"  -->
    <a-space v-if="!editable">
      <a-dropdown :trigger="['click']">
        <a-button size="small" style="margin-left: 8px">
          <a-icon type="setting" /> 操作
        </a-button>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item v-if="buttons.create" key="copy"> 复制 </a-menu-item>
          <a-menu-item v-if="buttons.delete" key="unlink"> 删除 </a-menu-item>
          <a-menu-item key="archive" v-if="hasActive && record.active">
            存档
          </a-menu-item>
          <a-menu-item key="unarchive" v-if="hasActive && !record.active">
            取消存档
          </a-menu-item>

          <!-- <template v-for="btn in actionBtns">
            <a-menu-item :key="btn.id"> {{ btn.display_name }} </a-menu-item>
          </template> -->
        </a-menu>
      </a-dropdown>
    </a-space>

    <a-divider />
    <OToolbar
      :current-state="current_state"
      :states="header_statusbar_visible"
      :buttons="header_buttons"
      @button-clicked="handleBtnClicked"
    />

    <a-divider />

    <a-form-model
      ref="refForm"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :model="formValues"
      :rules="rules_edit"
    >
      <template v-for="meta in fields">
        <template
          v-if="
            typeof meta.invisible === 'function'
              ? meta.invisible({ record })
              : meta.invisible
          "
        >
          <!-- invisible: {{ meta.name }}: {{ record[meta.name] }} -->
        </template>

        <a-form-model-item
          v-else
          :key="meta.name"
          :label="meta.string"
          :prop="meta.name"
        >
        </a-form-model-item>
      </template>
    </a-form-model>
  </div>
</template>

<script>
import formMixin from '@/odooui/formMixin'

// import OToolbar from '@/components/OToolbar/index.vue'

export default {
  name: 'view_partner_form',
  components: {
    // OToolbar,
  },

  mixins: [formMixin],

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

  methods: {
    handleMenuClick({ key }) {
      if (typeof key === 'string') this.handleActionString(key)
      if (typeof key === 'number') this.handleActionBtn(key)
    },

    async handleActionBtn(key) {
      console.log('handleActionBtn', key)
      // const action = this.actionBtns.find(item => item.id === key)
      // if (this.viewType === 'list') {
      //   this.$emit('on-event', 'on-list-event', 'on-action', action)
      // } else if (this.viewType === 'form') {
      //   this.$emit('on-event', 'on-form-event', 'on-action', action)
      // }
    },

    async handleActionString(key) {
      console.log('string', key)
      if (key === 'copy') this.handleOnCopy()
      else if (key === 'unlink') this.onClickDel()
      else if (key === 'unarchive') this.handleOnUnarchive()
      else if (key === 'archive') this.handleOnArchive()
    }
  }
}
</script>

<style scoped></style>
