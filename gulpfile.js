const gulp = require('gulp'),
      requireDir = require('require-dir'),
      browserSync = require('browser-sync').create();

process.setMaxListeners(0);

global.paths = {
  'src':    './src',
  'html':   './src/**/*.html',
  'scss':   './src/scss/**/*.scss',
  'css':    './src/css',
  'js':     './src/**/*.js',
};

global.browserSync = browserSync;

requireDir('./gulp-tasks', { recurse: false });
gulp.task('default', gulp.series('serve'));
