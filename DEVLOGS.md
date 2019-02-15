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
- - Changed all SVG added with img tag to inline (use title of SVG as title and better performance).
- - The tool name "SiteDiff" read by the tool was weird because there's no space. Added span's with `aria-label` with the name with space. This don't work with text inside paragraphs.
- - Changed some fonts colors to better contrast with background.

### Cross-browser testing
- TODO

### Improving website efficiency
- TODO
