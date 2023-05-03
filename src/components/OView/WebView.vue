<template>
  <template v-if="viewType === 'tree'">
    <TreeView :actionId="actionId" />
    <!-- <component :is="views[viewType]" :actionId="actionId" /> -->
  </template>

  <template v-else-if="viewType === 'chart'">
    <ChartView :actionId="actionId" />
  </template>

  <template v-else-if="viewType === 'form'">
    <!-- <div>{{ [actionId, viewType] }}</div>
    <div>{{ `${actionId}.form` }}</div>
    <div>{{ [Object.keys(components)] }}</div> -->

    <template v-if="`${actionId}.form` in components">
      <component
        :is="components[`${actionId}.form`]"
        :actionId="actionId"
        :resId="resId"
      />
    </template>
    <template v-else>
      <!-- <component :is="views[viewType]" :actionId="actionId" :resId="resId" /> -->
      <FormView :actionId="actionId" :resId="resId" />
    </template>
  </template>

  <template v-else> no viewType:{{ [viewType] }}</template>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import TreeView from '@/components/OView/TreeView.vue'
import ChartView from './ChartView.vue'

import FormView from '@/components/OView/FormView.vue'

import { OViewComponents as components } from '@/config/local_view'

// const views = { tree: TreeView, form: FormView }

function path2action_id(path) {
  return path.split('/').slice(2).join('.')
}

const { actionId, viewType, resId } = userCurrentRoute()

console.log(actionId.value, viewType.value, components)

function userCurrentRoute() {
  const router = useRouter()
  const actionId = computed(() => {
    const rounteVal = router.currentRoute.value
    return path2action_id(rounteVal.path)
  })

  const viewType = computed(() => {
    const rounteVal = router.currentRoute.value
    return rounteVal.query.view_type
  })
  const resId = computed(() => {
    const rounteVal = router.currentRoute.value
    return rounteVal.query.id
  })

  return { actionId, viewType, resId }
}
</script>

<style type="text/css"></style>
