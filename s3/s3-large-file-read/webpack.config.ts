import { Configuration } from "webpack";
import { resolve } from "path";

const webpackConfiguration: Configuration = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: resolve(__dirname, 'dist'),
        library: {
            type: "commonjs2"
        }
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    }

};

export default webpackConfiguration;