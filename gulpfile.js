
var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default',function(){

});

gulp.task('dev',function(){
    browserSync.init({
        server:{
            baseDir:"src"
        }
    });

    gulp.watch(['src/**']).on('change',browserSync.reload);
});
