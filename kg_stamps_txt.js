"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 4
   
   Filename: kg_stamps.js
   Author: 
   Date:   
   

*/

//Interface

window.addEventListener("load", playStampGame);

/*playStampGame is the first function that runs when the kg_stamps.html is loaded*/
function playStampGame(){
	
	//reference to canvas section
	
	var drawArea = document.getElementById("canvas");
  
    //Tool bar buttons 
	var addStamp = document.getElementById("addStamp");
    var removeStamp = document.getElementById("removeStamp"); 
    var enlargeStamp = document.getElementById("enlargeStamp");
    var shrinkStamp= document.getElementById("shrinkStamp");
    var moveLeft = document.getElementById("moveLeft");
    var moveRight = document.getElementById("moveRight");
    var moveUp = document.getElementById("moveUp");
    var moveDown = document.getElementById("moveDown");
    var rotateRight = document.getElementById("rotateRight");
    var rotateLeft = document.getElementById("rotateLeft");
    var lighten = document.getElementById("lighten");
    var darken =  document.getElementById("darken");
    
    //control buttons
    var shapes = document.querySelectorAll("img.controlShape");
    var sizes = document.querySelectorAll("div.controlSize");
    var shades = document.querySelectorAll("td.controlShade");
    var garbage =  document.getElementById("garbage");
 
    // Mygame object to store all the  images added in canvas area
	var myGame = new gameObject();
    var currentStamp = new stamp();
    
    //event listeners for addstamp button 
    addStamp.addEventListener("click", function(){

    	var shapeSelect = false;
    	var sizeSelect = false;
    	var shadeSelect = false;
		//loop to read the currently clicked shape
		for(var i = 0; i<16;i++){
     		shapes[i].onclick = function(e){
		    	console.log(e.target.id);
				currentStamp.shape = e.target.id;
				console.log(currentStamp);
				shapeSelect = true;
				
			}
		}
		//loop to read the currently clicked size		
		for(var i = 0; i<3;i++){
			sizes[i].onclick = function(e){
		    	console.log(e.target.id);
				currentStamp.size = parseInt(e.target.id.match(/\d+/));//e.target.id.substring(e.target.id.length -1);
				console.log(currentStamp);
				sizeSelect = true;
			}
		}
		//loop to read the currently clicked shade
		for(var i = 0; i<5;i++){
			shades[i].onclick = function(e){
		    	console.log(e.target.id);
				currentStamp.shade = parseInt(e.target.id.match(/\d+/));//e.target.id.substring(e.target.id.length -2);
				shadeSelect = true;
				console.log(currentStamp);
    	 	    	
			}
   	   	}
		//function to add selected shape in canvas area.
   	   	drawArea.onclick = function(e){
   	   		console.log(shapeSelect, sizeSelect, shadeSelect);
   	   		var x = e.elementX();
   	   		var y = e.elementY();
   	   		if(shadeSelect&&shapeSelect&&sizeSelect){

   	   			myGame.addStamp(currentStamp);
   	   			console.log(myGame);
   	   			putImage(currentStamp, x, y);
   	   			drawArea.onclick = null;
   			}
   		}

    });
	
	//event listener for remove stamp button
	removeStamp.addEventListener("click",function(){
		drawArea.onclick = null;
		console.log(drawArea.childNodes[0]);
		for(var i = 0; i<drawArea.childNodes.length; i++){
			drawArea.childNodes[i].onclick = function(e){
				myGame.removeStamp(e.target.id);
				drawArea.removeChild(e.target);

			};
		}

	});

	//event listener to modify image's size
	enlargeStamp.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to enlarge size of image
			canvasImages[i].onclick = function(e){
				console.log(e.target);
				console.log(e.target.clientWidth);
				e.target.style.height = (e.target.clientHeight + 10) + 'px';
				e.target.style.width = 'auto';

			};

		}
	});

	//reduce size
	shrinkStamp.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to reduce size of image.
			canvasImages[i].onclick = function(e){
				console.log(e.target);
				console.log(e.target.clientWidth);
				e.target.style.height = (e.target.clientHeight - 10) + 'px';
				e.target.style.width = 'auto';

			};

		}
	}); 

	/*event listener to change position of image.*/
	//move image up
	moveUp.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to reduce size of image.
			canvasImages[i].onclick = function(e){
				console.log(e.target.style.marginTop);
				e.target.style.marginTop = (parseInt(e.target.style.marginTop.match(/\d+/)) - 5) + 'px';
				e.target.style.marginBottom = (parseInt(e.target.style.marginBottom.match(/\d+/)) + 5) + 'px';

			};

		}
	}); 

	//move image down
	moveDown.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to reduce size of image.
			canvasImages[i].onclick = function(e){
				console.log(e.target.style.marginBottom);
				e.target.style.marginTop = (parseInt(e.target.style.marginTop.match(/\d+/)) + 5) + 'px';
				e.target.style.marginBottom = (parseInt(e.target.style.marginBottom.match(/\d+/)) - 5) + 'px';
			};

		}
	});

	//move image to left
	moveLeft.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to reduce size of image.
			canvasImages[i].onclick = function(e){
				console.log(e.target.style.marginLeft);
				e.target.style.marginLeft = (parseInt(e.target.style.marginLeft.match(/\d+/)) - 5) + 'px';
				e.target.style.marginRight = (parseInt(e.target.style.marginRight.match(/\d+/)) + 5) + 'px';
			};

		}
	});

	//move image to the right
	moveRight.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to reduce size of image.
			canvasImages[i].onclick = function(e){
				console.log(e.target.style.marginRight);
				e.target.style.marginLeft = (parseInt(e.target.style.marginLeft.match(/\d+/)) + 5) + 'px';
				e.target.style.marginRight = (parseInt(e.target.style.marginRight.match(/\d+/)) - 5) + 'px';
			};

		}
	});

	/*Event listeners to rotaate image*/
	//rotate left
	rotateLeft.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to reduce size of image.
			canvasImages[i].onclick = function(e){
				console.log(e.target.style.transform);
				var originalRotation = parseInt(e.target.style.transform.match(/\d+/));
				console.log(originalRotation);
				if(e.target.style.transform===""){

					e.target.style.transform = 'rotate('+15+'deg)';	
				}else{

					e.target.style.transform = 'rotate('+(originalRotation+ 15)+'deg)';

				}
				
			};

		}
	});

	//rotate right
	rotateRight.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to reduce size of image.
			canvasImages[i].onclick = function(e){
				console.log(e.target.style.transform);
				var originalRotation = parseInt(e.target.style.transform.match(/\d+/));
				console.log(originalRotation);
				if(e.target.style.transform===""){

					e.target.style.transform = 'rotate('+ -15 +'deg)';	
				}else{

					e.target.style.transform = 'rotate('+(-originalRotation - 15)+'deg)';

				}
				
			};

		}
	});

	/*event listeners to changes shades of images*/
	//lighten
	lighten.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to reduce size of image.
			canvasImages[i].onclick = function(e){
				console.log(e.target.style.opacity);
				e.target.style.opacity = e.target.style.opacity - 0.1;

			};

		}
	});

	//darken
	darken.addEventListener("click", function(){
		drawArea.onclick = null;
		var canvasImages = document.querySelectorAll("img.canvas");
		console.log(canvasImages);
		for(var i = 0; i<canvasImages.length; i++){
			//function to reduce size of image.
			canvasImages[i].onclick = function(e){
				console.log(e.target.style.opacity);
				e.target.style.opacity = e.target.style.opacity + 0.1;

			};

		}
	});



	//event listener for garbage can button
	garbage.addEventListener("click", function(){
		canvas.removeChildren();

	});

    
    //place image method without canvas
    function putImage(stamp, x, y){
    	console.log(x, y);
    	var imgURL = "kg_"+stamp.shape+".png";
    	var opc = stamp.shade/100;
    	var sz;
    	if(stamp.size === 0){
    		var sz = 80;
		}
		if(stamp.size === 1){
    		var sz = 120;
		}
		if(stamp.size === 2){
    		var sz = 200;
		}
    	//alert(imgSrc);
    	drawArea.innerHTML+= "<img id = \""+stamp.shape+"\" src = \""+ imgURL + "\""
    						 + "style= \"position:absolute; margin:" + y +"px " + x +"px; opacity:"+opc+"; height:"+sz+ " px; width:"+ sz+ "px; \" class=\"canvas\" />";
    //console.log(drawArea);
    }

    /*methods to modify image's size, position, rotation and shading*/

}

