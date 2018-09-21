const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      sass = require('gulp-sass'),
      sassGlob = require('gulp-sass-glob');

gulp.task('css', () => {
  return gulp.src(global.paths.scss, { sourcemaps: true })
    .pipe(sassGlob())
    .pipe(sass()).on('error', handleError)
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(global.paths.css))
    .pipe(global.browserSync.stream());
});

function handleError (err) {
  console.log(err.toString());
  this.emit('end');
}
