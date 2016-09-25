var webpack = require('webpack'),
	path = require('path')

module.exports = {
	entry:'.src/main.js',
	output:{
		path:Path.join(__dirname,'build'),
		filename:"[name].js"
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel-loader',
				query:{
					presets:['es2015']
				}}
		]
	}
}