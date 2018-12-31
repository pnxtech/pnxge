![](pnxtech-logo.png)
# pnxge
PNXTech Game Engine

Built on top of [PixiJS 4.8.1](https://pixijs.download/v4.8.1/docs/index.html)

Also uses the Howler sound engine:
https://github.com/goldfire/howler.js

## Tools

#### AudioSprites

Use Audio sprites: https://github.com/tonistiigi/audiosprite

First install ffmpeg:

```
$ brew install ffmpeg --with-theora --with-libvorbis
```
Note: brew install step seems to take a while to install...

Then install audiosprite:

```
$ npm install -g audiosprite
```

Build sounds in static folder using:

```
$ audiosprite --output sounds *.wav
```

https://www.nomisoft.co.uk/articles/audio-sprites-with-howler-js

AudioSprites talk
https://www.youtube.com/watch?v=8skJbjEh9SY

Then define auduio sprites using:
https://github.com/goldfire/howler.js#define-and-play-a-sound-sprite

#### TexturePacker
https://www.codeandweb.com/texturepacker

* Texture format: PNG-8 (indexed)
* Pixel format: RGBA8888
* Dithering: PngQuant Low
* Algorithm: Basic
* Max size 2048
* Trim mode: none

#### bmGlyph
https://www.bmglyph.com/

* Export format: Sparrow / Starling

After publishing font files, load the .png file into Photoshop and export it as an 8bit file.  That will create a PNG color index which will reduce the png file by over half of its original size.

#### Daz3D
https://www.daz3d.com


#### Background tiling

Tiling background support:

```
        {
          "type": "tile",
          "name": "background",
          "file": "tile01.jpg",
          "flip": true,
          "tint4": "0x808080",
          "tint3": "0xE0E0E0",
          "tint2": "0xC0C0C0",
          "tint1": "0xB0B0B0",
          "tint0": "0xA0A0A0",
          "tint": "0xE8E8E8"
        },
```

