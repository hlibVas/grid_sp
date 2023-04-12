'use strict';
 
var gulp             = require('gulp');
var sass             = require('gulp-sass');
var autoprefixer     = require('gulp-autoprefixer');
var gcmq             = require('gulp-group-css-media-queries');
var sourcemaps       = require('gulp-sourcemaps');
var notify           = require('gulp-notify');
var browserSync      = require('browser-sync');


gulp.task('sass', function () {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError(function (error) {
        return "File: " + error.message;
      })))
    .pipe(gcmq())
    .pipe(autoprefixer({
            browsers: ['last 5 versions', '> 1%'],
            cascade: true
        }))
    .pipe(notify({
      message: 'Compiled!',
      sound: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('browser-sync', function () {
      browserSync({
            server: {
                baseDir: './'
            },
            notify: false
      })
})


gulp.task('watch', ['browser-sync'], function () {
      // gulp.watch('./assets/scss/**/*.scss', ['sass']);
      gulp.watch('./assets/css/**/*.css', browserSync.reload);
      gulp.watch('./*.html', browserSync.reload);
      gulp.watch('./assets/js/**/*.js', browserSync.reload);
});


