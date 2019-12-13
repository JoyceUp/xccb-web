const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VueAutoRoutingPlugin({
        pages: 'src/views',
        importPrefix: '@/views/'
      })
    ]
  },

  productionSourceMap: false
}