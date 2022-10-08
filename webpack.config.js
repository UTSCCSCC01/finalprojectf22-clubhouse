const path = require('path');
const mode = 'development';
module.exports = {
  mode: mode,
  entry: {
    main: path.resolve(__dirname, './client/src/index.jsx'),
  },
  resolve:{},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader']
      }



    ]
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
};
