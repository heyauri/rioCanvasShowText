function canvasShow(){	

    var that=this;
	var canvas,wrapper,cWidth,cHeight,displayMode,colorsRandom,text,bigFontStyle,smallFontStyle,colors; 
	var focallength=250;
	var PI=Math.PI;
	var dots=[];
	var pause=false;
	var deviceType=1;
	var context;
	function log(){
		console.log.apply(console,arguments);
	}
	var option=arguments[0];
	var init=function(option){
		wrapper=document.getElementById(option.wrapper)||document.getElementById('wrapper');
		canvas=document.getElementById(option.canvas)||document.getElementById("canvas");
		canvas.width=wrapper.clientWidth;
	    canvas.height=wrapper.clientHeight;
		cWidth=canvas.width;
		cHeight=canvas.height;
		context=canvas.getContext("2d");
		displayMode=option.displayMode||0;
		//when displayMode==0 it wont' match the mobile
		colorsRandom=option.colorsRandom||0;
		//when colorsRandom==1 it will set the balls' color randomly
		colors=option.colors||['#B2949D', '#1abc9c', '#FF5F8D', '#37A9CC', '#188EB2'];
		colorsNum=colors.length;
		text=option.content||'canvas|show';
		bigFontStyle=option.bigFontStyle||'160px Microsoft YaHei,微软雅黑 lighter';
		smallFontStyle=option.smallFontStyle||'60px Microsoft YaHei,微软雅黑 lighter';
		if(text.match(',')) {text=text.split(',');}
	    else if (text.match('，')) {text=text.split('，');}
	    else if (text.match('｜')) {text=text.split('｜');}
		if(displayMode&&window.innerWidth<768)
		{
			deviceType=0;
			//宽度小于768px时,标记为小型设备
		}
	
		start();
	}
	
	
    
	var Dot=function(centerX,centerY,centerZ,radius){
		this.dx=centerX;
		this.dy=centerY;
		this.dz=centerZ;
		this.tx=0;
		this.ty=0;
		this.tz=0;
		this.x=centerX;
		this.y=centerY;
		this.z=centerZ;
		this.radius=radius;
		if(colorsRandom&&colors instanceof  Array) this.color=colors[Math.floor(colorsNum*Math.random())];
		else {
		   if(colors instanceof  Array) this.color=colors[0];
		   else this.color=colors;	
		}
		
	}
	
	Dot.prototype={
		paint:function(){
			context.beginPath();
			var scale=focallength/(focallength+this.z);
			context.arc(cWidth/2+(this.x-cWidth/2)*scale,cHeight/2+(this.y-cHeight/2)*scale,this.radius*scale,0,2*PI);
			context.fillStyle=this.color;
			context.fill();		
		}
	}

    
 

	var drawText=function (text){
		context.save();
		context.fillStyle="rgba(168,168,168,1)";
		context.textAlign="center";
		context.textBaseline-"middle";
		if(deviceType){
			context.font=bigFontStyle;
			context.fillText(text,cWidth/2,cHeight/2);
		}
		else{
			context.font=smallFontStyle;
			var length=text.length+4;
			var charHeight=Math.floor(cHeight/length);
			for (var i = 0;i <text.length; i++) {
			context.fillText(text[i],cWidth/2,charHeight*(i+2));
			}
		}
		context.restore();
	}
	
    var count=0;
	function getImgData(text){
		context.clearRect(0,0,cWidth,cHeight);
		drawText(text);
		var imgData=context.getImageData(0,0,cWidth,cHeight);
		context.clearRect(0,0,cWidth,cHeight);
		var dots=[];
		if(deviceType){
			for(var x=0;x<imgData.width;x+=6)
			{	
				for(var y=0;y<imgData.height;y+=6)
				{	
					var i=(y*imgData.width+x)*4;
					if(imgData.data[i]>=128){
						var dot=new Dot(x-3,y-3,0,3);
						dots.push(dot);
					}
				}
			}
		}
		else{
			for(var x=0;x<imgData.width;x+=2)
			{	
				for(var y=0;y<imgData.height;y+=2)
				{	
					var i=(y*imgData.width+x)*4;
					if(imgData.data[i]>=128){
						var dot=new Dot(x-1,y-1,0,1);
						dots.push(dot);
					}
				}
			}
		}
       return dots;
	}
	
	
	
	Array.prototype.forEachDo=function (callback)
	{
		for(var i=0;i<this.length;i++)
		{
			callback.call(this[i]);
		}
			
	}
	function initAnimate(){
		dots.forEachDo(function(){
			this.x=Math.random()*cWidth;
			this.y=Math.random()*cHeight;
			this.z=focallength*2*Math.random()-focallength;
			
			this.tx=Math.random()*cWidth;
			this.ty=Math.random()*cHeight;
			this.tz=focallength*2*Math.random()-focallength;
			
			this.paint();
					
		});
		animate();
	}
	
	//计算帧速率
	var lastTime;
	var direction=true;
	
	function animate(){
		animateRunning=true;
		var thisTime=+new Date();
		context.clearRect(0,0,cWidth,cHeight);
		dots.forEachDo(function(){
	    	var dot=this;
			if(direction)
			{
				if(Math.abs(dot.dx-dot.x)<0.1&&Math.abs(dot.dy-dot.y)<0.1&&Math.abs(dot.dz-dot.z)<0.1)
				{
					 dot.x = dot.dx;
                     dot.y = dot.dy;
                     dot.z = dot.dz;
                     if (thisTime - lastTime > 300) direction = false;
                } 
				else {
                     dot.x = dot.x + (dot.dx - dot.x) * 0.2;
                     dot.y = dot.y + (dot.dy - dot.y) * 0.18;
                     dot.z = dot.z + (dot.dz - dot.z) * 0.1;
                     lastTime = +new Date();
					
                }
			}
			else{
				if(Math.abs(dot.tx-dot.x)<0.1&&Math.abs(dot.ty-dot.y)<0.1&&Math.abs(dot.tz-dot.z)<0.1)
				{
					 dot.x = dot.tx;
                     dot.y = dot.ty;
                     dot.z = dot.tz;
                     pause=true;
                } 
				else {
                     dot.x = dot.x + (dot.tx - dot.x) * 0.15;
                     dot.y = dot.y + (dot.ty - dot.y) * 0.18;
                     dot.z = dot.z + (dot.tz - dot.z) * 0.12;
                     pause = false;
                }
			}
			dot.paint();
		});
		if (!pause) {
            if ("requestAnimationFrame" in window) {
                requestAnimationFrame(animate);
            }
            else if ("webkitRequestAnimationFrame" in window) {
                webkitRequestAnimationFrame(animate);
            }
            else if ("msRequestAnimationFrame" in window) {
                msRequestAnimationFrame(animate);
            }
            else if ("mozRequestAnimationFrame" in window) {
                mozRequestAnimationFrame(animate);
            }
        }
        
	}
	
	
	function start(){
	     dots=getImgData(text[0]);
		 initAnimate();
		 
		 var textLength=text.length;
		 var i=0;
		 if(textLength>1) i=1;
		 setInterval(function(){
		 	if(i==textLength) i=0;
		 	dots = getImgData(text[i]);
            direction = true;
            pause = false;
            initAnimate();
            i++;
		 },3200)
	}
	
	
	init(option);
}