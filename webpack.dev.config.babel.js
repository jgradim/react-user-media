import path from "path";
import WebpackNotifierPlugin from "webpack-notifier";

const config = {
  target: "web",
  entry: path.resolve(__dirname, "src/examples.js"),
  output: {
    path: path.resolve(__dirname, "examples"),
    filename: "examples.js",
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

