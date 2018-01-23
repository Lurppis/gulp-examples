const gulp = require('gulp');

/**
 * Top level functions in gulp
 * 
 *      gulp.task       - Define tasks
 *      gulp.src        - Point to files to use
 *      gulp.dest       - Point to folder to ouput
 *      gulp.watch      - Watch files and folders for change
 */

 // Logs message
gulp.task('default', function() {
    return console.log('Gulp is running');
});