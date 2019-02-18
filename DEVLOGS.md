# Developer notes

## 13/02/2019

### Hamburger menu
Task: Add mobile menu with hamburger icon.
- Hamburger from bootstrap already existed in the code, but hidden.
- Hamburger icon downloaded from `https://useiconic.com/open/` and added to `src/images/` folder.
- Style mobile and fix desktop menu.
- Since we don't have a design for this element, some "creativity" was used.

### Swiper testimonials
Task: Make testimonials a slider on mobile with swipe capabilities using preferably SwiperJS.
- Research tool on website `http://idangero.us/swiper/`.
- Download it using NPM with command `npm install --save swiper`.
- Add it to the gulp vendor folder configuration so it can copy the javascript file over to `web/js/vendor` folder.
- Import Swiper CSS into `styles.scss`. The tool uses LESS and because of this we can only import the compiled CSS.
- Check tool options if we can configure, enable and disable it using CSS breakpoints. That's possible.
- Added initialization code to our custom JS with 1 slide on mobile, 2 on tablet and all 3 on desktop.
- Changed markup to Swiper suggested structure (otherwise extra configuration would be required).
- Tested on multiple breakpoints.

### Diagonal section
Task: Change the diagonal section to not use extra markup elements and make it work for big screens.
- Removed markup that was added exclusively for this diagonal element.
- Added a pseudo-element and styles to create the same effect.
- Made the diagonal bigger so that it would also work on very big screens.

### Remove JS
Task: Testimonial sections had some javascript to make description equal height. Make it flex-box.
- This was not possible due to Swiper styles already using flexbox for the sliders. A simplification was made in this functionality, removed the breakpoint since equal height is needed for all screen sizes.

### Accessibility
Task: Make the website more Accessible.
- Installed Chrome extension Siteimprove Accessibility Checker.
- Overview results and start implementing by the lowest conformance level A.\
- Research a way to make inline SVG's more accessible. Found a solution on `https://css-tricks.com/accessible-svgs/` that consists in adding a title element in the SVG markup.
- Implementing level AA and AAA and checking warnings. All passed.

## 14/02/2019

### Fixes
- Gulp had an error because of missing Swiper JS file on first install. I removed it and installed again saving on normal dependencies instead of develop dependencies. That fixed the issue.
- Menu with item flickering. That's a Chrome specific bug related to border-bottom and transition properties. My solution was to add a zero rotation to the element. Posted it on `https://stackoverflow.com/questions/9708570/chrome-css3-border-bottom-transition-bug`.
- Body width overflowing causing a white bar at the right of the site. Fixed hiding the body overflow.
- iPhone responsive bug fixed with metatag `<meta name="viewport" content="width=device-width">`. Added some other nice-to-have metatags.
- Swiper had a problem with navigation arrows. This was fixed adding options to describe the classes of the navigation arrows elements. Also removed equal height from JS and implemented it with flexbox and Swiper equalheight option.

### Accessibility (continuation)
- Install Chrome extension ChromeVox, an text to speach accessibility tool.
- Tested the site with the tool and found some areas that could be improved:
  - Changed all SVG added with img tag to inline (use title of SVG as title and better performance).
  - The tool name "SiteDiff" read by the tool was weird because there's no space. Added span's with `aria-label` with the name with space. This don't work with text inside paragraphs.
  - Changed some fonts colors to better contrast with background.

## 15/02/2019

### Fixes
- SVG images had some missing colors. Fixed by downloading a different version of the asset on InVision.

### Favicon
- Edited the logo SVG image using InkScape to make it bigger with still vector so we don't lose quality. Cropped the logo image only,saved as PNG 250x250px as `favicon.fav`.
- Added Favicons plugin `npm install --save-dev favicons`.
- Configure a Gulp task to generate favicons.
- Created a PUG file based on the resulting `index.html` from Favicons to include all new resources to our site.

### Cross-browser testing
- Check browser support used technologies: Bootstrap 4, SwiperJS, SVG, Flexbox.
  - IE 10+
  - Opera 12.1+
  - Safari 7+
  - Chrome 21+
  - Firefox 28+
