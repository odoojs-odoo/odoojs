<template>
  <div class="box">
    <div class="title">{{ title }}</div>
    <div class="titleBox">
      <a-space class="editBtn">
        <template v-if="!editable">
          <a-button size="small" v-if="buttons.edit" @click="onClickRightBtn('edit')">
            编辑
          </a-button>
          <a-button
            v-if="buttons.create"
            @click="onClickRightBtn('new')"
            type="primary"
            ghost
             size="small"
          >
            创建
          </a-button>
          <a-button
            v-if="buttons.delete"
            @click="onClickRightBtn('del')"
            type="danger"
            ghost
             size="small"
          >
            删除
          </a-button>
        </template>
        <template v-if="editable">
          <a-button size="small" @click="onClickRightBtn('save')"> 保存 </a-button>
          <a-button size="small" @click="onClickLeft"> 取消 </a-button>
        </template>
      </a-space>

      <div>
        <a-space v-if="!editable">
          <a-button size="small" @click="onClickLeft"> 返回 </a-button>
          <a-dropdown :trigger="['click']">
            <a-button size="small" style="margin-left: 8px">
              <a-icon type="setting" /> 操作
            </a-button>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item v-if="buttons.create" key="copy"> 复制 </a-menu-item>
              <a-menu-item v-if="buttons.delete" key="unlink">
                删除
              </a-menu-item>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ONavbar',
  components: {},
  mixins: [],
  props: {
    title: { type: String, default: undefined },
    editable: { type: Boolean, default: false },
    hasActive: { type: Boolean, default: false },
    buttons: {
      type: Object,
      default: () => {
        return {}
      }
    },
    record: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },

  computed: {},

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    onClickLeft() {
      this.$emit('click-left')
    },

    onClickRightBtn(btn) {
      this.$emit('click-right', btn)
    },

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
      this.onClickRightBtn(key)
    }
  }
}
</script>

<style type="text/css" scope>
.box {
  background: white;
  padding: 10px 10px 0;
  margin-bottom: 5px;
}
.titleBox {
  display: flex;
  justify-content: space-between;

  padding: 10px 0;
}
.title {
  font-weight: 600;
  margin-bottom: 6px;
}
.editBtn {
}
</style>
