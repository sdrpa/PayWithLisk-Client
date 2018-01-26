const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
   devServer: {
      historyApiFallback: true,
      //host: '0.0.0.0'
   },
   devtool: 'cheap-module-source-map',
   entry: [ 
      './src/index.js',
      './scss/main.scss'
   ],
   output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[chunkhash].js',
   },
   module: {
      rules: [
         {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: 'babel-loader'
               },
               'eslint-loader'
            ]
         },
         {
            test: /\.(sass|scss|css)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
         },
         {
            test: /\.svg$/,
            use: 'raw-loader',
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: 'src/index.html',
         minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true
         }
      }),
      new ExtractTextPlugin({
         filename: '[name].bundle.css',
         allChunks: true,
      }),
      //new BundleAnalyzerPlugin()
   ],
   node: {
      fs: 'empty'
   }
};
