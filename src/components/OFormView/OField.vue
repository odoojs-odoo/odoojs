<template>
  <span>
    <!-- {{ fullname }} -->

    <span v-if="!invisible">
      <span v-if="render.tag.includes('tree')">
        <!-- tree. {{ fname }}.ids = {{ dataDict[fname] }} -->
        <!-- {{ o2m_columns }} -->
        <OTreeO2m
          :editable="editable"
          :ref="`ref.${fname}`"
          :parent-field="fname"
          :data="dataDict[`${fname}__record`] || []"
          :columns="o2m_columns"
          :modelMethod="get_o2m_model"
        />
      </span>
      <span v-else-if="render.tag === 'kanban'">
        <!--  kanban. {{ fname }}.ids = {{ dataDict[fname] }} -->

        <OKanbanO2m
          :editable="editable"
          :ref="`ref.${fname}`"
          :parent-field="fname"
          :data="dataDict[`${fname}__record`] || []"
          :modelMethod="get_o2m_model"
        />
      </span>

      <span v-else-if="!editable">
        <span
          v-if="!(node.class && node.class.includes('oe_edit_only'))"
          :class="node.class"
          :name="fname"
        >
          <span v-if="node.attrs.widget === 'payment'">
            payment: {{ value_readonly }}
          </span>

          <span v-else>
            {{ value_readonly }}
          </span>
        </span>

        <!-- only debug -->
        <!-- <span v-else> editonly:{{ fname }}:{{ dataDict[fname] }} </span> -->
      </span>

      <span v-else>
        <Form :model="value2" :rules="rules">
          <!-- {{ value2[fname] }} -->
          <!-- {{ rules }} -->
          <FormItem :prop="fname">
            <span v-if="readonly">
              <!-- readonly:{{ fname }}: -->
              {{ dataDict[fname] }}
            </span>

            <OInput
              v-else
              v-model="value2[fname]"
              :fname="fname"
              :value-string="value2[`${fname}__name`]"
              :render="render"
              :placeholder="node.attrs.placeholder"
              :optionsMethod="
                ({ query, limit }) =>
                  selectOptionsMethod({ field: fname, query, limit })
              "
              @on-change="onchange"
            />
          </FormItem>
        </Form>
      </span>
    </span>

    <span v-else>
      hide,
      <span v-if="!fullname.startsWith('.form.sheet.group.group.')">
        {{ fullname }}
      </span>
      <span v-else> {{ fullname.slice(24, fullname.length) }}</span>
      {{ fname }}
    </span>
  </span>
</template>

<script>
import OMixin from './OMixin'

import OTreeO2m from './OTreeO2m'
import OKanbanO2m from './OKanbanO2m'

import OInput from './OInput.vue'

const check_is_rename = ftype => {
  return ['many2one', 'selection'].includes(ftype)
}

