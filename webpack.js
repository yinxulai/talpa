const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = function (env, argv) {
  const config = { module: { rules: [] }, plugins: [] }

  config.context = path.join(__dirname, 'source')
  config.devtool = env.production ? 'source-map' : 'eval'
  config.mode = env.production ? 'production' : 'development'

  config.entry = {
    render: { import: './render/index.tsx' },
    server: { import: './server/index.ts', dependOn: 'render' }
  }

  config.output = {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  }

  config.resolve = {
    extensions: ['.ts', '.tsx', '.js'],
  }

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx',
      target: 'es2015'
    }
  })


  config.module.rules.push({
    test: /\.less$/,
    use: [
      "style-loader",
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]@[local]:[hash:base64:5]'
          }
        }
      },
      "less-loader"
    ]
  })

  config.module.rules.push({
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    options: {
      name: 'static/img/[name].[ext]?[hash]',
      esModule: false
    }
  })

  config.plugins.push(new ESLintPlugin())
  config.plugins.push(new HotModuleReplacementPlugin())
  const htmlTemplate = '<!DOCTYPE html><html><body><div id="root"></div></body></html>'
  config.plugins.push(new HtmlWebpackPlugin({ templateContent: htmlTemplate, inject: 'head' }))

  return config
}
