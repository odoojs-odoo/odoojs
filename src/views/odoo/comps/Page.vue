<template>
  <div>
    <div>
      <span> 总条数: {{ total }}; </span>
      <span>
        每页数:
        <select v-model="pageSize2">
          <option v-for="op in pageSizes" :key="op.value" :value="op.value">
            {{ op.text }}
          </option>
        </select>
        ;

        <!-- <input v-model="pageSize2" type="text" :size="2" />  -->
      </span>
      <!-- <span> 总页数: {{ pageCount }}; </span> -->

      <button @click="prev">&lt;&lt;</button>

      <span> 当前页: {{ current2 }}/ {{ pageCount }}; </span>
      <button @click="next">&gt;&gt;</button>

      <button @click="goCurrent">go</button>
      <input v-model="currentGo" type="text" :size="2" />

      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
/*
 一个简单的 分页处理
 在 选择组件库以后, 使用组件库的分页组件, 不要用该组件
*/

export default {
  name: 'Page',
  components: {},

  props: {
    current: { type: Number, default: 1 },
    total: { type: Number, default: 0 },
    pageSize: { type: Number, default: 2 }
  },

  data() {
    return {
      pageSizes: [
        { value: 200, text: 200 },
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
        { value: 6, text: 6 }
      ],

      currentGo: 1
    }
  },

  computed: {
    pageSize2: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', Number(val))
        this.$emit('size-change')
      }
    },

    current2: {
      get() {
        return this.current
      },
      set(val) {
        this.$emit('update:current', val)
      }
    },

    pageCount() {
      return Math.ceil(this.total / this.pageSize)
    }
  },

  async created() {},

  methods: {
    goCurrent() {
      const currentGo = Number(this.currentGo)
      if (currentGo !== this.current2) {
        if (currentGo >= 1 && currentGo <= this.pageCount) {
          this.current2 = currentGo
          this.$emit('change', this.current2)
        }
      }
    },

    prev() {
      if (this.current2 > 1) {
        this.current2 = this.current2 - 1
        this.$emit('change', this.current2)
      }
    },

    next() {
      if (this.current2 < this.pageCount) {
        this.current2 = this.current2 + 1
        this.$emit('change', this.current2)
      }
    }
  }
}
</script>

<style type="text/css"></style>
