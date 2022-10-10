<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <router-view class="routeBox" />
    <!-- <TestRpc /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TestRpc from './components/TestRpc.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    // TestRpc
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#app,
.routeBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
