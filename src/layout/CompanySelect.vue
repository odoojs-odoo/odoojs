<template>
  <a-dropdown
    v-model="dropdownVisible"
    :trigger="['hover']"
    class="ant-dropdown-link"
  >
    <a-select
      :value="allowed_company"
      label-in-value
      :open="false"
      @click="e => e.preventDefault()"
    >
    </a-select>
    <a-menu slot="overlay" @click="handleOnDropdownSelect">
      <a-menu-item v-for="item in allowed_companies" :key="item.id">
        <a-checkbox
          :checked="item.checked"
          @change="e => handleOnCheckChange(e, item.id)"
        />
        <span> {{ item.name }} </span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import api from '@/odoorpc'

export default {
  name: 'CompanySelect',
  components: {},
  mixins: [],
  data() {
    return {
      dropdownVisible: false,
      checkedChanged: false
    }
  },

  computed: {
    allowed_companies() {
      return api.web.session.allowed_companies_for_selection
    },

    allowed_company() {
      // 下拉框 中的可选项目 是否 checked
      const allowed_company_ids = api.web.session.allowed_company_ids

      // 当前排在第一个的
      const allowed_company_id = allowed_company_ids[0]

      const allowed_company = this.allowed_companies.find(
        item => item.id === allowed_company_id
      )

      // console.log(allowed_company)

      return (
        allowed_company && {
          key: allowed_company.id,
          label: allowed_company.name
        }
      )
    }
  },

  created() {},
  async mounted() {},

  methods: {
    handleOnCheckChange(e, key) {
      const checked = e.target.checked
      this.checkedChanged = true
      // console.log('handleOnCheckChange ', key, checked)
      api.web.session.change_allowed_company(key, checked)

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
          api.web.session.set_first_allowed_company(key)

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

<style scoped>
.ant-dropdown-link {
  width: 250px;
  /* color:red; */
}
</style>
