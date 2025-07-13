module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            _components: "./components",
            _styles: "./styles",
            _hooks: "./hooks",
            _utils: "./utils",
            _services: "./services",
            _constants: "./constants",
            _types: "./types",
            _assets: "./assets",
          },
        },
      ],
    ],
  };
};
