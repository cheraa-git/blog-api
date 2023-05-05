const path = require('path')
const { NODE_ENV = 'production' } = process.env
const nodeExternals = require('webpack-node-externals')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  externals: [nodeExternals()],
  watch: NODE_ENV === 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 3000,
    compress: true
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: NODE_ENV === 'development' ? { parallel: true, scripts: ['yarn run:dev'] } : undefined,
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  }
}
