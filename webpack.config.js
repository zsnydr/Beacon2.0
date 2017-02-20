const path = require('path');
const webpack = require('webpack');

module.exports = {
  // devtool: 'source-map',
  entry: [
    // 'webpack-hot-middleware/client',
    // 'react-hot-loader/patch',
    './client/app/app.js',
    './client/styles/styles.css'
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // plugins: [
  // // Minify assets.
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false // https://github.com/webpack/webpack/issues/1496
  //     }
  //   })
  // ],
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['es2015'] // can add "es2015" to compile to es5
      }
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css']
    },
    {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw-loader'
    }
    ]
  },
  // resolve: {
  //   extensions: ['', '.js', '.js'],
  //   alias: {
  //     'bootstrap-sass$': 'bootstrap-sass/assets/stylesheets/bootstrap'
  //   }
  // }
};
