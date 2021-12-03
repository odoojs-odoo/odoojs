<template>
  <div>
    <a-dropdown v-model="dropdownVisible">
      <!-- <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <span style="height:1px"> . </span>
      </a> -->

      <!-- @focus="handleOnFocus"
        @blur="handleOnBlur" -->
      <a-select
        :value="allowed_company"
        style="width: 160px"
        label-in-value
        :open="false"
        class="ant-dropdown-link"
        @click="e => e.preventDefault()"
      >
      </a-select>

      <a-menu slot="overlay" @click="handleOnDropdownSelect">
        <!--  -->
        <template v-for="item in allowed_companies">
          <a-menu-item :key="item[0]">
            <a-checkbox
              :checked="item[2]"
              @change="e => handleOnCheckChange(e, item[0])"
            />
            <span> {{ item[1] }} </span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'CompanySelect',
  components: {},
  mixins: [],
  data() {
    return {
      dropdownVisible: false,
      checkedChanged: false,

      allowed_companies: [],
      allowed_company_ids: [],
      allowed_company: undefined
    }
  },

  computed: {},

  created() {},
  async mounted() {
    this.get_data()
  },

  methods: {
    get_data() {
      // 下拉框 中的可选项目 是否 checked
      const allowed_company_ids = api.session.allowed_company_ids

      // 当前排在第一个的
      const allowed_company_id = allowed_company_ids[0]

      const { user_companies = {} } = api.session_info || {}
      const { allowed_companies = [] } = user_companies

      // 下拉框 中的可选项目
      this.allowed_companies = allowed_companies.map(item => {
        const checked = allowed_company_ids.includes(item[0])
        return [...item, checked]
      })

      const allowed_company = allowed_companies.find(
        item => item[0] === allowed_company_id
      )

      this.allowed_company = {
        key: allowed_company[0],
        label: allowed_company[1]
      }

      this.allowed_company_ids = [...allowed_company_ids]

      // console.log(api.env.context)
    },

    handleOnCheckChange(e, key) {
      const checked = e.target.checked
      this.checkedChanged = true
      // console.log('handleOnCheckChange ', key, checked)
      api.session.change_allowed_company(key, checked)
      this.get_data()
      this.dropdownVisible = false
      this.$router.go(0)
      //  await api.reload()
      // to relaod web
    },

    handleOnDropdownSelect({ key }) {
      // console.log('onClick ', key)
      setTimeout(() => {
        if (this.checkedChanged) {
          this.checkedChanged = false
        } else {
          // console.log('onClick2 ', key)
          api.session.set_first_allowed_company(key)
          this.get_data()
          this.dropdownVisible = false
          this.$router.go(0)
          // to relaod web
          //  await api.reload()
        }
      }, 10)
    }
  }
}
</script>

<style scoped></style>
