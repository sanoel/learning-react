autoprefixer = require('autoprefixer');
precss = require('precss');

module.exports = {
  entry: './src/main.jsx',

  output: {
    filename: 'build/bundle.js',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader' },
//      { test:   /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader!postcss-loader"},
    ],
  },

  postcss: function () {
    return [autoprefixer, precss];
  },

  resolve: {
    extensions: ['', '.js', '.json', ],
  },
};
