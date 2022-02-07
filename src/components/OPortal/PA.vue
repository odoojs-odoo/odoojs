<template>
  <!--  -->

  <a href="javascript:;" @click="onclick" :class="className">
    <template v-if="!node.children || !node.children.length">
      {{ node.content || 'No node.content' }}
      <!-- {{ node.content || node.attrs.title }} -->
    </template>

    <template v-else>
      <template v-for="(item, index) in node.children">
        <!-- {{ index }} {{ item.tagName }} -->
        <PNode :key="index" :info="{ ...info, node: item }" />
      </template>
    </template>
  </a>
</template>

<script>
import PNodeMixin from './PNodeMixin'

import api from '@/odooapi'

import PNode from './PNode'
const cp = item => JSON.parse(JSON.stringify(item))

function toFullPath(query) {
  return `/web?${Object.keys(query)
    .map(item => `${item}=${query[item]}`)
    .join('&')}`
}

const tosplit = href => {
  const [path, query1] = href.split('#')
  const query2 = query1.split('&').reduce((acc, item) => {
    const [key, val] = item.split('=')
    acc[key] = val
    return acc
  }, {})

  const { action, view_type, id: res_id } = query2
  const query = { action, view_type, id: res_id }

  return [path, query]
}

const tosplit_my = href => {
  const hs = href.split('?')
  if (hs.length === 1) {
    return [href, {}]
  }

  const [path, query1] = hs
  const query2 = query1.split('&').reduce((acc, item) => {
    const [key, val] = item.split('=')
    acc[key] = val
    return acc
  }, {})

  // const { action, view_type, id: res_id } = query2
  // const query = { action, view_type, id: res_id }

  return [path, query2]
}

const to_save_localStorage = query => {
  // console.log('a click. to web', href, path, query2)
  const routes_json = localStorage.getItem('routes')
  if (routes_json) {
    const routes_old = JSON.parse(routes_json)
    const tofind = query_to => {
      return routes_old.find(
        item => toFullPath(item.query) === toFullPath(query_to)
      )
    }

    const { action } = query
    const list_old = tofind({ action })
    const form_old = tofind(query)

    if (list_old && form_old) {
      const routes_new = JSON.stringify([list_old, form_old])
      localStorage.setItem('routes', routes_new)
    } else {
      localStorage.removeItem('routes')
    }
  }
}

// async function call_axios(url) {
//   const baseURL = process.env.VUE_APP_BASE_API
//   const timeout = 50000

//   const service = axios.create({
//     baseURL,
//     timeout,
//     headers: {
//       Accept:
//         'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
//     },
//     responseType: 'blob'
//   })

//   return await service({ url, method: 'get' })
// }

function download_file({ filename, filetype, data }) {
  // //ArrayBuffer 转为 Blob
  const blob = new Blob([data], { type: filetype })
  const objectUrl = URL.createObjectURL(blob)
  const filename2 = decodeURIComponent(filename)
  const a = document.createElement('a')
  a.setAttribute('href', objectUrl)
  a.setAttribute('download', filename2)
  a.click()
  return true
}

export default {
  name: 'PA',
  components: { PNode },
  mixins: [PNodeMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    goto_web(href) {
      // /web#model=sale.order&id=12&action=506&view_type=form
      console.log('a click. to web', href, cp(this.info))

      const [path, query] = tosplit(href)
      to_save_localStorage(query)
      this.$router.push({ path, query })
    },

    async goto_download({ href, query }) {
      // console.log('a click. to report', href, path, query)
      const { download } = query

      const response = await api.my.pdf_get(href)

      // console.log('a click. response', response)
      // console.log('download', href, path, query)
      if (download) {
        download_file(response)
      } else {
        // print
        download_file(response)
      }
    },

    goto_my(href) {
      // this.$router.push({ path: this.node.attrs.href })
      console.log('a click. to my', href, cp(this.info))
      const [path, query] = tosplit_my(href)
      const { report_type } = query
      if (!report_type) {
        this.$router.push({ path: this.node.attrs.href })
        return
      }

      this.goto_download({ href, path, query })
    },

    goto_me(href) {
      // this.$router.push({ path: this.node.attrs.href })
      console.log('a click. to lacal', href, cp(this.info))
    },

    onclick() {
      // console.log('a click.', this.node.attrs.href, cp(this.info))

      const href = this.node.attrs.href || ''
      if (href.slice(0, 3) === '/my') {
        this.goto_my(href)
      } else if (href.slice(0, 4) === '/web') {
        this.goto_web(href)
      } else if (href.slice(0, 1) === '#') {
        this.goto_me(href)
      } else {
        console.log('a click. todo', this.node.attrs.href, cp(this.info))
      }

      // e.preventDefault()
      // e.stopPropagation()

      // this.$emit('on-event', 'button-clicked', this.node)
    }
  }
}
</script>

<style lang="less"></style>
