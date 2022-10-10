<template>
  <div class="flexBox" :style="compute_height">
    <div class="searchBase">
      <!-- // 高级搜索 -->
      <a-button
        class="gjBtn"
        v-if="!(Object.keys(searchItems).length === 1 && searchItems.name)"
        @click="dialogGJSearch"
        type="primary"
        :ghost="showSearchMore ? true : false"
      >
        <span v-if="showSearchMore" class="gjBtnContent">
          <a-icon type="funnel-plot" style="font-size: 15px" />
          关闭高级搜索
        </span>
        <span v-else class="gjBtnContent">
          <a-icon type="funnel-plot" style="font-size: 15px" />
          打开高级搜索
        </span>
      </a-button>

      <!-- // 搜索框 -->
      <SearchChar
        class="searchBox"
        v-if="searchItems.name && !showSearchMore"
        :placeholder="searchItems.name.string"
        :value="(searchValues.name || {}).values || []"
        @change="val => handleSearchChange(searchItems.name, val)"
      />
    </div>

    <!-- // 搜索的过滤条件 -->
    <div v-show="search_tags.length > 0" class="searchMore">
      <div class="note">
        搜索过滤条件:
        <a-tag
          v-for="tag in search_tags"
          :key="tag.name"
          closable
          @close="handleClose(tag)"
        >
          {{ tag.label }}
        </a-tag>
      </div>
    </div>

    <div
      class="gbBox"
      :class="{ open: showSearchMore, close: !showSearchMore }"
    >
      <div class="searchMoreBox searchContent">
        <template v-for="item in searchItems">
          <div
            :key="item.name"
            class="searchMoreItem"
            :style="{ width: item.type === 'filter' ? '100%' : 'auto' }"
          >
            <template v-if="item.type === 'field'">
              <template v-if="item.meta.type === 'selection'">
                {{ item.type }} {{ item.meta.type }}
              </template>
              <template v-else-if="item.meta.type === 'many2one'">
                <SearchMany2one
                  :title="item.string"
                  :placeholder="item.string"
                  :value="(searchValues[item.name] || {}).values || []"
                  :options="item.selection"
                  @change="val => handleSearchChange(item, val)"
                />
              </template>
              <template v-else>
                <SearchChar
                  :title="item.string"
                  :placeholder="item.string"
                  :value="(searchValues[item.name] || {}).values || []"
                  @change="val => handleSearchChange(item, val)"
                />
              </template>
            </template>
            <template v-else-if="item.type === 'filter'">
              <SearchSelect
                v-if="item.selection.length"
                :title="item.string"
                :placeholder="item.string"
                :value="(searchValues[item.name] || {}).values || []"
                :options="item.selection"
                @change="val => handleSearchChange(item, val)"
              />

              <template v-for="item2 in item.date_children">
                <div :key="item2.name">
                  <SearchDate
                    :title="item2.string"
                    :value="
                      (
                        ((searchValues[item.name] || {}).date_children || {})[
                          item2.name
                        ] || {}
                      ).value || []
                    "
                    @change="val => handleSearchChange(item2, val)"
                  />
                </div>
              </template>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SearchChar from './SearchChar.vue'
import SearchSelect from './SearchSelect.vue'
import SearchMany2one from './SearchMany2one.vue'
import SearchDate from './SearchDate.vue'
import { nextTick } from 'process'

export default {
  name: 'OSearch',

  components: { SearchChar, SearchSelect, SearchMany2one, SearchDate },

  mixins: [],

  props: {
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
    }
  },

  data() {
    return {
      showSearchMore: false,
      placement: 'top'
    }
  },
  computed: {
    search_tags() {
      const ss = Object.values(this.searchValues)
        .filter(tag => tag.values.length)
        .map(tag => {
          if (tag.type === 'field') {
            const str1 = tag.string
            const str2 = tag.values.map(item => item.string).join(', ')
            return {
              ...tag,
              label: `${str1}${str2}`
            }
          } else if (tag.type === 'filter') {
            // console.log(tag.name, tag)
            return {
              ...tag,
              label: tag.values
                .map(item => {
                  // console.log(item)
                  if (item.date) {
                    return `${item.string} ${item.value.join(',')}`
                  } else {
                    return item.string
                  }
                })
                .join(', ')
            }
          }
        })

      return ss
    },
    compute_height() {
      if (this.search_tags.length) {
        return `height:70px`
      } else {
        return `hright:50px`
      }
    }
  },
  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function (/*val*/) {
        // console.log('in watch, $route.fullPath')
        // console.log('watch fullPath')
        this.showSearchMore = false
      },
      deep: true
    }
  },

  async created() {},

  mounted() {
    nextTick(() => {
      console.log('----------', this.searchItems.name)
    })
  },

  methods: {
    handleClose(item) {
      // console.log(item)
      this.$emit('change', item, undefined)
    },
    handleSearchChange(item, value) {
      // console.log(item, value)
      this.$emit('change', item, value)
    },
    dialogGJSearch() {
      this.showSearchMore = !this.showSearchMore
      // if()
    }
  }
}
</script>

<style type="text/css" scope>
.ant-drawer-title {
  font-weight: 600 !important;
}

.flexBox {
  position: relative;
  /* display: flex; */
  height: 50px;
  background: white;
  padding: 10px;
  /* flex-wrap: wrap; */
}

.searchBase {
  width: 100%;
  /* display: flex; */
  /* background: burlywood;  */
}

.searchBox {
  display: inline-block;
  width: 300px;
  /* background: blue; */
  float: right;
  margin-right: 10px;
}

.searchMoreBox {
  width: 100%;
}

.searchMore {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.searchContent {
  display: flex;
  flex-wrap: wrap;
}

.searchMoreItem {
  /* width: 50%; */
  margin: 0 10px 20px 0;
  display: flex;
  align-items: center;
}

.note {
  color: gray;
  margin-top: 2px;
  width: 100%;
  /* background:yellow; */
}

.gjBtn {
  float: right;
  margin-right: 5px;
  /* background: red; */
  cursor: pointer;
  width: 130px;
}
.gjBtnContent {
  display: flex !important;
  align-items: center;
  text-align: center;
}

.ant-drawer-content-wrapper {
  height: auto !important;
}

.gbBox {
  background-color: white;
  position: absolute;
  margin-left: -10px;
  padding: 10px;
  top: 72px;
  /* background: black; */
  z-index: 999;
  /* border-top: 1px solid rgb(207, 206, 206); */
  border-radius: 5px;
  box-shadow: 0 0 10px rgb(161, 161, 253);
}

/* 显示或关闭动画*/
.open {
  animation: slideContentUp 0.2s linear both;
  /* background: pink; */
}

.close {
  animation: slideContentDown 0.2s linear both;
  /* background: yellowgreen; */
  display: none;
}

/* 动态设置高度 */
@keyframes slideContentUp {
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
}

@keyframes slideContentDown {
  from {
    opacity: 100%;
  }

  to {
    opacity: 0;
  }
}
</style>
