const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

/**
 * Top level functions in gulp
 * 
 *      gulp.task       - Define tasks
 *      gulp.src        - Point to files to use
 *      gulp.dest       - Point to folder to ouput
 *      gulp.watch      - Watch files and folders for change
 */

// All tasks in one command
gulp.task('default', ['copy-html', 'imagemin', 'minify', 'sass-min']);

// Copy all html files and put to dist folder
gulp.task('copy-html', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimize images
gulp.task('imagemin', function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Minify scripts
gulp.task('minify', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/  '));
})

// Compile sass
gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Compile sass with minify option
gulp.task('sass-min', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
          }))
        .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('myScripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images', ['imagemin']);
    gulp.watch('src/sass', ['sass-min']);
    gulp.watch('src/*.html', ['copy-html']);
})