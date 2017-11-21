const babel = require('babel-core');
const canCompile = babel.util.canCompile;

module.exports = {
  process: (src, filename) => {
    if (!canCompile(filename)) {
      return '';
    }
  }
};
