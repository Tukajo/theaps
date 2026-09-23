const path = require('path');

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        filename: 'theaps.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'theaps',
            type: 'umd',
            export: 'default',
            umdNamedDefine: true,
        },
        globalObject: 'this',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.d.ts'],
    },
};
