<template>
  <div>
    <!-- {{ fullname }}
    {{ value2 }} -->
    <h2 v-if="node.attrs.string">{{ node.attrs.string }}</h2>

    <span v-for="(row, index) in nodeMatrix" :key="index">
      <span v-if="row.length === 2">
        <!-- {{ row }} -->
        <Form label-position="left" :label-width="108">
          <FormItem :label-for="get_fname_by_label_node(row[0])">
            <span slot="label">
              <OLabel
                v-if="row[0].tagName === 'label'"
                v-model="value2"
                :dataDict="dataDict"
                :node="row[0]"
                :editable="editable"
                :modelMethod="modelMethod"
                @on-change="handleOnchange"
              />

              <ONode
                v-else
                v-model="value2"
                :dataDict="dataDict"
                :node="row[0]"
                :editable="editable"
                :modelMethod="modelMethod"
                @on-change="handleOnchange"
              />
            </span>
            <span>
              <div v-if="row[1].tagName === 'field'">
                <!-- 2val: {{ row[1].attrs.name }}, {{ value2[row[1].attrs.name] }} -->
                <OField
                  v-model="value2"
                  :dataDict="dataDict"
                  :node="row[1]"
                  :editable="editable"
                  :modelMethod="modelMethod"
                  @on-change="handleOnchange"
                />
              </div>

              <!-- 这里加上  one row 控制 -->
              <span v-else-if="row[1].tagName === 'div'">
                <!-- 3val: {{ get_fname_by_label_node(row[0]) }}, -->
                <!-- {{ value2[get_fname_by_label_node(row[0])] }} -->
                <ONode
                  v-model="value2"
                  :dataDict="dataDict"
                  :node="row[1]"
                  :editable="editable"
                  :modelMethod="modelMethod"
                  @on-change="handleOnchange"
                />
              </span>

              <div v-else>in1 {{ fullname }}, {{ row[1].tagName }}</div>
            </span>
          </FormItem>
        </Form>
      </span>

      <div v-else>
        <div v-if="row[0].tagName === 'field'">
          <span v-if="is_one2many(row[0])">
            <OField
              v-model="value2"
              :dataDict="dataDict"
              :node="row[0]"
              :editable="editable"
              :modelMethod="modelMethod"
              @on-change="handleOnchange"
            />
          </span>
          <span v-else-if="row[0].attrs.widget === 'tax-group-custom-field'">
            <!-- {{ row[0].attrs.widget }} {{ dataDict[row[0].attrs.name] }} -->
          </span>
          <span v-else-if="row[0].attrs.widget === 'payment'">
            <!-- {{ row[0].attrs.widget }} -->
            <!-- {{ dataDict[row[0].attrs.name] }} -->

            <OWidgetPayment
              v-model="value2"
              :dataDict="dataDict"
              :node="row[0]"
              :editable="editable"
              :modelMethod="modelMethod"
              @on-change="handleOnchange"
            />
          </span>

          <Form v-else label-position="left" :label-width="108">
            <FormItem :label-for="row[0].attrs.name">
              <span slot="label">
                <span v-if="get_invisible(row[0])"> hide </span>
                <b> {{ row[0].attrs.string }} </b>
              </span>
              <span>
                <OField
                  v-model="value2"
                  :dataDict="dataDict"
                  :node="row[0]"
                  :editable="editable"
                  :modelMethod="modelMethod"
                  @on-change="handleOnchange"
                />
              </span>
            </FormItem>
          </Form>
        </div>
        <div v-else-if="row[0].tagName === 'button'">
          <OButton
            :dataDict="dataDict"
            :node="row[0]"
            :modelMethod="modelMethod"
          />
        </div>

        <ONode
          v-else-if="row[0].tagName === 'newline'"
          v-model="value2"
          :dataDict="dataDict"
          :node="row[0]"
          :editable="editable"
          :modelMethod="modelMethod"
          @on-change="handleOnchange"
        />

        <div v-else>in2 {{ fullname }}, {{ row[0].tagName }}</div>
      </div>
    </span>
  </div>
</template>

<script>
import OMixin from './OMixin'
import ONode from './ONode'
import OField from './OField'

import OLabel from './OLabel'

import OButton from './OButton'

import OWidgetPayment from './OWidgetPayment'

export default {
  name: 'GroupInner',
  components: { ONode, OLabel, OField, OButton, OWidgetPayment },
  mixins: [OMixin],

  props: {},

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

          const is_label = col => {
            // console.log(col.fullName, col)
            const label1 =
              col.tagName === 'label' ||
              (col.class || '').includes('o_td_label')

            const label2 =
              col.tagName === 'div' &&
              col.children &&
              col.children.length === 1 &&
              col.children[0].tagName === 'label'

            return label1 || label2
          }

          //
          if (col.attrs.colspan === '4') {
            acc.push([cur])
          } else if (col.tagName === 'field') {
            acc.push([cur])
          } else if (is_label(col)) {
            last_row.push(cur)
          } else {
            // last_row.push(cur)
            acc.push([cur])
          }
        }

        return acc
      }, [])

      // const deep_copy = node => {
      //   return JSON.parse(JSON.stringify(node))
      // }
      // console.log(deep_copy(nodes))
      // console.log(deep_copy(this.dataDict))

      return nodes
    }
  },

  async created() {},

  mounted() {},

  methods: {
    is_one2many(node) {
      const model = this.model
      if (!model) {
        return false
      }

      const fname = node.attrs.name
      const meta = model.fields[fname]
      return meta.type === 'one2many'
    },

    get_fname_by_label_node(label_node) {
      // console.log(label_node)
      const fn = node => {
        if (node.tagName === 'label') {
          return node.attrs.for
        }

        const children = node.children || []

        for (const item in children) {
          const res = fn(children[item])
          // console.log('inner', item, res)
          if (res) {
            return res
          }
        }

        return undefined
      }

      const res = fn(label_node)

      // console.log('out', label_node, res)
      return res
    }
  }
}
</script>

<style type="text/css"></style>
