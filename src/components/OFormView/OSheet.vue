<template>
  <div class="clearfix position-relative o_form_sheet">
    <div v-if="debug">
      {{ 'Sheet ok' }}
    </div>

    <!-- sheet_button_box -->
    <template
      v-if="
        sheet_button_box && childern_filter(sheet_button_box.children).length
      "
    >
      <OButtonBox
        :editable="editable"
        :loading="loading"
        :data-info="dataInfo"
        :view-info="{ ...viewInfo, node: sheet_button_box }"
        :method-call="methodCall"
        @on-event="handleOnEvent"
      />
    </template>

    <!-- sheet_title and  avatar -->
    <a-row>
      <a-col :span="18">
        <template v-if="sheet_title">
          <ONode
            :editable="editable"
            :loading="loading"
            :data-info="dataInfo"
            :view-info="{ ...viewInfo, node: sheet_title }"
            :method-call="methodCall"
            @on-event="handleOnEvent"
          />
        </template>
      </a-col>
      <a-col :span="6">
        <span v-for="(ribbon, index) in sheet_ribbon" :key="index">
          {{ ribbon.attrs.title }}
        </span>
        <img v-if="avatar_url" :src="avatar_url" width="50%" />
      </a-col>
    </a-row>

    <!-- sheet_content -->

    <template v-for="(item, index) in sheet_content">
      <!-- {{ index }}: {{ item.tagName }} -->

      <template v-if="item.tagName === 'group'">
        <OGroup
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :parent-span="parentSpan"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>
      <template v-else-if="item.tagName === 'notebook'">
        <!-- in sheet: notebook -->

        <ONotebook
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>
      <template v-else-if="item.tagName === 'label'">
        <!-- in sheet: label -->
        <OLabel
          :key="index"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
        />
      </template>
      <template v-else-if="item.tagName === 'field'">
        <!-- in sheet: field -->
        <!-- field 有 m2m widget="many2many" 
           stock pick_ids TBD
          -->

        <OField
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <template v-else-if="item.tagName === 'div'">
        <!-- in sheet: div -->
        <ONode
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <!-- 
            TBD 有这两种情况 待处理
            < button oe_stat_button  统计 button
            < separator
          -->

      <template v-else-if="item.tagName === 'hr'">
        <!-- in sheet: hr -->
        <ONode
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <template v-else>in sheet else: {{ item }}</template>
    </template>
  </div>
</template>

<script>
import OMixin from './OMixin'

import { tools } from '@/odoojs'

import OGroup from './OGroup'
import OButtonBox from './OButtonBox'
import OLabel from './OLabel'
import ONode from './ONode'
import ONotebook from './ONotebook'

import OField from './OField'

export default {
  name: 'OSheet',
  components: {
    OButtonBox,
    ONode,
    OGroup,
    OLabel,
    ONotebook,
    OField
  },
  mixins: [OMixin],

  props: {
    parentSpan: { type: Number, default: 24 }
  },

  data() {
    return {}
  },
  computed: {
    sheet_content() {
      const children = this.children_visible
      const nodes = children.filter(node => this.is_sheet_content(node))
      return nodes
    },
    sheet_button_box() {
      const children = this.children_visible
      return children.find(node => this.is_button_box(node))
    },
    sheet_title() {
      const children = this.children_visible
      return children.find(node => this.is_title(node))
    },
    sheet_ribbon() {
      const children = this.children_visible
      return children.filter(node => this.is_ribbon(node))
    },
    sheet_avatar() {
      const children = this.children_visible
      return children.find(node => this.is_avatar(node)) || {}
    },

    avatar_url() {
      const node = this.sheet_avatar
      return tools.avatar_url(node, {
        data_info: this.dataInfo,
        view_info: this.viewInfo
      })
    }
  },

  async created() {},

  mounted() {
    const node = JSON.parse(JSON.stringify(this.node))
    console.log('sheeet,node,', node)
  },

  methods: {
    is_sheet_content(node) {
      return !(
        this.is_avatar(node) ||
        this.is_title(node) ||
        this.is_ribbon(node) ||
        this.is_button_box(node)
      )
    },
    is_button_box(node) {
      // div class="oe_button_box" name="button_box"
      return (
        node.tagName === 'div' &&
        ((node.class || '').includes('oe_button_box') ||
          node.attrs.name === 'button_box')
      )
    },
    is_ribbon(node) {
      // widget name="web_ribbon"
      return node.tagName === 'widget' && node.attrs.name === 'web_ribbon'
    },
    is_avatar(node) {
      // field widget='image' class="oe_avatar"
      return (
        node.tagName === 'field' &&
        ['image_url', 'image'].includes(node.attrs.widget) &&
        (node.class || '').includes('oe_avatar')
      )
    },
    is_title(node) {
      // div class="oe_title oe_inline oe_read_only"
      return node.tagName === 'div' && (node.class || '').includes('oe_title')
    }
  }
}
</script>

<style type="text/css"></style>