- Browsers:
  - Safari 7-9: Flexbox not working. Fixed by adding Gulp PostCSS `npm install --save-dev gulp-postcss` with plugins Autoprefix (www.npmjs.com/package/autoprefixer) and Flexbug Fixes (www.npmjs.com/package/postcss-flexbugs-fixes).
  - IE 10-11: Banner SVG image was small. It was not working because of `height: auto;` in the element. Fixed by changing it to `height: initial;`.
  - TODO - IE 10: Swiper not working.
- Devices: iPhone 6/7/8 Plus/X, Samsung Galaxy S8/S9, iPad 4/PRO 9.7/PRO 12.9
  - iPhone 7: Extra space above and below sections SVG. Fixed by setting a percentage height along with the already defined width.
  - iPad 4: Banner text dislocated. Fixed by applying a media query to the top and translate proprieties so they only take place in large screens.

### Improving website efficiency

#### Previously implemented:
- Contact all CSS file into one, all included in `styles.scss` to reduce page requests.
- Javascript files at the end of markup body to prevent blocking page rendering.
- Use inline SVG to reduce page requests.

#### Implemented improvements
- Minify images with Gulp plugins:
  - Install and setup PNG/JPG minifier `npm install --save-dev gulp-minify`. This reduced about 6.5% of the files sizes (total 28.5kb to 26.6kb).
  - Install and setup SVG minifier `npm install --save-dev gulp-svgmin`. This reduced about 60.0% of the files sizes (total 705kb to 282kb).
- Reduce CSS size:
  - Install and setup Gulp UnCSS `npm install --save-dev postcss-uncss` plugin for Gulp PostCSS. This tool removes unnecessary CSS based on the HTML/JS. This required some changes in the order of build task for Gulp because now we need the HTML to be available before the CSS.
  - Right now it's work by checking all `.html` files in the web folder and creating a single reduced `style.css` for all.
  - File sizes reduced more than 85% (324kb to 40kb).
  - This could be improved by creating one `.css` file for each HTML, making sure only CSS needed by the page would be loaded.
- Reduce HTML sizes:
  - Install and setup Gulp tool to minify HTML `npm install --save-dev htmlmin`.
  - Added a new folder `web/pretty/` to put nicely formatted HTML. The root will have minified version.
  - This reduced the size of `landing-page.html` about 5% (755kb to 710kb).

#### Page Speed Insights
- In order to use the Google tool PSI, I've added a NPM plugin to serve local sites to the web called Ngrok `npm install --save-dev ngrok` and set it up on a Gulp task `gulp online`. This will give us an web accessible URL to our local site and thus allowing us to use PSI and other online tools to check the site performance.
- Results:
  - Important (in red):
    1. Enable text compression. **server task**
    2. Reduce server response times (TTFB). **server task**
    3. Ensure text remains visible during webfont load.
      - This could be achieved using property `font-display` of `@font-face`. But since we're using Google Fonts, this is not possible without losing all benefits of this service (cross-browser, cache, etc).
  - Notices (in yellow):
    1. Eliminate render-blocking resources.
    2. Defer offscreen images.
    3. Avoid an excessive DOM size.
    4. Minimize Critical Requests Depth.
  - Most important passed (in green):
    1. Properly size images.
    2. Minify CSS.
    3. Minify JavaScript.
    4. Defer unused CSS.
    5. Efficiently encode images.
    6. Serve images in next-gen formats.
    7. Preconnect to required origins.
    8. Preload key requests.
    9. Avoids enormous network payloads.
    10. Uses efficient cache policy on static assets.
    11. JavaScript execution time.
    12. Minimizes main-thread work.
#### Possible future improvements (not implemented):
  - Concat all JS into one file (gulp-concat).
  - Make a sprite with all PNG/JPG images to reduce page requests.
  - SVG files have a lot of unnecessary code that could be removed.
  - Above mentioned CSS reduced file for each page (gulp-uncss).
  - Make the first visible sections of the site with inline CSS.
  - Lazyload testimonials images.
  - Load only JS vendor that will be used, specially Bootstrap.
