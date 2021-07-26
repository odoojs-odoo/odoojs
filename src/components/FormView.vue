<template>
  <div class="o_form_view">
    <div class="o_form_sheet_bg">
      <slot name="statusbar"> </slot>
      <div class="clearfix position-relative o_form_sheet">
        <Row>
          <Col span="1">.</Col>
          <Col span="16">
            <slot name="sheet_title">9</slot>
          </Col>
          <Col span="6"> <slot name="sheet_avatar"> </slot></Col>
          <Col span="1">.</Col>
        </Row>

        <Row>
          <Col span="1">.</Col>
          <Col span="22"> <slot name="sheet"> </slot></Col>
          <Col span="1">.</Col>
        </Row>

        <Row>
          <Col span="1">.</Col>
          <Col span="22"> <slot name="sheet_notebook"> </slot></Col>
          <Col span="1">.</Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormView',
  components: {},
  mixins: [],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  methods: {}
}
</script>

<style type="text/css"></style>
