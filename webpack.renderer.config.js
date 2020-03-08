const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader', options: {} },
    { loader: 'css-loader', options: { modules: true } }
  ],
});

rules.push({
  test: /\.less$/,
  use: [
    { loader: 'style-loader', options: {} },
    { loader: 'css-loader', options: { modules: true } },
    { loader: 'less-loader', options: {} }]
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', 'less']
  },
};
