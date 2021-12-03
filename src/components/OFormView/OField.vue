<template>
  <!-- fld: {{ fullname }}

    {{ node.attrs.name }} -->

  <span v-if="!invisible">
    <!-- fld2 {{ node.attrs.name }}
    {{ [render] }} -->
    <span v-if="render.tag === 'one2many'">
      <!-- fld2 {{ node.attrs.name }}
     -->
      <!-- {{ [render] }} -->
      <!-- {{ one2many_viewType }} -->

      <span
        v-if="render.mode.includes('kanban') || render.mode.includes('tree')"
      >
        <div align="left" v-if="editable">
          <a-button size="small" @click="handleOnCreateO2m">
            创建
          </a-button>
        </div>

        <!-- -->
        <div align="right" v-if="render.mode.length > 1">
          <a-radio-group
            v-model="one2many_viewType"
            :default-value="render.mode[0]"
            button-style="solid"
            size="small"
            @change="handleChangeO2mViewType"
          >
            <a-radio-button value="kanban">
              <a-icon type="appstore" theme="filled" />
            </a-radio-button>
            <a-radio-button value="tree">
              <a-icon type="unordered-list" />
            </a-radio-button>
          </a-radio-group>
        </div>
      </span>

      <span v-show="one2many_viewType === 'tree'">
        <!-- tree. {{ fname }}.ids = {{ dataDict[fname] }} -->
        <!--  -->

        <OSubTree
          ref="subTree"
          :loading="loading"
          :editable="editable"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: node }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </span>

      <span v-show="one2many_viewType === 'kanban'">
        <!-- kanban. {{ fname }}.ids = {{ dataDict[fname] }} -->
        <!-- -->
        <OSubKanban
          ref="subKanban"
          :loading="loading"
          :editable="editable"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: node }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </span>
    </span>

    <span v-else-if="render.tag === 'many2many'">
      many2many: {{ node.attrs.name }}
      {{ [render] }}
    </span>

    <span v-else-if="!editable || readonly">
      <!-- readonly: {{ [readonly] }} edit: {{ editable }} -->

      <span
        v-if="!(node.class && node.class.includes('oe_edit_only'))"
        :class="node.class"
        :name="fname"
      >
        <span v-if="node.attrs.widget === 'payment'">
          TBD: payment: {{ value_readonly }}
        </span>
        <span
          v-else-if="
            render.tag === 'select2' && render.widget === 'many2many_tags'
          "
        >
          {{ dataDict[fname] }}
          <a-tag
            v-for="one in dataDict[`${fname}__record`] || []"
            :key="one[0]"
          >
            {{ one[1] }}
          </a-tag>
        </span>

        <span v-else> {{ value_readonly }} </span>
      </span>

      <!-- only debug -->
      <!-- <span v-else> editonly:{{ fname }}:{{ dataDict[fname] }} </span> -->
    </span>

    <template v-else>
      <OFieldInput
        :dataDict="dataDict"
        :loading="loading"
        :fname="fname"
        :required="required"
        :render="render"
        :placeholder="node.attrs.placeholder"
        :selection-options="selectionOptions"
        :optionsMethod="selectOptionsMethod"
        @on-change="onchange"
      />
    </template>
  </span>

  <span v-else>
    <div>{{ fname }}:</div>
    <div>{{ value_readonly }}</div>
  </span>
</template>

<script>
import OMixin from './OMixin'
import { tools } from '@/odoojs'

import OFieldInput from '@/components/OFieldInput/index.vue'
import OSubTree from '@/components/OView/OSubTree.vue'
import OSubKanban from '@/components/OView/OSubKanban.vue'

const check_is_rename = ftype => {
  return ['many2one', 'selection'].includes(ftype)
}

