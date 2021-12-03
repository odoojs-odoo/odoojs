const AllFiles = require.context('./addons', true, /\.js$/)

const AllAddons = AllFiles.keys().reduce((models, modulePath) => {
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = AllFiles(modulePath)
  // models = { ...models, [moduleName]: value.default }
  // console.log(value.default)

  return { ...models, ...value.default }
}, {})

// console.log(AllAddons)

export default AllAddons
