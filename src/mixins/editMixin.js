import api from '@/odooapi'

const cp = item => JSON.parse(JSON.stringify(item))

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

function _onchange_callid() {
  return Math.floor(Math.random() * 1000000000 + 1)
}

// const print_date = () => {
//   const date = new Date()
//   console.log(
//     date.getHours(),
//     date.getMinutes(),
//     date.getSeconds(),
//     date.getMilliseconds()
//   )
// }

let global_debug = 0
global_debug = 1

const try_call = async (fn, debug) => {
  if (global_debug || debug) return { result: await fn() }
  try {
    return { result: await fn() }
  } catch (error) {
    return { error }
  }
}

export default {
  mixins: [],

  data() {
    return {
      queue: []
    }
  },

  methods: {
    async _wait(callid) {
      const to_wait = () => {
        const first = this.queue[0]
        return first[0] !== callid
      }

      let iswait = to_wait()
      let count = 10
      //   console.log('wait1:', cp(this.queue), count, iswait)

      while (count > 0 && iswait) {
        await sleep(100)
        count = count - 1
        iswait = to_wait()
        // console.log('wait:', cp(this.queue), count, iswait)
      }
    },

    async call_queue(item) {
      console.log('queue 1', item, cp(this.queue))
      //   print_date()

      const callid = _onchange_callid()
      this.queue.push([callid, ...item])

      //   console.log('queue 2', item, cp(this.queue))
      //   print_date()

      await this._wait(callid)
      const [method, ...args] = item
      await this[method](...args)
      await sleep(600)
      this.queue.shift()
      //   console.log('queue 9', item, cp(this.queue))
      //   print_date()
    },

    queue_handleOnchange(fname, value, ...args) {
      this.call_queue(['handleOnchange', fname, value, ...args])
    },

    async handleOnchange(fname, value, kwargs = {}) {
      // console.log('formview onchange:', fname, value, kwargs)
      const res = await try_call(async () => {
        return await api.Views.form.onchange(this.viewInfo2, {
          record: this.record,
          values: { ...this.values, [fname]: value },
          fname,
          kwargs
          // value
        })
      })

      const { error, result } = res
      console.log('onchange ok', error, result)
      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.data = result
      }
    }
  }
}
