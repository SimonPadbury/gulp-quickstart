# Gulp Quickstart

This little starter project has enables you to get a Gulp project up and running, with Babel, Sass, Nunjucks and other helps for sourcemaps and minification.

## Setup

1. First, you need [NodeJS](https://nodejs.org/) installed.

2. Then with this project downloaded to your computer, you need to install each of the following packages as dev dependencies:

    * @babel/core
    * @babel/preset-env
    * babel
    * browser-sync
    * cssnano
    * postcss
    * gulp
    * gulp-babel
    * gulp-concat
    * gulp-nunjucks-render
    * gulp-postcss
    * gulp-sass
    * gulp-sourcemaps
    * gulp-uglify

    ```bash
    npm install --save-dev @babel/core @babel/preset-env babel autoprefixer browser-sync cssnano postcss gulp gulp-babel gulp-concat gulp-nunjucks-render gulp-postcss gulp-sass gulp-sourcemaps gulp-uglify
    ```

    And wait.

3. After all the dev dependencies have been installed, you just need to use `gulp` and it will do all the tasks. In the terminal:

    ```bash
    gulp
    ```

    BrowserSync will be started automatically, and it will look for `index.html` in your so that it can serve it from `./public` to your [http://localhost:3000](http://localhost:3000).


## Starting your work

So, you need to start with the `index.njk` that’s directly inside `./src/pages`. There’s a _Hello world_ example with some proof tests waiting for you there.

When you start `gulp` the first time, it will run through everything and create a `./public/` folder.

Your `./src/pages/index.njk` will be rendered as `./public/index.html` and served to your browser.

Once you’ve seen that it’s all working OK, you can go ahead and remove the test dummy content and do your own thing.

## The Gulp tasks

The Gulp tasks are looking for folders in your `./src` directory.

* `./src/js` — ES6 content will be processed by Babel to ES5 and bundled to `./public/js/bundle.js`

* `./src/scss` — SCSS content will be preprcessed to CSS and become `./public/css/style.css`

* `./src/pages` — Nunjucks files in here will be rendered as HTML files in `./public`. You need at least `./src/pages/index.njk` (or `./src/pages/index.html`) for creating `./public/index.html`. Remember to set up your own links to `style.css` and `bundle.js`.

* The Nunjucks task will also look in `./src/partials` – so you can organize your partials in there, and include them in your page templates.

* Use `./src/assets` for any “past through copy” such as images and third-party CSS and/or JS libraries. The following file types, together with their directory structure that you may set up inside `./src/assets`, will simply be coped to  `./public` (you can add more to the `fileCopyTask()` in `gulpfile.js`):

    * `.html`
    * `.css`
    * `.js`
    * `.svg`
    * `.gif`
    * `.jpg`
    * `.png`

    **Note:** If you create directories such as `./src/assets/css` and `./src/assets/js`, these will be merged with `./public/css` and `./public/js`, no problem.

## Can this project be used as a static site generator?

Yes.

_Gulp Quickstart_ is, in fact, a simple static site generator, and it can be used for simple websites.