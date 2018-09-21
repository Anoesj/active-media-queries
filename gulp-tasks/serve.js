const gulp = require('gulp'),
      reload = global.browserSync.reload;

gulp.task('browsersync', () => {
  global.browserSync.init({
    server: [global.paths.src],
    ghostMode: true
  });

  gulp.watch([global.paths.html, global.paths.js]).on('change', reload);
  gulp.watch(global.paths.scss, gulp.series('css'));
});

gulp.task('serve', gulp.series('css', 'browsersync'));
