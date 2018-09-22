const gulp = require('gulp');

gulp.task('watch', done => {
  global.browserSync.init({
    server: [global.paths.src],
    ghostMode: false
  });

  const config = { interval: 50 };
  gulp.watch(global.paths.html, global.paths.js, config).on('change', global.browserSync.reload);
  gulp.watch(global.paths.scss, config, gulp.series('css'));
});
