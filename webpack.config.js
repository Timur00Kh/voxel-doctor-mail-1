const path = require('path');
const HtmlWebpackInlineStylePlugin = require('html-webpack-inline-style-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const imgb64 = require('./src/imgb64/imgb64.js')



module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'empty.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inlineSource: '.(css)$',
            inject: true,
            params: {
                imgb64: imgb64,
                images: {
                    pic1: 'https://timurkh.ru/voxel-doctor-mail-1/pic1.jpg',
                    pic2: 'https://timurkh.ru/voxel-doctor-mail-1/pic2.jpg',
                    footer: 'https://timurkh.ru/voxel-doctor-mail-1/footer.png',
                    // footer: 'http://localhost:8080/images/footer.png',
                    header: 'https://timurkh.ru/voxel-doctor-mail-1/header.png',
                }
            }
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new HtmlWebpackInlineStylePlugin(),
        new CopyPlugin([
            { from: path.join(__dirname, 'src', 'images'), to: path.join(__dirname, 'dist', 'images') },
        ]),
    ],
    devServer: {
        contentBase: './dist',
        port: 8080,
        host: '0.0.0.0',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },{
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                ],
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // }
        ],

    }

};
