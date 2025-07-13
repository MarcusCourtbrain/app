const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["_components", "./components"],
            ["_styles", "./styles"],
            ["_hooks", "./hooks"],
            ["_utils", "./utils"],
            ["_services", "./services"],
            ["_constants", "./constants"],
            ["_types", "./types"],
            ["_assets", "./assets"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
]);
