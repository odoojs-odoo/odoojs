<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="设置"
      @back="$router.go(-1)"
    >
      <a-space>
        <a-button size="small" type="primary" @click="handleOnCommit">
          保存
        </a-button>
        <!-- <a-button size="small" @click="handleOnCancel">放弃</a-button> -->
      </a-space>
    </a-page-header>

    <div>
      <!-- config: o_setting_container: {{ node_setting_container.class }} -->
      <div>
        <!-- settings_tab : {{ node_settings_tab.class }}
        settings_tab -->
      </div>
      <div>
        <!-- settings: {{ node_settings.class }} -->
        <!-- settings -->

        <a-row>
          <a-col :span="4">
            <a-menu v-model="selectedKeys" @click="handleClick">
              <template v-for="item in node_settings.children">
                <!-- {{ item }} -->
                <template
                  v-if="(item.attrs.class || '').includes('app_settings_block')"
                >
                  <a-menu-item :key="item.attrs['data-key']">
                    {{ item.attrs['string'] }}
                    <!-- {{ item.attrs['data-string'] }}
                    {{ item.attrs['data-key'] }} -->
                  </a-menu-item>
                </template>
              </template>
            </a-menu>
          </a-col>
          <a-col :span="20">
            <ONode
              style="padding: 2px 9px"
              :editable="true"
              :data-info="data"
              :view-info="{ ...viewInfo2, node: current_node }"
              @on-event="handleOnViewEvent"
            />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import formConfigViewMixin from '@/mixins/formConfigViewMixin'

import ONode from '@/components/ONode/ONode'

export default {
  name: 'OConfig',
  components: { ONode },
  mixins: [formConfigViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    handleClick({ key }) {
      console.log('click', key)
    }
  }
}
</script>

<style type="text/css"></style>
