const gulp = require('gulp');

gulp.task('serve', done => {
  return gulp.series('css', 'watch');
});
