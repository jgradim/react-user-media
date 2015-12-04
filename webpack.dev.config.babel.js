import path from "path";
import WebpackNotifierPlugin from "webpack-notifier";

const config = {
  target: "web",
  entry: path.resolve(__dirname, "src/examples.js"),
  output: {
    path: path.resolve(__dirname, "examples"),
    filename: "examples.js"
  },
  resolve: {
    alias: {},
    extensions: ["", ".js"] // allow require without extension
  },
  plugins: [
    new WebpackNotifierPlugin({ title: "react-user-media" })
  ],
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "eslint" }
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel" }
    ]
  }
};

export default config;

