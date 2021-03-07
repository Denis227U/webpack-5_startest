const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let mode = "development";
let target = "web";
let sourseMap = "eval";

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
console.log("IS DEV", isDev);

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: filename("css"),
  }),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
];

if (isProd) {
  mode = "production";
  // Временное решение для бага с "browserslist", которая будет исправлена ​​с выходом webpack-dev-server 4-й версии
  target = "browserslist";

  sourseMap = "source-map";
}

module.exports = {
  // режим по умолчанию "production", если не установлен
  mode: mode,

  // В Webpack 5 это не обязательно, потому что это значение по умолчанию.
  entry: "./src/index.js",

  output: {
    // output path is required for `clean-webpack-plugin`
    path: path.resolve(__dirname, "dist"),
    filename: filename("js"),
    // publicPath: "./",
    // помещаем все обработанные изображения в папку изображений
    // assetModuleFilename: "images/[hash][ext][query]",
    // assetModuleFilename: `images/${isProd ? "[hash]" : "[name]"}[ext][query]`,
    // assetModuleFilename: "images/[name][ext][query]",
    // assetModuleFilename: "[name][ext]",
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // Это необходимо для импорта ресурсов в CSS, например url ().
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          // согласно документам, sass-loader должен быть внизу, который загружает его первым, чтобы избежать префиксов в ваших исходных картах и ​​других проблем.
          "sass-loader",
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "./",
            name: `images/${isProd ? "[name].[hash]" : "[name]"}.[ext]`,
          },
        },
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   // dependency: { not: ["url"] },
      //   /**
      //    * Параметр `type` заменяет необходимость в "url-loader"
      //    * и «file-loader» в Webpack 5.
      //    *
      //    * установка для параметра `type` : "asset" будет автоматически выбирать между
      //    * выводом изображений в файл или встраивание их в пакет как base64
      //    * с максимальным встроенным размером по умолчанию 8 КБ
      //    */
      //   // type: "asset",
      //   type: "asset/resource",

      //   /**
      //    * Если нужно встроить изображения большего размера, можем установить пользовательский `maxSize` для встроенного типа:
      //    */
      //   // parser: {
      //   //   dataUrlCondition: {
      //   //     maxSize: 30 * 1024,
      //   //   },
      //   // },
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // без дополнительных настроек это будет ссылка на .babelrc
          loader: "babel-loader",
          options: {
            /**
             * Из документации: если установлено, будет использоваться данный каталог
             * для кеширования результатов загрузчика. Будущие сборки webpack
             * будет пытаться читать из кеша, чтобы не запускать
             * потенциально дорогостоящий процесс перекомпиляции Babel при каждом запуске.
             */
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: plugins,

  target: target,

  devtool: sourseMap,

  devServer: {
    contentBase: "./dist/",
    open: true,
  },
};
