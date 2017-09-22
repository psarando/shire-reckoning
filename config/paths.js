var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('build'),
  libBuild: resolveApp('lib'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/examples/index.html'),
  libHtml: resolveApp('public/lib.html'),
  shireHtml: resolveApp('public/examples/shire-calendars.html'),
  shireOutput: 'examples/shire-calendars.html',
  rivendellHtml: resolveApp('public/examples/rivendell-calendars.html'),
  rivendellOutput: 'examples/rivendell-calendars.html',
  gondorHtml: resolveApp('public/examples/gondor-calendars.html'),
  gondorOutput: 'examples/gondor-calendars.html',
  simulatedHtml: resolveApp('public/examples/simulated.html'),
  simulatedOutput: 'examples/simulated.html',
  shireICalHtml: resolveApp('public/examples/shire-icalendar.html'),
  shireICalOutput: 'examples/shire-icalendar.html',
  appIndexJs: resolveApp('src/index.js'),
  libIndexJs: resolveApp('src/lib.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
  nodePaths: nodePaths
};
