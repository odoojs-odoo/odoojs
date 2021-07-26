<template>
  <div>
    <img :src="url" />
  </div>
</template>

<script>
import OMixin from './OMixin'

export default {
  name: 'OImg',
  components: {},
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    url() {
      const model = this.modelMethod()
      // console.log(model, this.node)
      if (model) {
        return model.kanban_image_url({
          node: this.node,
          row_id: this.dataDict.id,
          dataDict: this.dataDict
        })
      }

      return 'aad'
    }

    //   kanban_content() {
    //   const model = this.modelMethod()
    //   if (model) {
    //     return model.kanban_content()
    //   }
    //   return undefined
    // },
  },

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
