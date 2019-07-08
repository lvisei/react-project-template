const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('../config');
const utils = require('./utils');

const env = process.env.NODE_ENV;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const getStyleLoaders = (cssOptions, preProcessor, preProcessorOptions) => {
  const loaders = [
    process.env.NODE_ENV === 'development'
      ? 'style-loader'
      : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
    ,
    { loader: 'css-loader', options: cssOptions },
    { loader: 'postcss-loader' }
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: preProcessor,
      options: Object.assign({}, preProcessorOptions ? preProcessorOptions : undefined)
    });
  }

  return loaders;
};

const baseConfig = {
  entry: resolve('src/index.js'),
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].[hash].js',
    publicPath: env === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'eslint-loader',
        include: [resolve('src')],
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /.(j|t)sx?$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: getStyleLoaders({ importLoaders: 2 })
      },
      {
        test: /\.module\.css$/,
        use: getStyleLoaders({ modules: true, importLoaders: 2 })
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: getStyleLoaders({ importLoaders: 2 }, 'less-loader')
      },
      {
        test: /\.module\.less$/,
        use: getStyleLoaders({ modules: true, importLoaders: 2 }, 'less-loader')
      },
      {
        test: /\.sass$/,
        exclude: /\.module\.sass$/,
        use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader')
      },
      {
        test: /\.module\.sass$/,
        use: getStyleLoaders({ modules: true, importLoaders: 2 }, 'sass-loader')
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader')
      },
      {
        test: /\.module\.scss$/,
        use: getStyleLoaders({ modules: true, importLoaders: 2 }, 'sass-loader', { indentedSyntax: true })
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: utils.assetsPath('img/[name].[hash:8].[ext]')
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('img/[name].[hash:8].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: utils.assetsPath('media/[name].[hash:8].[ext]')
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.ProgressPlugin()]
};

module.exports = baseConfig;
