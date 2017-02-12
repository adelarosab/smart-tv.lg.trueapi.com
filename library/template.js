const path = require('path');
const pug = require('pug');

const defaults = {
  basedir: path.join(__dirname, '../templates/'),
  cache: true,
  // compileDebug: true,
  // debug: true
};

module.exports = function(file, locals, options = defaults) {
  return pug.compileFile(path.join(options.basedir, file), options)(locals);
};
