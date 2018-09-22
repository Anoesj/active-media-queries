const gulp = require('gulp'),
      requireDir = require('require-dir'),
      browserSync = require('browser-sync');

process.setMaxListeners(0);

global.paths = {
  'src':    './src',
  'js':     './src/**/*.js',
  'dist':   './dist',
  'tests':  './tests',
};

global.browserSync = browserSync.create();

// Microscopic tasks that run independently
requireDir('./gulp-tasks/elemental', { recurse: false });

// Somewhat larger processes, like watching and compiling scss files
requireDir('./gulp-tasks/processes', { recurse: false });

// Workflows, like build/deploy/test/serve
requireDir('./gulp-tasks/workflows', { recurse: false });

gulp.task('default', gulp.series('test-basic'));
