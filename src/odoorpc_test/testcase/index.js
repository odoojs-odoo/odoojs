const AllFiles = require.context('./addons', true, /\.js$/)

const AllTest = AllFiles.keys().reduce((models, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = AllFiles(modulePath)
  models = { ...models, [moduleName]: value.default }
  return models
}, {})

// console.log(AllTest)

export default class Test {
  constructor(config) {
    const my_prototype = this.constructor.prototype
    Object.keys(AllTest).forEach(item => {
      const _item = `_${item}`
      this[_item] = undefined

      const getter = function () {
        if (!this[_item]) {
          this[_item] = new AllTest[item](config)
        }
        return this[_item]
      }

      my_prototype.__defineGetter__(`${item}`, getter)
    })
  }
}

// import BaseTestCase from './addons/base'
// import DatabaseTestCase from './addons/database'

// export default class Test {
//   constructor(config) {
//     this._config = config
//   }

//   get base() {
//     return new BaseTestCase(this._config)
//   }

//   get database() {
//     return new DatabaseTestCase(this._config)
//   }
// }
