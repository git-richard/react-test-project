const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
//  const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src'),
];

module.exports = {
  entry: {
    bundle: './src/app.js',
  },
  output: {
    path: './dist/', // Absolute path to the folder where the output file (bundle.js) is created.
    publicPath: '/', // Url root folder path.
    filename: '[name].js', // Name of bundle file created in the path folder. Put this filename in the index.html's <script> tag.
  },
  plugins: [
    new ExtractTextPlugin('styles.css'), // Name of compiled sass file
    new webpack.HotModuleReplacementPlugin(), // ** Dev only
  ],
  module: {
    loaders: [
      {
      // There is a difference between sass and scss. Need to use sass.
        test: /\.sass$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
      },
      {
        test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/,
      },
    ],
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
  resolve: {
    extensions: ['', '.js', 'jsx', 'json', 'sass'],  // Allows require('file') instead of require('file.js')
    root: [path.join(__dirname, './src')],
  },
 // ** Below are Dev only.
  devtool: 'source-map',
  devServer: {
    contentBase: './dist/', // Root folder of the site with the index.html file.
    hot: true, // hot module reloading
    inline: true,  // Disable to stop auto browser refresh.
    progress: true,
    colors: true,
    stats: 'errors-only', // Disable to see full compile details
    historyApiFallback: false, // Necessary for some HTML5 404 fallback functionality.
    compress: true,
  },
};
