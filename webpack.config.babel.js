import path from "path";
import WebpackNotifierPlugin from "webpack-notifier";

const config = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "react-user-media.js",
    library: "react-user-media",
    libraryTarget: "umd"
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
