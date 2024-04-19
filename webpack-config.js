module.exports = {
    // ... other webpack configuration options
  
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            '@svgr/webpack',
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]',
                outputPath: 'images/', // Change this to your desired output path
              },
            },
          ],
        },
      ],
    },
  };
  