export default {
  name: 'OField',
  components: { OFieldInput, OSubTree, OSubKanban },
  mixins: [OMixin],

  props: {},

  data() {
    return {
      one2many_viewType: 'tree',
      kanbanKeyIndex: 0,

      select_options: {},
      selectionOptions: []
    }
  },
  computed: {
    fname() {
      return this.node.attrs.name
    },
    readonly() {
      return tools.node_readonly(this.node, {
        data_info: this.dataInfo,
        view_info: this.viewInfo
      })
    },

    invisible() {
      return this.get_invisible(this.node)
    },

    required() {
      return tools.node_required(this.node, {
        data_info: this.dataInfo,
        view_info: this.viewInfo
      })
    },

    value_readonly() {
      const node = this.node
      const fname = node.attrs.name

      const meta = this.viewInfo.fields[fname] || {}

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

    render() {
      const node = this.node
      if (node.render) {
        // {
        //   tag: input, type: 'number'
        // }
        return { ...node.render }
      }

      const fname = node.attrs.name

      const meta = this.viewInfo.fields[fname] || {}
      const type = meta.type

      if (['char'].includes(type)) {
        return { tag: 'input', type: 'char' }
      } else if (['text'].includes(type)) {
        return { tag: 'input', type: 'text' }
      } else if (['float'].includes(type)) {
        return { tag: 'number', odoo_type: type }
      } else if (['monetary'].includes(type)) {
        return { tag: 'number', odoo_type: type }
      } else if (['date', 'datetime'].includes(type)) {
        return { tag: 'date', type }
      } else if (['boolean'].includes(type)) {
        return { tag: 'boolean' }
      } else if (['binary'].includes(type)) {
        return { tag: 'img' }
      } else if (['selection'].includes(type)) {
        // console.log(fname, node.attrs.widget)
        return { tag: 'selection', widget: node.attrs.widget }
      } else if (['many2one'].includes(type)) {
        // console.log(fname, node.attrs.widget)
        return { tag: 'select', widget: node.attrs.widget }
      } else if (['one2many'].includes(type)) {
        return {
          tag: 'one2many',
          mode: (this.node.attrs.mode || 'tree').split(',')
        }
      } else if (['many2many'].includes(type)) {
        // field 有 m2m widget="many2many"
        // stock pick_ids TBD

        if (node.attrs.widget === 'many2many_tags') {
          // widget: "many2many_tags"
          return { tag: 'select2', widget: node.attrs.widget }
        } else {
          return { tag: 'many2many', widget: node.attrs.widget }
        }
      }

      //

      return { tag: 'todo', odoo_type: type }
    }
  },

  watch: {},

  async created() {
    // console.log(' created', this.fname)
  },

  async mounted() {
    // console.log(' mounted', this.fname)
    this.handleOnInitFname()
  },

  methods: {
    async handleOnInitFname() {
      const { tag, widget } = this.render

      // console.log('1,', this.render, this.fname, this.node)
      if (tag === 'select2' && widget === 'many2many_tags') {
        // console.log('viewinfo many2many_tags:', this.fname)
        this.$emit('on-event', 'relation-browse', {
          type: 'many2many',
          widget: 'many2many_tags',
          field: this.fname,
          res_model: this.res_model,
          node: this.node
        })
      } else if (tag === 'one2many') {
        console.log('viewinfo one2many:', this.fname)
        this.one2many_viewType = this.render.mode[0]

        this.$emit('on-event', 'relation-browse', {
          type: 'one2many',
          field: this.fname,
          res_model: this.res_model,
          node: this.node
        })
      } else if (tag === 'selection' && widget === 'radio') {
        // console.log('viewinfo radio:', this.fname)
        // const res = this.model.get_selection(this.fname)
        // // console.log(this.fname, res)
        // this.selectionOptions = res
      } else {
        // console.log('viewinfo else:', this.render, this.fname, this.node)
      }
    },

    onchange(value, text) {
      console.log('handleOnchange', [this.fname, value, text])
      // this.$emit('on-change', this.fname, value, text)
      this.$emit('on-event', 'on-change', { field: this.fname, value, text })
    },

    handleChangeO2mViewType(e) {
      const viewType = e.target.value
      console.log(viewType, this.one2many_viewType)
    },

    handleOnCreateO2m() {
      if (this.one2many_viewType === 'tree') {
        console.log('createO2m', this.one2many_viewType, this.$refs.subTree)
        this.$refs.subTree.handleOnCreate()
      } else if (this.one2many_viewType === 'kanban') {
        console.log('createO2m', this.one2many_viewType, this.$refs.subKanban)
        this.$refs.subKanban.handleOnCreate()
      }
    },

    selectOptionsMethod(payload = {}) {
      const field = this.fname

      // const options2 = this.select_options[field]
      // if (options2) {
      //   return options2
      // }

      return this.get_options({ field, ...payload })
    },

    get_options(payload = {}) {
      const { field, query, limit } = payload
      if (this.node.attrs.widget === 'radio') {
        const kwargs = { field, query: '', limit: 0, node: this.node }
        return this.methodCall('get_selection', kwargs)
      } else {
        const kwargs = { field, query, limit, node: this.node }
        return this.methodCall('get_selection', kwargs)
      }
    }

    // async get_options(payload = {}) {
    //   // this.methodCall('get_options', payload,)
    //   console.log('get_options ', payload, this.node.attrs.widget, this.node)
    //   const { field, query, limit } = payload
    //   // console.log(' get_options, ', field, this.model.select_options)
    //   if (this.node.attrs.widget === 'radio') {
    //     const kwargs = { field, query: '', limit: 0, node: this.node }
    //     // const options = await this.model.get_selection(field, kwargs)
    //     const options = await this.methodCall('get_selection', kwargs)
    //     // console.log(options)
    //     this.select_options[field] = [...options]
    //     return options
    //   } else {
    //     const kwargs = { field, query, limit, node: this.node }
    //     // const options = await this.model.get_selection(field, kwargs)
    //     console.log('get_options 1', field, kwargs)
    //     const options = await this.methodCall('get_selection', kwargs)
    //     return options
    //   }
    // }
  }
}
</script>

<style type="text/css"></style>
