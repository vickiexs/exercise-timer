module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@lib": "./lib",
            "@lib/*": "./lib/*",
            "@components": "./src/components",
            "@components/*": "./src/components/*",
          },
        },
      ],
    ],
  };
};
