<template>
  <div>login page</div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

onMounted(async () => {
  console.log('cas_tiket', 'call cas login')

  await sleep(1000)

  const casUrl = 'https://10.120.140.37:7443/cas/login'

  //   const casUrl = 'http://www.baidu.com'

  const myurl = 'https://einvoicetest.vwatj.ap.vwg/fapiao/vwat2/#/user/login'

  const url = `${casUrl}?service=${myurl}`

  window.location.assign(url)

  // const a = document.createElement('a')
  // a.setAttribute('href', path)
  // // a.setAttribute('download', filename2)
  // a.click()
})
</script>

<style scoped></style>
