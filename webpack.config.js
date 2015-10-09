module.exports = {
  entry: './src/main.jsx',

  output: {
    filename: 'build/bundle.js',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader' },
    ],
  },

  externals: {
    'leaflet': 'L',
  },

  resolve: {
    extensions: ['', '.js', '.json', ],
  },
};
