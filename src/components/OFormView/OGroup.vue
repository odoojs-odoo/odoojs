<template>
  <div>
    <h2 v-if="node.attrs.string">{{ node.attrs.string }}</h2>
    <!-- parentSpan: {{ parentSpan }} -->
    <template v-for="(row, index) in nodeMatrix">
      <a-row :key="index">
        <template v-for="(col, index2) in row">
          <a-col :span="col.span" :key="index2">
            <template v-if="col.tagName === 'group'">
              <!-- L{{ parentSpan }},R{{ index }} C{{ index2 }},S{{ col.span }},
             -->
              <OGroup
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: col }"
                :parent-span="col.span"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template v-else-if="col.tagName === 'field' && col.attrs.nolabel">
              <!-- {{ col.tagName }} -->
              <!-- {{ col.fullName }} -->

              <!-- fld nolabel: L{{ parentSpan }},R{{ index }} C{{ index2 }},S{{
                col.span
              }},
              {{ col.tagName }} -->
              <!-- Group Out 中 出现 -->
              <OField
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: col }"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template v-else-if="col.tagName === 'field'">
              <!-- field: L{{ parentSpan }},R{{ index }} C{{ index2 }},S{{
                col.span
              }},
              {{ col.tagName }} -->
              <!-- Group Out/IN 中 出现 -->

              <template v-if="col.attrs.widget === 'tax-group-custom-field'">
                widget: tax-group-custom-field
                <!-- {{ col.attrs.widget }} {{ dataDict[col.attrs.name] }} -->
              </template>

              <template v-else-if="col.attrs.widget === 'payment'">
                widget: payment
                <!-- {{ col.attrs.widget }}
                {{ dataDict[col.attrs.name] }} -->

                <!-- <OWidgetPayment
                  :node="col"
                  :editable="editable"
                  :method-call="methodCall"
                  @on-event="handleOnEvent"
                /> -->
              </template>

              <template v-else>
                <OFormItem
                  :editable="editable"
                  :loading="loading"
                  :data-info="dataInfo"
                  :view-info="{ ...viewInfo, node: col }"
                  :method-call="methodCall"
                  @on-event="handleOnEvent"
                />
              </template>
            </template>

            <template v-else-if="col.tagName === 'fieldItem'">
              <!-- fieldItem: L{{ parentSpan }},R{{ index }} C{{ index2 }},S{{
                col.span
              }},
               -->
              <!-- Group IN 中 出现 -->
              <OFormItem
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: col.field }"
                :label-node="col.label"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template v-else-if="col.tagName === 'newline'">
              <!-- div: L{{ parentSpan }},R{{ index }} C{{ index2 }},S{{ col.span }},
              {{ col.tagName }} -->

              <!-- Group Out 中 出现 -->

              <ONode
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: col }"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template v-else-if="col.tagName === 'div'">
              <!-- div: L{{ parentSpan }},R{{ index }} C{{ index2 }},S{{ col.span }},
              {{ col.tagName }} -->

              <!-- Group Out/IN 中 出现 -->

              <!-- Group IN  这里加上  one row 控制 -->
              <ONode
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: col }"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template v-else-if="col.tagName === 'p'">
              <ONode
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: col }"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template v-else-if="col.tagName === 'separator'">
              <!-- Group Out 中 出现 -->
              <h4>{{ col.attrs.string }}</h4>
            </template>

            <template v-else-if="col.tagName === 'button'">
              <!-- Group IN 中 出现 -->
              <OButton
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: col }"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template v-else>
              <div>
                in group else: L{{ parentSpan }},R{{ index }} C{{ index2 }}, S{{
                  col.span
                }},
              </div>
              <div>
                {{ col.tagName }} {{ col.fullName }}
                {{ [col.class, col.attrs.widget] }}
              </div>
            </template>
          </a-col>
        </template>
      </a-row>
    </template>
  </div>
</template>

<script>
import OMixin from './OMixin'
import OFormItem from './OFormItem.vue'
import OField from './OField'
import ONode from './ONode'

// import OLabel from './OLabel'

import OButton from './OButton'

// import OWidgetPayment from './OWidgetPayment'

export default {
  name: 'OGroup',
  components: { OFormItem, OField, ONode, OButton },
  mixins: [OMixin],
  props: {
    parentSpan: { type: Number, default: 24 }
  },
  data() {
    return {}
  },
  computed: {
    nodeMatrix() {
      const is_label = col => {
        const label1 =
          col.tagName === 'label' || (col.class || '').includes('o_td_label')
        const label2 =
          col.tagName === 'div' &&
          col.children &&
          col.children.length === 1 &&
          col.children[0].tagName === 'label'
        return label1 || label2
      }

      const get_nodes = nds => {
        const old_nds = [...nds]
        const new_nds = []
        let nd = old_nds.shift()
        while (nd) {
          if (is_label(nd)) {
            const next_nd = old_nds.shift()
            if (next_nd) {
              new_nds.push({
                tagName: 'fieldItem',
                attrs: {},
                label: nd,
                field: next_nd
              })
            }
          } else if (nd.tagName === 'field') {
            // new_nds.push({ tagName: 'fieldItem', attrs: {}, field: nd })
            new_nds.push(nd)
          } else {
            new_nds.push(nd)
          }
          nd = old_nds.shift()
        }

        return new_nds
      }

      const nodes = get_nodes([...this.children_visible])
      const nodes1 = nodes.map(item => {
        const span = this._get_span(item)
        return { span, ...item }
      })

      const nodes2 = nodes1.reduce((acc, cur) => {
        if (!acc.length) acc.push([])
        const last_row = acc[acc.length - 1]
        const last_span = last_row.reduce((acc, cur) => acc + cur.span, 0)
        if (last_span + cur.span <= 24) {
          last_row.push(cur)
        } else {
          acc.push([cur])
        }

        return acc
      }, [])

      // // eslint-disable-next-line no-unused-vars
      // const deep_copy = node => {
      //   return JSON.parse(JSON.stringify(node))
      // }

      // console.log('Group Nodes', deep_copy(nodes1), deep_copy(nodes2))

      return nodes2
    }
  },
  watch: {},

  async created() {},
  mounted() {
    // const cp = item => JSON.parse(JSON.stringify(item))
    // const node = cp(this.node)
    // console.log('Group,node,', this.parentSpan, node)
    // console.log('Group,node2,', node.attrs.col, node.attrs.colspan)
    // console.log('Group,nodeMatrix,', cp(this.nodeMatrix))
  },
  methods: {
    _get_span(item) {
      // const cp = item => JSON.parse(JSON.stringify(item))

      if (
        item.tagName === 'fieldItem' &&
        item.field.tagName === 'field' &&
        item.field.attrs.widget === 'many2many_tags'
      ) {
        // 国家/地区群组 的 国家 ids
        return 24
      } else {
        const col = this.node.attrs.col || 4
        const colspan = item.attrs.colspan || 2 * (24 / this.parentSpan)
        const span = (24 / col) * colspan

        // if (item.tagName === 'div') {
        //   console.log('Group,_get_span,', item.fullName, span, cp(item))
        // }
        return span
      }
    }
  }
}
</script>

<style scoped></style>
