import { Configuration } from "webpack";

const webpackConfiguration: Configuration = {
    mode: "production",
    entry: "./src/index.ts",
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