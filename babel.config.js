module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // https://github.com/facebook/metro/issues/1460
      [
        require('@babel/plugin-transform-destructuring'),
        {useBuiltIns: true},
      ]
    ]
  };
};
