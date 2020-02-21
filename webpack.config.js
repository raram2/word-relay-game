const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'word-relay-game',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    // entry > app에 있는 파일명을 하나하나 순회하며 (디렉토리에 존재하는 파일이면) 확장자와 매칭.
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  entry: {
    // 확장자를 붙여줘도 되지만, entry에 들어가는 파일이 많아질 수록 더 복잡해지므로 resolve의 extensions(확장자명) 설정으로 웹팩이 자동으로 확장자 매칭시키게 만들기
    app: ['./src/client'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 1% in KR'],
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          // 플러그인 = 확장프로그램 (여기서는 프리셋에 대한 확장)
          plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel'],
        },
      },
    ],
  },
  // 플러그인 === 확장프로그램 (여기서는 모듈(로더)에 대한 확장 프로그램)
  // 이 플러그인은 module(로더:loader) > rules > options 내부에 {debug:true}를 넣어 준다.
  plugins: [new webpack.LoaderOptionsPlugin({debug: true})],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  },
};
