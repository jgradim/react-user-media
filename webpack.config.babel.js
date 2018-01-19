import path from "path";
import WebpackNotifierPlugin from "webpack-notifier";

const config = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "react-user-media.js",
    library: "react-user-media",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".js"], // allow require without extension
  },
  plugins: [
    new WebpackNotifierPlugin({ title: "react-user-media" }),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader", enforce: "pre" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    ],
  },
};

export default config;
