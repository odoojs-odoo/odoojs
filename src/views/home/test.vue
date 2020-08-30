<template>
  <div>
    <div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>

      <button @click="logout">
        注销
      </button>
      <div>&nbsp;</div>

      <div>
        测试 菜单
        <ul>
          <li v-for="menu in menus_test" :key="menu.path">
            <button @click="onClickMenu(menu)">
              {{ menu.text }}
            </button>
          </li>
        </ul>
      </div>

      <!-- <div>
        菜单
        <ul>
          <li v-for="menu in menus" :key="menu.path">
            <button @click="onClickMenu(menu)">
              {{ menu.text }}
            </button>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
// import api from '@/api'

import { get_menu } from '@/router/menu'

export default {
  name: 'Home',
  components: {},
  mixins: [],

  data() {
    const odooMenus = get_menu()

    console.log('odooMenus,', odooMenus)

    const testMenus = odooMenus.filter(
      () => 1 === 1
      // item.name.slice(0, 5) !== 'sport'
    )

    const menus_test = testMenus.map((item) => {
      return {
        path: `/odoo/list/${item.name}`,
        text: item.title
      }
    })

    // const menus_sport = sportMenus.map((item) => {
    //   return {
    //     path: `/odoo/list/${item.name}`,
    //     text: item.title
    //   }
    // })

    return {
      menus_test: menus_test
      // menus: menus_sport
    }
  },
  computed: {},
  async created() {
    // const M = api.env('res.bank')
    // console.log('M,', M)
  },

  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push({ path: '/login' })
      })
    },

    onClickMenu(menu) {
      this.$router.push({ path: menu.path })
    }
  }
}
</script>

<style type="text/css"></style>
