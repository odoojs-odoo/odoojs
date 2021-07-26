<template>
  <div>
    <!-- {{ fullname }} -->
    <h2 v-if="node.attrs.string">{{ node.attrs.string }}</h2>

    <Row v-for="(row, index) in nodeMatrix" :key="index">
      <Col
        :span="span_of_row_col(col)"
        v-for="(col, index2) in row"
        :key="index2"
      >
        <!-- {{ col.tagName }} -->
        <div v-if="col.tagName === 'field'">
          <!-- in GroupOut {{ col.tagName }} -->

          <Form label-position="left" :label-width="108">
            <FormItem :label-for="col.attrs.name">
              <span slot="label">
                <b> {{ col.attrs.string }} </b>
              </span>
              <OField
                v-model="value2"
                :dataDict="dataDict"
                :node="col"
                :editable="editable"
                :modelMethod="modelMethod"
                @on-change="handleOnchange"
              />
            </FormItem>
          </Form>
        </div>

        <!-- <OGroupOut
          v-else-if="col.tagName === 'group' && col.attrs.colspan === '4'"
          v-model="value2"
          :dataDict="dataDict"
          :node="col"
          :editable="editable"
          :modelMethod="modelMethod"
          @on-change="handleOnchange"
        /> -->
        <OGroupInner
          v-else-if="col.tagName === 'group'"
          v-model="value2"
          :dataDict="dataDict"
          :node="col"
          :editable="editable"
          :modelMethod="modelMethod"
          @on-change="handleOnchange"
        />

        <ONode
          v-else-if="col.tagName === 'newline'"
          v-model="value2"
          :dataDict="dataDict"
          :node="col"
          :editable="editable"
          :modelMethod="modelMethod"
          @on-change="handleOnchange"
        />

        <ONode
          v-else-if="col.tagName === 'div'"
          v-model="value2"
          :dataDict="dataDict"
          :node="col"
          :editable="editable"
          :modelMethod="modelMethod"
          @on-change="handleOnchange"
        />

        <!-- <div v-else-if="col.tagName === 'div'">
          <div>in groupOut: ------</div>
          <div>----{{ col }}---</div>
        </div> -->

        <h4 v-else-if="col.tagName === 'separator'">
          {{ col.attrs.string }}
        </h4>

        <div v-else>
          <div>in groupOut: ------</div>
          <div>----{{ col }}---</div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import OMixin from './OMixin'
import ONode from './ONode'

import OGroupInner from './OGroupInner'

import OField from './OField'

// eslint-disable-next-line no-unused-vars
const deep_copy = node => {
  return JSON.parse(JSON.stringify(node))
}

export default {
  name: 'OGroupOut',
  components: { OGroupInner, OField, ONode },
  mixins: [OMixin],

  props: {
    level: { type: Number, default: 0 }
  },

  data() {
    return {}
  },
  computed: {
    nodeMatrix() {
      const nodes = this.children_visible.reduce((acc, cur) => {
        const last_row = acc.length ? acc[acc.length - 1] : []

        if (last_row.length % 2 === 0) {
          acc.push([cur])
        } else {
          const col = last_row[0]

          const parent_span = this.node.attrs.col || '4'
          const my_span = col.attrs.colspan || '2'

          if (parent_span === my_span) {
            acc.push([cur])
          } else {
            last_row.push(cur)
          }
        }

        return acc
      }, [])
      // console.log(deep_copy(nodes))
      return nodes
    }
  },

  async created() {},

  mounted() {},

  methods: {
    span_of_row_col(col) {
      const parent_span = this.node.attrs.col || 4
      const span = (24 / parent_span) * (col.attrs.colspan || 2)
      // console.log(this.node.fullName, this.node.attrs.col, this.node)
      // console.log(col.fullName, col.attrs.colspan, col)
      // console.log(span)

      // console.log(parent_span, span, this.node.attrs.colspan, this.node)

      return span
    }
  }
}
</script>

<style type="text/css"></style>
