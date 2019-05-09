const rewireMarkdown = require('./util/react-rewire-markdown');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewireMarkdown(config, env);
  return config;
};
