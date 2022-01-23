<template>
  <div class="o_kanban_record" @click="handleOnRowClick2">
    <!-- OKBProjectTasks -->
    <!-- 可点击 oe_kanban_global_click
     TODO: 设置样式, 显示小手
     -->
    <ONode
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node, dropdown_menu }"
      @on-event="handleOnEvent"
    />

    <a-modal v-model="visible" title="设置一张封面图像">
      <div>
        <a-radio-group v-model="selected_id" @change="onSelectChange">
          <template v-for="attach in attachment">
            <a-radio-button :value="attach.id" :key="attach.id">
              <span class="o_kanban_cover_image">
                <img
                  :src="image_url_get(attach)"
                  alt="附件"
                  :style="img_style"
                  :data-id="attach.id"
                  :data-name="attach.name"
                />
              </span>
            </a-radio-button>
          </template>
        </a-radio-group>
      </div>

      <template slot="footer">
        <a-button
          type="primary"
          @click="handleSelect"
          :disabled="!selected_id ? true : undefined"
        >
          选择
        </a-button>
        <a-button @click="handleUpload"> 上传并设置 </a-button>
        <a-button v-if="current_value_pair[0]" @click="handleRemove">
          移除封面图像
        </a-button>
        <a-button @click="handleCancel"> 丢弃 </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import api from '@/odooapi'
// import { try_call } from '@/odooapi/tools'

import KBNodeMixin from './KBNodeMixin'
import ONode from '@/components/ONode/ONode'
import { Color_Nodes } from './tools'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

function upload(callback) {
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = async () => {
    const files = input.files
    callback(files)
  }
}

export default {
  name: 'OKBProjectTasks',
  components: { ONode },

  mixins: [KBNodeMixin],

  props: {},

  data() {
    return {
      visible: false,
      attachment: [],

      fname: '',
      selected_id: 0,
      current_value_pair: [0, '']
    }
  },
  computed: {
    dropdown_menu() {
      const menus = this.dropdown_menu_node.children || []
      const menus2 = cp(menus).reduce((acc, item) => {
        if ((item.attrs || {}).class.includes('oe_kanban_colorpicker')) {
          const item2 = {
            ...item,
            isParent: true,
            children: Color_Nodes
          }
          acc.push(item2)
        } else {
          acc.push(item)
        }

        return acc
      }, [])

      return menus2
    },
    img_style() {
      return 'width: 10%'
    }
  },

  watch: {},
  async created() {},
  async mounted() {},

  methods: {
    // for debug.
    // async handleOnRowClick2() {
    //   console.log('handleOnRowClick to emit')
    //   console.log(cp(this.view_node))
    //   console.log('node_raw', cp(this.node_raw))
    //   console.log('dropdown_menu_node', cp(this.dropdown_menu_node))
    //   this.$emit('on-row-click')
    // },

    onSelectChange() {
      // console.log(this.selected_id)
    },

    image_url_get(attach) {
      // console.log(attach)
      const baseURL = process.env.VUE_APP_BASE_API
      const baseURL2 = '/web/image'
      return `${baseURL}${baseURL2}/${attach.id}?unique=1`
    },

    async handleSelect() {
      const vals = { [this.fname]: [this.selected_id, ''] }
      // console.log('handleSelect ', vals)
      await this.handleOnwrite(vals)
      this.visible = false
    },

    async handleRemove() {
      // console.log('handleRemove ')
      const vals = { [this.fname]: false }
      await this.handleOnwrite(vals)
      this.visible = false
    },

    async handleUpload() {
      // console.log('handleUpload ')
      upload(async ufile => {
        const res_model = this.viewInfo.action.res_model
        const res_id = this.dataInfo.record.id
        const kw = { model: res_model, id: res_id, ufile }
        const attachs = await api.web.binary.upload_attachment(kw)
        const attach_id = attachs[0].id
        const vals = { [this.fname]: [attach_id, ''] }
        await this.handleOnwrite(vals)
        this.visible = false
      })
    },

    handleCancel() {
      this.visible = false
      this.selected_id = 0
    },

    async handleButtonClicked_set_cover(node) {
      // console.log('handleButtonClicked_set_cover1')

      const attach_get = async () => {
        const res_model = this.viewInfo.action.res_model
        const res_id = this.dataInfo.record.id
        const domain = [
          ['res_model', '=', res_model],
          ['res_id', '=', res_id],
          ['mimetype', 'ilike', 'image']
        ]
        const fields = ['id', 'name']
        return api.env.model('ir.attachment').search_read({
          domain,
          fields
        })
      }

      const attachment = await attach_get()
      this.attachment = attachment

      const field = node.attrs['data-field']
      this.fname = field

      const current_value_pair = this.dataInfo.record[field] || [0, '']
      this.current_value_pair = current_value_pair

      this.visible = true
    }
  }
}
</script>

<style scoped></style>
