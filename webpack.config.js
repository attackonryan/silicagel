const path = require('path')
module.exports = {
  mode: 'production',
  entry: {        
      index: './js/src/index.js',
  },
  output: {       
      publicPath: '',     
      path: path.resolve(__dirname, 'dist'),
      filename: 'Ryan.js'
  },
}