const { override, removeModuleScopePlugin } = require('customize-cra');

module.exports = {
  webpack: override(
    removeModuleScopePlugin()
  ),
};
