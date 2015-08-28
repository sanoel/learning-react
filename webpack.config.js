module.exports = {
  entry: './src/main.jsx',

  output: {
    filename: 'build/bundle.js',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.json', ],
  },
};
