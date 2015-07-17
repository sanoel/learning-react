module.exports = {
  entry: './src/Note/note.js',

  output: {
    filename: 'build/bundle.js',
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.json', ],
  },
};
