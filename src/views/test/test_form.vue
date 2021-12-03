<template>
  <div>
    <!-- <div style="width: 50%;" class="float-div">
      1234567890 1234567890 1234567890 1234567890 12345 67890 12345 67890
      1234567890 1234567890 1234567890 12345 67890 1234567890 1234567890
      1234567890
    </div>

    <div style="width: 50%;" class="float-div">
      2234567890 1234567890 1234567890 1234567890 1234567890 1234567890
    </div>
    <div style="width: 50%;" class="float-div">
      3234567890 1234567890 1234567890 1234567890 1234567890 1234567890
    </div> -->

    <selecttest
      :dataDict="dataDict"
      :fname="fname"
      :required="required"
      :limit="7"
      mode="default"
      :placeholder="placeholder"
      :optionsMethod="optionsMethod"
      @on-change="(value, text) => onchange(fname, value, text)"
    />

    <div>tags</div>
    <selecttest
      :dataDict="dataDict"
      fname="user_ids"
      :required="required"
      :limit="7"
      mode="multiple"
      :placeholder="placeholder"
      :optionsMethod="optionsMethod"
      @on-change="(value, text) => onchange('user_ids', value, text)"
    />
  </div>
</template>

<script>
import selecttest from './selecttest.vue'

import { sleep } from '@/odoojs/utils'
export default {
  components: { selecttest },
  data() {
    return {
      value: {},
      dataDict: {},

      fname: 'partner_id',
      required: true,
      placeholder: 'pls select'
    }
  },

  async mounted() {
    setTimeout(() => {
      this.dataDict = {
        partner_id: 1,
        partner_id__name: 'P1',
        user_ids: [1, 2],
        user_ids__record: [
          [1, 'P1'],
          [2, 'P2']
        ]
      }
    }, 600)
  },

  methods: {
    async onchange(fname, value, text) {
      console.log(' onchange', [value, text])
      await sleep(600)
      this.dataDict = {
        ...this.dataDict,
        [fname]: value,
        [`${fname}__name`]: text,
        [`${fname}__record`]: text
      }
    },

    async optionsMethod({ query, limit }) {
      console.log(' optionsMethod', query, limit)

      await sleep(100)

      return [
        // [1, 'P1'],
        [2, 'P2'],
        [3, 'P3'],
        [4, 'P4'],
        [5, 'P5'],
        [6, 'P6'],
        [7, 'P7'],
        [8, 'P8'],
        [9, 'P9'],
        [10, 'P10']
      ]
    }
  }
}
</script>

<style scoped type="text/css">
.float-div {
  float: left;
}
</style>
