const path = require("path")

const client = {
  target: "web",
  mode: "development",
  entry: {
    client: "./src/client/index.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  node: {
    fs: "empty",
    net: "empty"
  }
}

const server = {
  target: "node",
  mode: "development",
  entry: {
    server: "./src/server/index.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  node: {
    __dirname: false
  }
}

module.exports = [client, server]
