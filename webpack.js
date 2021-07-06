module.exports = function (config) {
  const styleRules = config.module.rules.filter(rule =>
    rule.test.toString().match(/css|less|s\(\[ac\]\)ss/)
  )

  styleRules.forEach(rule => {
    const cssLoader = rule.use.find(use => use.loader === 'css-loader')
    if (cssLoader) {
      cssLoader.options = { ...cssLoader.options, modules: 'local' }
    }
  })

  console.log(config.module.rules)
  return config
}
