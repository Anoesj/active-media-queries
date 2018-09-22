const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      sass = require('gulp-sass'),
      sassGlob = require('gulp-sass-glob'),
      basePath = global.paths.tests + '/basic';

gulp.task('test-basic-css', () => {
  return gulp.src(basePath + '/scss/**/*.scss', { sourcemaps: true })
    .pipe(sassGlob())
    .pipe(sass())
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest(basePath + '/css/'))
    .pipe(global.browserSync.stream());
});

gulp.task('test-basic-watch', () => {
  global.browserSync.init({
    server: {
      baseDir: './',
      index: '/tests/basic/index.html'
    },
    ghostMode: false
  });

  const config = { interval: 50 };
  gulp.watch([basePath + '/**/*.html', basePath + '/**/*.js'], config).on('change', global.browserSync.reload);
  gulp.watch(basePath + '/**/*.scss', config, gulp.series('test-basic-css'));
});

gulp.task('test-basic', gulp.series('test-basic-css', 'test-basic-watch'));
