# canvasShowText

## Introduction
Show text by particles in HTMl5 Canvas.

一个以HTML5 Canvas实现的简单粒子字体特效.

![screenshot](https://github.com/ruiyeah/canvasShowText/raw/master/img/screen-shot.png)

## Usage

The class RioParticlesNetwork has three simple function: init,start and stop.
It's obvious that what they can do.

When you use this simple plugin:

#### 1.import the file

    <script src="js/rioCanvasShowText.js"></script>
    
#### 2.Initialize the plugin

You can use the function init() to initialize the plugin.Here is a sample configuration.

    rioCanvasShowText.init({
		//id of wrapper,which is related to canvas' width and height
        wrapper: 'wrapper',
        //canvas' id
        canvas: 'canvas',
        //Text content,divide by symbol ','or'|'
        content: 'Show text,in Canvas',
        //displayMode:
        //0:only for horizontal,1:while the device is mobile(width<768px) it will show the text vertically
        displayMode: 1,
        //if the particles of text will setup randomly.
        colorsRandom: true,
        //color array of particles
        colors:['#B2949D', '#1abc9c', '#FF5F8D', '#37A9CC', '#188EB2'],
        //font style of the text
        bigFontStyle: '160px Microsoft YaHei,微软雅黑 lighter',
        smallFontStyle: '60px Microsoft YaHei,微软雅黑 lighter'
    });

#### 3.start it
        rioCanvasShowText.start();

#### 4.stop it
        rioCanvasShowText.stop();
        
*warning:the stop function may not work at some browser which haven't support the function requestAnimationFrame*

