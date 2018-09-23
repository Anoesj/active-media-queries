# Active media queries

## Installation:
- `npm i`

## Examples:
- run `gulp examples-basic`

## Minimum browser requirements:
- CSS variables
- ES2015
- Only tested in Chrome 69 and Firefox 62 on Ubuntu 18.04.01LTS for now

## Usage:
Bind event listeners on the window object before active-media-queries runs by importing your custom code first. You can listen for three types of events: `mq-change`, `mq-active` and `mq-inactive`. The first event type returns an Object (in event.details) containing changedMediaQueries, currentlyActiveMediaQueries and currentlyInactiveMediaQueries (all Map objects). The last two only return a Map with media queries that turned respectively active and inactive.
Import active-media-queries as a deferred script: `<script defer src="/js/active-media-queries.js"></script>`
Set a :root CSS variable named `--media-queries` and add a JSON definition of breakpoints like so:
```css
:root {
  --media-queries: "{ 'mobile': '(max-width: 599px)', 'tablet': '(min-width: 600px) and (max-width: 999px)', 'desktop': '(min-width: 1000px)' }";
}
```
*Note that you should start the CSS variable with double quotes `"` and wrap the breakpoint names and media queries with single quote `'` to cover all popular modern browsers.*

If you're using a CSS preprocessor like SASS, you can use SASS variables in the CSS variable:
```scss
$tablet: 600px;
$desktop: 1000px;

@function bpmax($bp) {
  @return $bp - 1px;
}

$mq-mobile: "(max-width: #{bpmax($tablet)})";
$mq-tablet: "(min-width: #{$tablet}) and (max-width: #{bpmax($desktop)})";
$mq-desktop: "(min-width: #{$desktop})";

// Set breakpoints CSS variable
:root {
  --media-queries: "{ 'mobile': '#{$mq-mobile}', 'tablet': '#{$mq-tablet}', 'desktop': '#{$mq-desktop}' }";
}
```
*Note that you should start the CSS variable with double quotes `"` and wrap the breakpoint names and media queries with single quote `'` to cover all popular modern browsers.*

## TODO:
- Option to use debounce or throttle (now only throttle is supported)
- Option to change debounce/throttle times