//stamp object storing shape size and opacity of stamp
function stamp(shape, size, shade){
    this.shape = shape;
    this.size = size;
	this.shade= shade;
}

/*
** game object storing stores current control and tool object selected by user
** and include array of stamps selected by user.
*/

function gameObject(){
	this.stamps = new Array();
	var currentControl= null;
	var currentTool = null;
	var stampcount = 0;
	this.addStamp = function(stampobj){
		this.stamps[stampcount] = new stamp();
		this.stamps[stampcount].shape = stampobj.shape;
		this.stamps[stampcount].size = stampobj.size;
		this.stamps[stampcount].shade = stampobj.shade;
		++stampcount;
	};
	this.removeStamp = function(stampId){
		for(var i = 0; i<this.stamps.length; i++){
			if(stampId === this.stamps[i].shape){
				delete this.stamps.slice(i, i+1);

			}
		}


	}
}

/*---- Added Methods ---*/

// Method to return the x-coordinate of a mouse click within an element
Event.prototype.elementX = function() {
   var rectObject = this.target.getBoundingClientRect();
   return this.clientX - rectObject.left;
};

// Method to return the y-coordinate of a mouse click within an element
Event.prototype.elementY = function() {
   var rectObject = this.target.getBoundingClientRect();
   return this.clientY - rectObject.top;
};
      
/* Method added to any DOM element that removes all child nodes of element */
HTMLElement.prototype.removeChildren = function() {
   while (this.firstChild) {
      this.removeChild(this.firstChild);
   }   
};   

