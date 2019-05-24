"use strict";

var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var del = require("del");
var uglify = require("gulp-uglify");
var pump = require("pump");
const gulp = require("gulp");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style-min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("compress", function (cb) {
  pump([
    gulp.src("source/js/**"),
    uglify(),
    gulp.dest("build/js")
  ],
    cb
  );
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 7 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.gifsicle({ interlaced: true }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false }
        ]
      })
    ], {
        verbose: true
      }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src([
    "source/img/*.jpg",
    "source/img/*.png"
  ])
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src([
    "build/img/**/*.svg",
  ])
    .pipe(svgstore({
      inlineSvg: true
    }))

    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/pdf/**/*.pdf"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("cleanImg", function () {
  return del([
    "build/img/**/*.svg",
    "!build/img/sprite.svg",
  ]);
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "compress",
  "css",
  "images",
  "sprite",
  "cleanImg",
  "webp",
  "html"
));

gulp.task("deploy", gulp.series(
  "clean",
  "copy",
  "compress",
  "css",
  "images",
  "sprite",
  "cleanImg",
  "webp",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
