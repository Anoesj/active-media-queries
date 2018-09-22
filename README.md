# Active media queries

## Installation:
- npm install

## Test:
- gulp test-basic

## Minimum browser requirements:
- CSS variables

## Usage:
- Bind event listeners on the window object before active-media-queries runs by importing your custom code first.
- Import active-media-queries deferred: `<script defer src="/js/active-media-queries.js"></script>`
- Set a :root CSS variable named `--media-queries` and add a JSON definition of breakpoints like so:
```css
:root {
  --media-queries: '{ "mobile": "(max-width: 599px)", "tablet": "(min-width: 600px) and (max-width: 999px)", "desktop": "(min-width: 1000px)" }';
}
```

or if you're using a preprocessor like SASS, something like this:
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
  --media-queries: '{ "mobile": "#{$mq-mobile}", "tablet": "#{$mq-tablet}", "desktop": "#{$mq-desktop}" }';
}
```