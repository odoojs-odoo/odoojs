<template>
  <div class="clearfix position-relative o_form_sheet">
    <Row>
      <Col span="0.5">.</Col>

      <Col span="23">
        <div v-if="debug">
          {{ 'Sheet ok' }}
        </div>

        <Row>
          <Col span="18">
            <span v-if="sheet_title">
              <ONode
                v-model="value2"
                :dataDict="dataDict"
                :node="sheet_title"
                :editable="editable"
                :modelMethod="modelMethod"
                @on-change="handleOnchange"
              />
            </span>
          </Col>
          <Col span="6">
            <span v-for="(ribbon, index) in sheet_ribbon" :key="index">
              {{ ribbon.attrs.title }}
            </span>
            <img v-if="avatar_url" :src="avatar_url" width="50%" />
          </Col>
        </Row>

        <div
          v-if="
            sheet_button_box &&
              childern_filter(sheet_button_box.children).length
          "
        >
          <OButtonBox
            v-model="value2"
            :dataDict="dataDict"
            :node="sheet_button_box"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
          />
        </div>

        <span v-for="(item, index) in sheet_content" :key="index">
          <!-- {{ index }}: {{ item }} -->

          <OGroupOut
            v-if="item.tagName === 'group'"
            v-model="value2"
            :dataDict="dataDict"
            :node="item"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
          />

          <ONotebook
            v-else-if="item.tagName === 'notebook'"
            v-model="value2"
            :dataDict="dataDict"
            :node="item"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
          />

          <OLabel
            v-else-if="item.tagName === 'label'"
            :dataDict="dataDict"
            :node="item"
            :modelMethod="modelMethod"
          />

          <!-- field 有 m2m widget="many2many" 
           stock pick_ids TBD
          -->
          <OField
            v-else-if="item.tagName === 'field'"
            v-model="value2"
            :dataDict="dataDict"
            :node="item"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
          />

          <ONode
            v-else-if="item.tagName === 'div'"
            v-model="value2"
            :dataDict="dataDict"
            :node="item"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
          />

          <!-- 
            TBD 有这两种情况 待处理
            < button oe_stat_button  统计 button
            < separator
          -->

          <div v-else>in sheet: {{ item }}</div>
        </span>
      </Col>

      <Col span="0.5">.</Col>
    </Row>
  </div>
</template>

<script>
/*
1. div class="oe_button_box" name="button_box"
2. widget name="web_ribbon"
3 field widget='image' class="oe_avatar"
4 div class="oe_title oe_inline oe_read_only", 也是 Node
5 group
6 notebook

其他 Node:
1 判断 class 中的 oe_read_only 和 oe_edit_only, 隐藏和显示
1 div, 中嵌套  group
2 button oe_stat_button  统计 button
3 label 就是 纯纯的 label, 无  form 和  formItem
4 field 就是 纯纯 的Input
4 field 有 m2m widget="many2many"
6 separator

*/

/*



  sheet 的 结构

  1 div class="oe_button_box" name="button_box"
  2 widget name="web_ribbon"
  2 field widget='image' class="oe_avatar"
  4 div class="oe_title"
  <div class="oe_title oe_inline oe_read_only">
  button class="oe_stat_button float-right"
  4 div 未知的 div
  div 中嵌入 group
  5 group
  div
  <label for="name" class="oe_edit_only"/>
  <h1><field name="name"/></h1>
  <label for="note"/>
  <field name="note" placeholder="Payment term explanation for the customer..."/>
  <field name="picking_ids" widget="many2many" options="{'not_delete': True}" mode="tree,kanban">

  separator
  div class="oe_edit_only"
  6 notebook
  field

  o2m form sheet 的 结构
  1 group
  2 label
  3 field widget="text"


view_bank_statement_form

butto box
oe title
group
notbook
group class="oe_subtotal_footer oe_right"


view_account_bnk_stmt_cashbox 的 结构
1 field  o2m , 嵌套一个 tree
2 div 嵌套 group



  account.move 的 结构
  1 button_box
  2 web_ribbon
  3 若干隐藏的字段
  4 div -- 这个是 title
  5 group
  6 notebook

res.partner 的 结构
  1 button_box
  2 widget web_ribbon
  2 field image oe_avatar
  3 若干隐藏的字段
  4 div oe_title
  5 group
  6 notebook

*/

import OMixin from './OMixin'

import OField from './OField'
import OGroupOut from './OGroupOut'
import ONotebook from './ONotebook'
import OButtonBox from './OButtonBox'

import ONode from './ONode'
import OLabel from './OLabel'

export default {
  name: 'FormView',
  components: { OField, OGroupOut, ONotebook, ONode, OLabel, OButtonBox },
  mixins: [OMixin],

  props: {},

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
      if (this.model) {
        const fname = node && node.attrs && node.attrs.name
        if (fname) {
          return this.model.avatar_url(fname)
        }
      }
      return undefined
    }
  },

  async created() {},

  mounted() {},

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
        node.attrs.widget === 'image' &&
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
