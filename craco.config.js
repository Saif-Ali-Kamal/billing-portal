const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#FF6700', '@label-color': "rgba(0,0,0, 0.56)" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};