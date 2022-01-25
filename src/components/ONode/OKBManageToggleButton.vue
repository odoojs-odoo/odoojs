<template>
  <div>
    <!--  -->
    <a-dropdown :trigger="['click']">
      <a href="javascript:;" @click="onclick" :class="className">
        <a-icon type="menu" />

        <!-- <template v-for="(item, index) in node.children">
          <ONode
            :key="index"
            :data-info="dataInfo"
            :view-info="{ ...viewInfo, node: item }"
            @on-event="handleOnEvent"
          />
        </template> -->
      </a>

      <a-menu slot="overlay">
        <template v-for="(menu, index) in dropdown_menu">
          <template v-if="(menu.attrs || {}).role === 'separator'">
            <a-menu-divider :key="index" />
          </template>

          <template v-else>
            <a-menu-item :key="index">
              <ONode
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: menu }"
                @on-event="handleOnEvent"
              />
            </a-menu-item>
          </template>

          <!-- 
          <template v-if="menu.menu_type === 'sub-menu'">
            <a-sub-menu :key="index">
              <template slot="title">
                <ONode
                  :data-info="dataInfo"
                  :view-info="{ ...viewInfo, node: menu.node }"
                />
              </template>
              <template v-for="(menuitem, index2) in menu.children">
                <a-menu-item :key="index2">
                  <ONode
                    :data-info="dataInfo"
                    :view-info="{ ...viewInfo, node: menuitem.node }"
                    @on-event="handleOnEvent"
                  />
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>   
          -->
        </template>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import ONode from '@/components/ONode/ONode'

export default {
  name: 'OKBManageToggleButton',
  components: { ONode },

  // mixins: [KBNodeMixin],

  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return { record: {} }
      }
    },

    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {}
  },
  computed: {
    node() {
      return this.viewInfo.node || { children: [] }
    },

    dropdown_menu() {
      // console.log(this.viewInfo)
      const menus = this.viewInfo.dropdown_menu || []
      // const menus2 = menus.reduce((acc, item) => {
      //   if (!acc.length) acc.push({ type: 'item', node: item })
      //   else {
      //     acc.push({ type: 'divider' })
      //     acc.push({ type: 'item', node: item })
      //   }

      //   return acc
      // }, [])
      return menus
    },

    classNameByNode() {
      const arr = []
      const { attrs = {} } = this.node
      if (attrs.class) arr.push(attrs.class)

      return arr
    },

    className() {
      const arr = [...this.classNameByNode]
      return arr.join(' ')
    }
  },

  watch: {},
  async created() {},
  async mounted() {},

  methods: {
    onclick(e) {
      console.log('onclick', this.node)
      e.preventDefault()
      e.stopPropagation()
    },
    handleOnEvent(event_name, ...args) {
      // console.log('node,handleOnEvent,  ', event_name, ...args)
      this.$emit('on-event', event_name, ...args)
    }
  }
}
</script>

<style scoped></style>
