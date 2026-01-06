# FlipbookifyImageJS.js

FlipbookifyImageJS is a JS module that lets you add your images or double-sided pages into an interactive flipbook.

This flipbook has a few features, it lets you add a "comic experience" music for your comic book that allows user to hear what you want them to feel during a scene, lets your comic book turned into a scroll-able comic strip under smaller devices, and also flexible in different window sizes.

## Usage

Add CSS and JS to create a "beautiful" flipbook using image-based pages.<br>
CSS - Flipbook visuals<br>
JS - Flipbook interaction<br>
<br>
Copy and pastse this tags inside the \<head\> tag:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/Siwakornpc/FlipbookifyImageJS.js/refs/heads/main/flipbookifyJS.css">
<script src="https://raw.githubusercontent.com/Siwakornpc/FlipbookifyImageJS.js/refs/heads/main/flipbookifyJS.js"></script>
```
After pasting the tags, write the base element for creating the flipbook:

```html
<div id="base"></div>
```
Then add the JS structure like below:

```js
flipbookify({
    singlePages: false,     // default
    pageImages: [
      "your_path/1.png",
      "your_path/2+3.png",
      ...
    ],
    audio: {
      p0: "Start",
      p1: "Journey",        // either write the file's directory or the file's link, but don't write the file extension (mp3/ogg)
      ...
    },                      // false by default - optional
    ui: false,
    hasZoom: false,         // default
    keybind: false          // default
});
```
## Audio
In this module, it is currently supporting only mp3 and ogg files. Other than that, it will cause a module error.

### Note
This is my very first usable module, if you have anything, please give me feedbacks!
