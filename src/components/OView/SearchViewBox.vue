<template>
  <div>
    <SearchBox
      v-model="value2"
      :searchFields="searchFields"
      :modelGet="modelGet"
      @on-search-select="handleOnSearchSelect"
    />
  </div>
</template>

<script>
import searchViewMixin from '@/mixins/searchViewMixin'

import SearchBox from '@/components/OSearch/SearchBox.vue'

export default {
  name: 'SearchViewBox',
  components: { SearchBox },
  mixins: [searchViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    value2: {
      get() {
        // console.log(this.searchValues)
        return this.searchValues
      },
      set(val) {
        console.log(val)
      }
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
