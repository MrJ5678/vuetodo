const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const devServer = {
    port: '8000',
    host: '0.0.0.0',
    overlay: {
        error: true
    },
    hot: true
}

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin()
]
let config

if(isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl/,
                    oneOf: [
                        {
                            resourceQuery: /module/,
                            use: [
                                'vue-style-loader', 
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: {
                                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                },
                                'stylus-loader'
                            ]
                        },
                        {
                            use: [
                                'vue-style-loader', 
                                'css-loader',
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                },
                                'stylus-loader'
                            ]
                        }
                        
                    ]
                    
                }
            ]
        },
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin()
        ])
    })
}else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                      {
                        loader: MiniCssExtractPlugin.loader
                      },
                      'css-loader',
                      { 
                        loader: 'postcss-loader', 
                        options: { sourceMap: true } 
                      },
                      'stylus-loader'
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.[hash:8].css'
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {                  // 这里开始设置缓存的 chunks
                    commons: {
                        chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                        minSize: 0,             // 最小尺寸，默认0,
                        minChunks: 2,           // 最小 chunk ，默认1
                        maxInitialRequests: 5   // 最大初始化请求书，默认1
                    },
                    vendor: {
                        test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
                        chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                        name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
                        priority: 10,           // 缓存组优先级
                        enforce: true
                    }
                }
            },
            runtimeChunk: true
        }
    })
}

module.exports = config