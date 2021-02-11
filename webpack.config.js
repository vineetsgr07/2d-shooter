const path = require('path');
module.exports = {
    entry: './src/app.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  ['transform-class-properties', {'spec': true}],
                  ["dynamic-import-webpack"]
                ],
              },
            },
          },
        ],
      },
resolve: {
  extensions: ['.js', '.es6'],
},
};
