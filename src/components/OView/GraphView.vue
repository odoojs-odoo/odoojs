<template>
  <div>
    <div>
      <PivotToolbar
        v-if="toolbar"
        :measures="pivotData.measures"
        @on-change="handleOnPivotChange"
      />
    </div>

    <!-- {{ records }} -->

    <!-- <div>row:</div>
    <div v-for="item in rows" :key="item">
      string: {{ groupbys[item.split(':')[0]].string }}, name: {{ item }}
    </div>
    <div>----</div>
    <div>columns:</div>
    <div v-for="item in cols" :key="item">
      string: {{ groupbys[item.split(':')[0]].string }}, name: {{ item }}
    </div>
    <div>----</div>
    <div>measures:</div>

    <div v-for="item in measures" :key="item">
      string:
      {{
        { ...measures_all, __count: { string: '个数' } }[item.split(':')[0]]
          .string
      }}, name: {{ item }}
    </div>

    <div>----</div>

    <div>data:</div>

    <div v-for="(rec, index) in records" :key="index">
      <span>--- {{ index }}: ---</span>
      <span v-for="me in measures" :key="me">
        {{
          { ...measures_all, __count: { string: '个数' } }[me.split(':')[0]]
            .string
        }}: {{ rec[me] }}
      </span>
      <span>-----</span>
      <span v-for="ax in [...rows, ...cols]" :key="ax">
        {{ groupbys[ax.split(':')[0]].string }}: {{ rec[ax] }}
      </span>
    </div> -->
    <line-echarts :chart-data="lineChartData" />
    <!-- <div></div> -->
  </div>
</template>

<script>
import graphMixin from '@/mixins/graphMixin'

import PivotToolbar from '@/components/OPivot/PivotToolbar.vue'
import lineEcharts from '@/components/vecharts/LineChart.vue'
export default {
  name: 'GraphView',
  components: { PivotToolbar, lineEcharts },

  mixins: [graphMixin],

  props: {
    toolbar: { type: Boolean, default: false }
  },

  data() {
    return {
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145],
        xTopName: [],
        xDatas: [],
        yDatas: [],
        axiasX: [],
        axiasY: []
      },
      getRecords: [],
      rowsCols: [],
      colors: [
        '#35D2FD',
        '#F56B3C',
        '#F2A936',
        '#D8F754',
        '#76F738',
        '#40C02D',
        '#6AE8FE',
        '#389AFD',
        '#285BF5'
      ]
    }
  },
  computed: {},

  watch: {
    records(newValue, oldValue) {
      this.getRecords = newValue
      this.rowsCols = this.rowsCols.concat(this.rows, this.cols)
      this.setEcharts()
      // console.log('newValue...', newValue, oldValue, this.measures, [this.rows, this.cols]);
    },
    measures(newValue, oldValue) {
      // if(oldValue.length > newValue.length){
      //     this.lineChartData.axiasX = [];
      //     //   xDatas: [],
      //     //   yDatas: [],
      //     //   axiasX: [],
      //     //   axiasY: [],
      // }
      // console.log('newValue, oldValue,,', newValue, oldValue);
    }
  },

  async created() {
    this.$nextTick(() => {})
  },
  async mounted() {},

  methods: {
    setEcharts() {
      this.rows.map(item => {
        const fname = item.split(':')[0]
        this.lineChartData.axiasY.push(this.groupbys[fname].string)
        // console.log('this.groupbys[item.split()[0]].string', this.groupbys[item.split(':')[0]].string);
      })
      this.cols.map(itema => {
        // console.log(itema, this.groupbys)
        const fname = itema.split(':')[0]
        this.lineChartData.axiasY.push(this.groupbys[fname].string)
        // console.log('this.groupbys[item.split()[0]].string', this.groupbys[itema.split(':')[0]].string);
      })
      var arrs = []
      this.measures.map((item, indey) => {
        this.lineChartData.axiasX.push({
          name: this.measures_all[item]
            ? this.measures_all[item].string
            : '个数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: this.colors[indey] || '#3888fa',
              lineStyle: {
                color: this.colors[indey] || '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f8fbff' || '#fdf6f6de' || '#f3f8ff'
              }
            }
          },
          data: [2, 9, 7, 6, 4, 1, 8],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        })
        this.getRecords.map(rec => {
          arrs.push({ [item]: rec[item] })
          // console.log('rec,,', item, rec[item]);
        })
        // console.log('this.groupbys[item.split()[0]].string', this.measures_all[item].string);
      })
      var xArrs = []
      this.getRecords.map(rec => {
        this.rowsCols.map(ax => {
          xArrs.push(rec[ax][1])
        })
      })
      this.lineChartData.xDatas = [...new Set(xArrs)]

      this.measures.map((me, index) => {
        var mArrs = []
        ;[...new Set(arrs)].map((item, indey) => {
          if (item[me] != undefined) {
            mArrs.push(item[me])
            // console.log('item,,', item[me], this.measures[index], me);
          }
        })
        // console.log('mArrs,,', mArrs);
        this.lineChartData.axiasX[index].data = [...new Set(mArrs)]
      })
      console.log('arrs[mea]', arrs, this.lineChartData)
      // console.log(this.lineChartData.axiasX, 'getRecords,,', this.getRecords, 'measures:',this.measures, 'rows:',this.rows, 'groupbys:',this.groupbys, 'measures_all:',this.measures_all, this.rowsCols);
    }
  }
}
</script>

<style scoped></style>
