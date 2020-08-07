const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../dist/public'),
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/scss/_variables.scss";`
      }
    }
  }
}
