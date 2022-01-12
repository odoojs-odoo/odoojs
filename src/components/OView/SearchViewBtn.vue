<template>
  <div>
    <SearchToolbar
      :searchBtnOptions="searchBtnOptions"
      @on-search-select="handleOnSearchSelect"
    />

    <GroupbyToolbar
      v-if="viewType2 !== 'calendar'"
      :groupbyBtnOptions="groupbyBtnOptions"
      @on-search-select="handleOnSearchSelect"
    />
  </div>
</template>

<script>
import searchViewMixin from '@/mixins/searchViewMixin'

import SearchToolbar from '@/components/OSearch/SearchToolbar.vue'
import GroupbyToolbar from '@/components/OSearch/GroupbyToolbar.vue'

export default {
  name: 'SearchViewBtn',
  components: { SearchToolbar, GroupbyToolbar },
  mixins: [searchViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},
  watch: {},

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
