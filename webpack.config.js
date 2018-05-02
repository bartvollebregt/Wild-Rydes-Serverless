const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const glob = require("glob");

let vendor = ['bootstrap'];

const entries = Object.assign(...glob.sync(path.join(__dirname, "js/Entry/*.js")).map(file =>
	({
		[file.substring(0, file.length - 3).replace(/^.*[\\\/]/, '')]: [...[file], ...vendor]
	})
));

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			},
			{
				test: /\.(scss|css)$/,

				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
    devServer: {
        port: 8080,
        contentBase: '.',
        watchContentBase: true,
        inline: true
    },
	plugins: [
		new UglifyJSPlugin(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],

	entry: entries,

	output: {
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'build'),
        publicPath: path.resolve(__dirname)
	},

	resolve: {
        alias: {
            WildRydes: path.resolve(__dirname, 'js/WildRydes.js'),
            Cognito: path.resolve(__dirname, 'js/cognito/'),
            Config: path.resolve(__dirname, 'js/config/'),
            UnicornRides: path.resolve(__dirname, 'js/UnicornRides/')
        }
    },

	mode: 'development'
};
