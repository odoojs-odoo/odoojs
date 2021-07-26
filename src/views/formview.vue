<template>
  <div>
    <h1>{{ view_title }}</h1>

    <Divider />

    <span v-if="!readonly && !hideEdit">
      <span v-if="editable">
        <Button type="primary" @click="handleOnCommit">保存</Button>
        <Button @click="handleOnCancel">放弃</Button>
      </span>

      <span v-else>
        <Button type="primary" @click="handleOnWrite">编辑</Button>
        <!-- <Button @click="handleOnCreate">创建</Button> -->

        <span> &nbsp;.&nbsp;.&nbsp;&nbsp;.&nbsp;</span>
        <Button @click="handleOnUnlink">删除</Button>
      </span>

      <Divider />
    </span>

    <OFormView
      v-model="formData"
      :dataDict="dataDict"
      :node="node"
      :editable="editable"
      :modelMethod="modelMethod"
      @on-change="handleOnchange"
      @button-clicked="handleButtonClicked"
    />

    <FormModal
      :show.sync="showModal"
      :node="modal_node"
      :modelMethod="modalModelMethod"
    />

    <!-- {{ test }}
    {{ typeof test }}

    <Input
      v-model="test"
      style="width:30%"
      type="number"
      :number="true"
      @on-blur="onblur"
    /> -->

    <!-- <Form label-position="left" :label-width="120">
      <FormItem label-for="name">
        <span slot="label"> <h1>label2</h1> </span>

        <Form :rules="ruleValidate">
          <FormItem prop="name">
            <Input
              element-id="name"
              style="width:30%"
              size="large"
              placeholder="name"
              :class="required.name ? 'input-required' : undefined"
            />

            
            <Input style="width:30%" size="small" />
          </FormItem>
        </Form>
      </FormItem>

      <FormItem prop="name2" label-for="name2">
        <span slot="label"> <h1>label2</h1> </span>

        <Form :rules="ruleValidate">
          <FormItem prop="select2">
            <Input
              element-id="name2"
              style="width:30%"
              size="large"
              placeholder="name"
              :class="required.name2 ? 'input-required' : undefined"
            />
            <SelectM2o
              element-id="select2"
              label="sss"
              :limit="7"
              :class="required.select2 ? 'input-required' : undefined"
            />
          </FormItem>
        </Form>
      </FormItem>
    </Form> -->

    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import OFormView from '@/components/OFormView'
import FormModal from '@/components/FormModal'
import formMixin from '@/mixins/formMixin'

export default {
  name: 'FormView2',
  components: { OFormView, FormModal },

  mixins: [formMixin],

  data() {
    return {
      test: null,
      required: {
        name: true,
        select2: true
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    one2many_fields_is_set_by_node() {
      return true
    }
  },

  async created() {
    await this.init()
  },

  methods: {
    onblur(event) {
      const value = event.target.value
      console.log('blur:', value, typeof value)
    },

    async handleOnCommit() {
      const error = e => {
        this.$Message.error(e.data.message)
      }
      this.handleCommit(null, error)
    },

    handleOnUnlink() {
      console.log(' handleOnUnlink ')
      //
      this.$Modal.confirm({
        title: '确认删除',
        content: '<p>要删除么?</p><p>点击确认或取消</p>',
        onOk: async () => {
          const success = () => {
            this.goto_treeform()
          }
          const error = e => {
            this.$Message.error(e.data.message)
          }

          await this.handleUnlink(success, error)
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel')
        }
      })
    }
  }
}
</script>

<style type="text/css"></style>
