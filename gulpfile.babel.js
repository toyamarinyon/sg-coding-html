import gulp from 'gulp'
import gutil from 'gulp-util'
import source from 'vinyl-source-stream'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import jade from 'gulp-jade'
import sass from 'gulp-sass'
import notify from 'gulp-notify'
import connect from 'gulp-connect'

const compile = () => {
  const props = {
    entries: 'src/assets/javascripts/app.js',
    cache: {},
    packageCache: {},
    transform: [babelify],
    debug: true
  }
  const compiler = watching ? watchify(browserify(props)) : browserify(props)
  const recompile = () => {
    const stream = compiler.bundle()
    return stream
            .on('error', notify.onError("Error: <%= error.message %>"))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('dist/assets/javascripts'))
            .pipe(connect.reload())
  }
  compiler
    .on('update', () => recompile())
    .on('bundle', () => gutil.log('Start bundle'))
    .on('log', (message) => gutil.log('Complete bundle '+message))
  return recompile()
}

let watching = false
gulp.task('enable-watch-mode', () => watching = true)
gulp.task('build', () => compile())
gulp.task('connect', () => connect.server({livereload: true}))
gulp.task('html', () => {
  gulp.src('./tmp/*.html')
    .pipe(connect.reload())
})
gulp.task('sass', () => {
  const options = {
    indentedSyntax: true,
    includePaths:[
      'node_modules/bootstrap-sass/assets/stylesheets/'
    ]
  }
  gulp
    .src('src/assets/stylesheets/**/*.sass')
    .pipe(sass(options))
    .pipe(gulp.dest('dist/assets/stylesheets'))
    .pipe(connect.reload())

})
gulp.task('watch', () => {
  gulp.watch(['./tmp/*.html'], ['html'])
  gulp.watch(['./src/views/**/*.jade'], ['jade'])
  gulp.watch(['./src/assets/stylesheets/**/*.sass'], ['sass'])
})
gulp.task('jade', () =>{
  gulp.src(['src/views/**/*.jade','src/views/**/_*.jade'])
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})
gulp.task('development', ['connect','enable-watch-mode', 'build', 'watch'])
