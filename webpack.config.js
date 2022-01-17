const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: path.join(__dirname, "lib", "index.js"),
  mode: "production",
  optimization: {
    minimize: false,
    concatenateModules: false,
  },
  module: {
    rules: [
    //   {
    //     // Webpack treats .mjs files more strictly (javascript/esm)
    //     // @nova/react ships with esm format, but it imports from 'react' which is in CommonJs format.
    //     // Dynamic modules (non-esm, i. e. CommonJs) can only imported via default import, everything else (including namespace import) emit errors
    //     // To make sure we can use @nova/react we need to treat it's files as dynamic modules.
    //     test: /\.mjs$/,
    //     include: /node_modules/,
    //     type: "javascript/auto",
    //   },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              [
                "babel-plugin-graphql-tag",
                {
                  strip: true,
                  importSources: ["@nova/react"],
                  gqlTagIdentifiers: ["graphql"],
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: "static",
  })],
};
