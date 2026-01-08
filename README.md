# FlipbookifyImageJS.js v1.1.0

### Logs
- Made the code for adding `audio` object names.
- Fixed CSS for box-sizing when there's padding.

FlipbookifyImageJS or Flipbookify is an **image-based** flipbook that lets user to turn their comic pages into an easy flipbook within seconds.<br>
And lets user to add music into their comic book!

## Setup
Setup by including FlipbookifyImageJS's CSS and JavaScript via CDN

1. **Create a new HTML file.** Include `<meta name="viewport">` tag for [proper responsive behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport) in mobile devices.

   ```html
   <!doctype html>
   <html>
       <head>
           <meta charset="utf-8">
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
           <title>Flipbookify Demo</title>
       </head>
       <body>
           <h1>Hello World!</h1>
       </body>
   </html>
   ```
2. **Include FlipbookifyImageJS's CSS and JS.** Place the `<link>` tag inside the `<head>` tag for CSS and place the `<script>` tag inside the `<body>` tag for JS just before closing the `<body>` tag
   
   ```html
   <!doctype html>
   <html>
       <head>
           <meta charset="utf-8">
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
           <title>Flipbookify Demo</title>
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Siwakornpc/FlipbookifyImageJS.js@main/flipbookifyJS.css">
       </head>
       <body>
           <h1>Hello World!</h1>
           <script type="module">
               import { flipbookify } from "https://cdn.jsdelivr.net/gh/Siwakornpc/FlipbookifyImageJS.js@main/flipbookifyJS.js";
           </script>
       </body>
   </html>
   ```
3. **Add the base element.** Add the base element `<div id="base">` before the `<script>` tag to allow Flipbookify to generate in it.

   ```html
   <!doctype html>
   <html>
       <head>
           <meta charset="utf-8">
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
           <title>Flipbookify Demo</title>
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Siwakornpc/FlipbookifyImageJS.js@main/flipbookifyJS.css">
       </head>
       <body>
           <h1>Hello World!</h1>

           <div id="base"></div>
   
           <script type="module">
               import { flipbookify } from "https://cdn.jsdelivr.net/gh/Siwakornpc/FlipbookifyImageJS.js@main/flipbookifyJS.js";
           </script>
       </body>
   </html>
   ```

4. **Construct your flipbook using `flipbookify()`.** Construct the `flipbookify()` function using the simple constructing like below:

   ```js
   flipbookify({
       singlePages: false // default - optional
       pageImages: [
            ".png",
            ".png"        // use the image source link or use the image from root
       ]
   });
   ```
5. **Check that out!** Open the page in your browser of choice to see your own flipbook page. Now you can start to create your own flipbook from your images!

## Flipbook construction with `flipbookify()`

The structure of the `flipbookify()` function by full construction was constructed as this:

```js
flipbookify({
    singlePages: false, // default - optional
    pageImages: [
        "cover.png",
        "precover.png",
        "1.png",
        "2+3.png"       // default - any image file type
    ],
    audios: {
        0: "Start",
        2: "Journal",
        3: "Chaos"      // JS will automatically if the name has mp3 or ogg
    },
    hasZoom: false,
    keybinds: false,
    ui: false
})
```

- `singlePages`: When `true`, all of the pages will be generated using a single image-page. This also affects how you place your `pageImages` selector.
- `pageImages`: Lets you put a list of pages (as an array). If not declared, the function won't work. If `singlePages` wasn't declared or set to `false`, the first image will have the front cover to be on the _right side_, and the last image will have the back cover on the _left side_.<br>
  Example usage:
  
  ```js
      flipbookify({
          singlePages: false,
          pageImages: [
              "/images/comic/Cover.png",
              "/images/comic/Pre-cover.png",
              "/images/comic/1.png",
              "/images/comic/2+3.png",
              ...
          ]
      });
  ```
- `audios`: Lets you add music between pages (as an object). If not declared, it will run by default. If declared, use object names as numbers like `0`, `1`, etc. on where you want to put the music in when clicked (based on `pageImages` without `singlePages` declaration). Only write the file name or audio source without the file extension, because the function will automatically add both mp3 and ogg file extensions in the `audio` tag.<br>
  Example Usage:

  ```js
      flipbookify({
          pageImages: [ ... ],
          audios: {
              0: "/music/comic/Start",
              1: "/music/comic/Journal",
              3: "/music/comic/Lovely",
              5: "/music/comic/Danger",
              ...
          }
      });
  ```
- `hasZoom`: When `true`, allows user to use zoom in to see the text in the book if the resolution is lower than 1920x1080.
- `keybinds`: When `true`, allows user to use keybinds to navigate between pages and other accessibilities.<br>
    Default Keybinds:

    ```
    P                 Play/Pause
    M                 Mute/Unmute
    UP/DOWN           Adjust Volume
    Z                 Enable/Disable Zoom
    +/-               Adjust Zoom
    A/D/LEFT/RIGHT    Navigate between pages
    ```
- `ui`: When `true`, allows user to use the UI for music, zoom and keybinds info. Only if one of these are declared or set to true.

## CDN links
As reference, here are our primary CDN links.

```
CSS:    https://cdn.jsdelivr.net/gh/Siwakornpc/FlipbookifyImageJS.js@main/flipbookifyJS.css
JS:     https://cdn.jsdelivr.net/gh/Siwakornpc/FlipbookifyImageJS.js@main/flipbookifyJS.js
```

## Responsibility

The book will shrink according to the browser's window size, and also easily changes into a comic strip when on mobile.



### Note

This is my very first usable JS module. If you have anything, please tell us!
