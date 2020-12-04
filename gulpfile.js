const { src, dest, series, parallel, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync = require('browser-sync').create();

function jsTask() {
  return src('./src/js/**/*.js', { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./public/js'))
}

function nunjucksTask() {
  return src([
      './src/pages/**/*.html',
      './src/pages/**/*.njk'],
    { allowEmpty: true })
    .pipe(nunjucksRender({
      path: [
        'src/partials/',
        'src/pages/',
      ]
    }))
    .pipe(dest('./public'))
}

function cssTask() {
  return src('./src/scss/style.scss', { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./public/css'))
}

function fileCopyTask() {
  return src([
      './src/assets/**/*.html',
      './src/assets/**/*.css',
      './src/assets/**/*.js',
      './src/assets/**/*.map',
      './src/assets/**/*.svg',
      './src/assets/**/*.gif',
      './src/assets/**/*.jpg',
      './src/assets/**/*.png'
    ], { allowEmpty: true })
    .pipe(dest('./public/'))
}

function liveReload(done) {
  browserSync.init({
    server: {
      baseDir: './public'
    },
  });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  watch('./src/assets/**/*', series(fileCopyTask, reload));
  watch('./src/partials/**/*', series(nunjucksTask, reload));
  watch('./src/pages/**/*', series(nunjucksTask, reload));
  watch('./src/js/**/*.js', series(jsTask, reload));
  watch('./src/scss/**/*.scss', series(cssTask, reload));
};

exports.default = parallel(fileCopyTask, nunjucksTask, jsTask, cssTask, parallel(liveReload, watchFiles));
