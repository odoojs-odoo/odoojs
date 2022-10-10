<template>
  <div>
    <div class="pageTitle">
      <!-- {{ title }} -->
    </div>

    <OSearch
      :search-values="searchValues"
      :search-items="searchItems"
      @change="handleSearchChange"
    />
    <!-- <a-divider /> -->

    <div class="Btn">
      <a-space class="addBtn">
        <a-button
          size="small"
          v-if="buttons.create"
          @click="onClickRightBtn('new')"
        >
          创建
        </a-button>
      </a-space>

      <a-space v-if="activeIds.length" class="deletBtn">
        <a-dropdown :trigger="['click']">
          <a-button size="small" style="margin-right: 8px">
            <a-icon type="setting" /> 操作
          </a-button>
          <a-menu slot="overlay" @click="handleMenuClick">
            <!-- TBD   导出功能 暂时屏蔽  -->
            <!-- <a-menu-item key="export"> 导出 </a-menu-item> -->
            <a-menu-item v-if="buttons.delete" key="unlink"> 删除 </a-menu-item>
            <a-menu-item key="archive" v-if="hasActive"> 存档 </a-menu-item>
            <a-menu-item key="unarchive" v-if="hasActive">
              取消存档
            </a-menu-item>

            <!-- {{ actionBtns }} -->

            <template v-for="btn in actionBtns">
              <a-menu-item :key="btn.id"> {{ btn.name }} </a-menu-item>
            </template>
          </a-menu>
        </a-dropdown>
      </a-space>

      <a-tooltip placement="bottom" class="expBtn">
        <template slot="title"> 导出全部 </template>
        <a-button
          size="small"
          icon="download"
          @click="onClickRightBtn('export_all')"
        />
      </a-tooltip>

      <!-- TBD  导入功能 暂时屏蔽  -->
      <!-- <a-tooltip placement="bottom">
        <template slot="title"> 导入记录 </template>
        <a-button size="small" icon="upload" @click="handleOnImport" />
      </a-tooltip> -->
    </div>

    <!-- <a-divider /> -->
  </div>
</template>

<script>
import OSearch from '@/components/OSearch/index.vue'

export default {
  name: 'ONavbar',
  components: { OSearch },
  mixins: [],
  props: {
    title: { type: String, default: undefined },

    searchValues: {
      type: Object,
      default: () => {
        return {}
      }
    },

    searchItems: {
      type: Object,
      default: () => {
        return {}
      }
    },

    buttons: {
      type: Object,
      default: () => {
        return {}
      }
    },

    actionBtns: { type: Array, default: () => [] },

    activeIds: { type: Array, default: () => [] },
    hasActive: { type: Boolean, default: false }
  },
  data() {
    return {}
  },

  computed: {},

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    async handleSearchChange(item, value) {
      this.$emit('search-change', item, value)
    },

    onClickRightBtn(btn) {
      this.showRight = false
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

      //   if (key === 'export') this.handleOnExport()
      //   else if (key === 'unlink_multi') this.handleOnUnlink(1)
      //   else if (key === 'unarchive') this.handleOnUnarchive()
      //   else if (key === 'archive') this.handleOnArchive()
      // else if (key === 'copy') this.handleOnCopy()
      // else if (key === 'unlink') this.handleOnUnlink()
    }
  }
}
</script>

<style type="text/css">
.pageTitle {
  /* font-weight: 600;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 0 1px 10px;
  margin-bottom: 3px; */
}

.Btn {
  margin: 22px 0;
  display: flex;
  position: relative;
  align-items: center;
}

.addBtn {
  position: absolute;
  left: 5px;
}

.deletBtn {
  position: absolute;
  right: 30px;
}

.expBtn {
  position: absolute;
  right: 5px;
}
</style>
