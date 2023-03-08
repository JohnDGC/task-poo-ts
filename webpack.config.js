const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main:"./src/app/main.ts"},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
            "fs": false
        }
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "build.js",
  },
    target : 'node'
};
