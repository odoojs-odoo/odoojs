<template>
  <div>
    <div>Home page</div>
    <div>
      <a-form>
        <a-form-item>
          <span slot="label">
            <label for="nnnn" @click="handelClickLabel">
              <b> label</b>
            </label>
          </span>
          <!---->
          <a-select
            ref="refSelect"
            :open.sync="open"
            default-value="lucy"
            style="width: 120px"
            show-search
            @dropdownVisibleChange="dropdownVisibleChange"
          >
            <a-select-option value="lucy"> Lucy </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>

    <div>-----</div>
    <!-- <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item id="name2">
        <span slot="label">
          asdasdada
        </span>
        <div>
          <a-input
            id="name2"
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </div>
      </a-form-item>
    </a-form> -->

    <a-button type="primary" @click="onLogout">注销再登录</a-button>

    <div>odoo version: {{ api.version_info.server_version }}</div>
    <div>odoo version: {{ version_info.server_version }}</div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Home',
  components: {},
  mixins: [],

  data() {
    return {
      form: this.$form.createForm(this, { name: 'asdasda' }),
      api,
      version_info: {},

      open: false
    }
  },
  computed: {},
  async created() {
    this.version_info = await api.version_info_promise
  },

  methods: {
    handelClickLabel() {
      console.log(' click', this.$refs.refSelect)
      this.open = true
      this.$refs.refSelect.focus()
    },

    dropdownVisibleChange(open) {
      console.log(' dropdownVisibleChange', open)
      this.open = open
    },

    async onLogout() {
      //   this.$router.push({ path: '/user/login' })

      console.log('xxxxx')

      await api.logout()
      this.$router.replace({ path: '/user/login' })
    }
  }
}
</script>

<style type="text/css"></style>