export default {
  name: 'OField',
  components: { OTreeO2m, OKanbanO2m, OInput },
  mixins: [OMixin],

  props: {},

  data() {
    return {
      select_options: {}
    }
  },
  computed: {
    fname() {
      return this.node.attrs.name
    },
    readonly() {
      return this.get_readonly(this.node)
    },
    invisible() {
      return this.get_invisible(this.node)
    },

    required() {
      return this.get_required(this.node)
    },

    render() {
      const node = this.node
      if (node.render) {
        // {
        //   tag: input, type: 'number'
        // }
        return { ...node.render }
      }

      if (!this.model) {
        return {}
      }

      const fname = node.attrs.name
      const meta = this.model.fields[fname]
      const type = meta.type

      if (type === 'monetary') {
        return { tag: 'input', type: 'number' }
      } else if (['one2many'].includes(type)) {
        return { tag: this.node.attrs.mode || 'tree' }
      } else if (['many2one', 'selection'].includes(type)) {
        // console.log(fname, node.attrs.widget)
        return { tag: 'select', widget: node.attrs.widget }
      } else if (['date'].includes(type)) {
        return { tag: 'date' }
      } else if (['boolean'].includes(type)) {
        return { tag: 'boolean' }
      } else if (['monetary'].includes(type)) {
        return { tag: 'input', type: 'number' }
      } else if (['many2many'].includes(type)) {
        // field 有 m2m widget="many2many"
        // stock pick_ids TBD
        return { tag: 'select2' }
      }
      return { tag: 'input', type: 'text' }
    },

    value_readonly() {
      const node = this.node
      const fname = node.attrs.name
      // console.log(fname, node, this.fields[fname])

      if (!this.model) {
        return undefined
      }

      const meta = this.model.fields[fname]

      if (check_is_rename(meta.type)) {
        return this.dataDict[`${fname}__name`]
      }

      const val = this.dataDict[fname]

      if (meta.type === 'boolean') {
        const render = node.render || {}
        return val ? render.true_label || '是' : render.false_label || '否'
      } else {
        return val
      }
    },

    rules() {
      if (!this.editable) {
        return {}
      }

      if (!this.model) {
        return {}
      }

      const required = this.model.get_required(this.node, this.dataDict)

      if (!required) {
        return {}
      }

      const message = `${this.node.attrs.string} 不能为空`
      const trigger = this.render.tag === 'select' ? 'change' : 'blur'
      // const rule = [{ required: true, message, trigger }]

      const validator = (rule, value, callback) => {
        // console.log('rule, -- : ', this.fname, rule, value)
        if (!value) {
          callback(new Error(message))
        } else {
          callback()
        }
      }

      const rule = [{ validator, trigger }]

      // const rule = [{ required: true, message, trigger: 'blur' }]
      // if (this.render.tag === 'select') {
      //   rule.push({ required: true, message, trigger: 'change' })
      // }

      return { [this.fname]: rule }
    },

    o2m_columns() {
      const model = this.get_o2m_model()
      if (!model) {
        return []
      }
      const cols = model.view_columns
      // console.log(JSON.parse(JSON.stringify(cols)))

      const cols2 = cols.filter(
        item =>
          !item.node.attrs.invisible && item.node.attrs.optional !== 'hide'
        // !item.node.attrs.invisible
      )
      // console.log(JSON.parse(JSON.stringify(cols2)))
      return cols2
    }
  },

  async created() {},

  mounted() {},

  methods: {
    onchange(value, text) {
      console.log('handleOnchange', [this.fname, value, text])
      this.$emit('on-change', this.fname, value, text)
    },

    get_readonly(item) {
      if (this.model) {
        const readonly = this.model.get_readonly(item, this.dataDict)
        // console.log(invisible, this.fullname, item)
        return readonly
      } else {
        return true
      }
    },

    get_required(item) {
      if (this.model) {
        const required = this.model.get_required(item, this.dataDict)
        // console.log(invisible, this.fullname, item)
        return required
      } else {
        return false
      }
    },

    selectOptionsMethod(payload) {
      // console.log(payload)
      const { field } = payload
      const options2 = this.select_options[field]
      if (options2) {
        return options2
      }

      const options3 = this.model.select_options[field]
      if (options3) {
        this.select_options[field] = [...options3]
        return options3
      }

      return this.get_options(payload)
    },

    async get_options(payload) {
      const { field, query, limit } = payload
      // console.log(' get_options, ', field, this.model.select_options)

      if (this.node.attrs.widget === 'radio') {
        const kwargs = { query: '', limit: 0, node: this.node }
        const options = await this.model.get_selection(field, kwargs)
        // console.log(options)
        this.select_options[field] = [...options]
        return options
      } else {
        const kwargs = { query, limit, node: this.node }
        const options = await this.model.get_selection(field, kwargs)
        return options
      }
    },

    get_o2m_model() {
      if (!this.modelMethod) {
        return null
      }

      const model = this.modelMethod()
      if (!model) {
        return null
      }

      const fname = this.node.attrs.name
      const meta = model.fields[fname]

      // console.log(fname, meta)

      if (meta.type !== 'one2many') {
        return null
      }
      return model.get_subviewmodel(fname, { node: this.node })
    }
  }
}
</script>

<style type="text/css"></style>
