var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'bundle.js'
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']}
        ]
    },
    mode:'development',
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: 'http://localhost:5000',
                pathRewrite: {"^/": ""}
            }
        }
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'app/index.html'
        })
    ]

}