# sitediff-site

## Setup

### Dependencies

- Node.js
- npm

### Install

Install needed modules:
`npm install`

Install gulp globally:
`npm install --global gulp`

Build site:
`gulp build`

Watch and serve with live reload:
`gulp` or `gulp default`

Access the site on `http://localhost:8080`.

## Development

All custom code goes into `src/` folder. The `web/` folder is generated and excluded from the repo.

- src
  - images
  - pug
  - sass

### Images

All images/assets such as .png .jpg .svg goes into this folder. It will be copied over to `web/images` on build.

### Pug

Template engine Pug will be used to generate HTML. All files within root of `src/pug/` directory will be made into a .html file of the same name over the `web` folder and can be accessed by `http://localhost:8080/<file_name>.html`. All internal folders won't be compiled and will serve only as resources for includes. Gulp watch will trigger for changes in any .pug file in `src/pug` or it's subfolders.

### Sass

Gulp will compile only `src/sass/styles.scss` into `web/css/styles.css`. This file should only have includes for other resources. Gulp watch will trigger for changes in any .scss file in `src/sass/` or it's subfolders.
