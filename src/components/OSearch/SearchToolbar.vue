<template>
  <div>
    <a-dropdown :trigger="['click']">
      <a-button size="small">
        <a-icon type="filter" theme="filled" @click="e => e.preventDefault()" />
        筛选
      </a-button>

      <a-menu slot="overlay">
        <template v-for="(item, index) in searchBtnOptions">
          <a-menu-divider v-if="item.type === 'separator'" :key="index" />

          <template v-else-if="item.date">
            <a-sub-menu :key="index" :title="item.string || item.help">
              <template v-for="(year, year_index) in item.children">
                <a-menu-divider
                  v-if="year.type === 'separator'"
                  :key="year_index"
                />
                <a-menu-item
                  v-else-if="year.type === 'filter' && !year.children"
                  :key="year.name"
                >
                  <a href="javascript:;" @click="handleOnDropdownSelect(year)">
                    <a-icon type="check" v-show="year.checked" />
                    <a-icon type="plus" v-show="!year.checked" />
                    {{ year.string }}
                  </a>
                </a-menu-item>

                <a-sub-menu
                  v-else-if="year.type === 'filter' && year.children"
                  :key="year.name"
                  :title="year.string"
                >
                  <template v-for="(qt, qt_index) in year.children">
                    <a-menu-divider
                      v-if="qt.type === 'separator'"
                      :key="qt_index"
                    />
                    <a-menu-item
                      v-else-if="qt.type === 'filter' && !qt.children"
                      :key="qt.name"
                    >
                      <a
                        href="javascript:;"
                        @click="handleOnDropdownSelect(qt)"
                      >
                        <a-icon type="check" v-show="qt.checked" />
                        <a-icon type="plus" v-show="!qt.checked" />
                        {{ qt.string }}
                      </a>
                    </a-menu-item>

                    <!-- <a-sub-menu
                      v-else-if="qt.type === 'filter' && qt.children"
                      :key="qt.key"
                      :title="qt.string"
                    >
                      <template v-for="month in qt.children">
                        <a-menu-item :key="month.key">
                          {{ month.string }}
                        </a-menu-item>
                      </template>
                    </a-sub-menu> -->
                  </template>
                </a-sub-menu>
              </template>
            </a-sub-menu>
          </template>

          <template v-else>
            <a-menu-item :key="index">
              <a href="javascript:;" @click="handleOnDropdownSelect(item)">
                <a-icon type="check" v-show="item.checked" />
                <a-icon type="plus" v-show="!item.checked" />
                {{ item.string || item.help }}
              </a>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-dropdown>

    <!-- <a-button-group>
      <a-space>
        <a-button icon="menu" size="small">分组 </a-button>
        <a-button size="small">
          <a-icon type="star" theme="filled" />
          收藏
        </a-button>
      </a-space>
    </a-button-group> -->
  </div>
</template>

<script>
export default {
  name: 'SearchViewBtn',
  components: {},
  mixins: [],

  props: {
    searchBtnOptions: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },
  computed: {
    today() {
      // const today = new Date()
      // console.log(today)
      // const year = today.getUTCFullYear()
      // const month = today.getUTCMonth() + 1
      // const quarter = Math.floor((month - 1) / 4) + 1
      // console.log(today, year, month, quarter)
      return ''
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {
    handleOnDropdownSelect(item) {
      // console.log(item, item.valueString)

      this.$emit('on-search-select', item.name, !item.checked)
    }
  }
}
</script>

<style type="text/css"></style>
