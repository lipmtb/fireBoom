
const path = require("path");

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }]
        },
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader" // 将 Sass 编译成 CSS
            }]
        }
        ]
    }
}