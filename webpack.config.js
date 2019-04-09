const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "production", // режим работы
    entry: "./src/js/index.js", //  можно переопределить, вход
    output: {
        filename:"bundle-[hash].js", // [hash] - спец. маркер, вместо которого подставится хеш

    },
    devServer: {
        contentBase: './dist', // откуда брать содержимое
        port: 7777
    },
    module: { // вклиниваемся в обычный процесс
        rules: [ // массив правил для модулей
            { // конкретное правило
                // ? - символ перед ним может либо быть, либо не быть, $говорит что должно быть в конце строчки
                test: /\.m?js$/, //регулярное выражение, применяем ли правило к нашему модулю
                exclude: /(node_modules|bower_components)/, // исключаем эти каталоги
                use: { // формат настроек через объект
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader" ], // формат настроек через массив, плагины работают справа налево
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-[hash].[ext]",
                            outputPath: "images", // складывай в папку images
                        }
                    },
                    {
                        loader: "image-webpack-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanPlugin('dist'),
        new HtmlPlugin({
            filename: "index.html", // в какой файл
            template: "src/index.html" // в шаблон
        }),
        new HtmlPlugin({
            filename: "account.html", // в какой файл
            template: "src/account.html" // в шаблон
        }),
        new HtmlPlugin({
            filename: "timetable.html", // в какой файл
            template: "src/timetable.html" // в шаблон
        }),
        new HtmlPlugin({
            filename: "tasktracker.html", // в какой файл
            template: "src/tasktracker.html" // в шаблон
        }),
        new HtmlPlugin({
            filename: "registration.html", // в какой файл
            template: "src/registration.html" // в шаблон
        }),

        new MiniCssExtractPlugin({
            filename: "[name]-[hash].css",
        })
    ],
    optimization: {
        minimizer: [ // если включил свой минимайзер, настраивай все сам
            new OptimizeCssAssetsPlugin({}),
            new TerserPlugin({
                cache: true,
                parallel: true
            })
        ]
    }
};
