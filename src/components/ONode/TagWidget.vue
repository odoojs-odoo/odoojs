<template>
  <div>
    <!-- {{ node.name }} : title:  -->
    <h1>{{ node.title }}</h1>
  </div>
</template>

<script setup>
defineProps(['formInfo', 'node'])
</script>

<style scoped></style>
