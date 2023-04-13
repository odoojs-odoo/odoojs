<template>
  <a-button class="oe_stat_button" @click="onBtnClick(node)">
    <div v-if="node.string">
      <div>{{ '.' }}</div>
      <div>{{ node.string }}</div>
    </div>
    <template v-else>
      <template
        v-if="
          !Object.keys((node.stat_value || {}).children || {}).length &&
          Object.keys(node.stat_text.children).length <= 1
        "
      >
        <div>{{ '.' }}</div>
      </template>
      <div>
        <template
          v-for="sub in (node.stat_value || {}).children || {}"
          :key="sub.nodename || sub.name"
        >
          <TagNode :nolabel="1" :node="sub" :form-info="formInfo" />
        </template>
      </div>
      <div>
        <template
          v-for="sub in (node.stat_text || {}).children || {}"
          :key="sub.nodename || sub.name"
        >
          <div>
            <TagNode :nolabel="1" :node="sub" :form-info="formInfo" />
          </div>
        </template>
      </div>
    </template>
  </a-button>
</template>

<script setup>
import TagNode from '@/components/ONode/TagNode.vue'

defineProps(['formInfo', 'node'])

function onBtnClick(node) {
  console.log(node)
  alert([node.type, ' todo ', node.name])
}
</script>

<style scoped>
.oe_stat_button {
  width: 140px;
  height: 60px;
}
</style>
