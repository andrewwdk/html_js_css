function loadImage(){
	if(localStorage.mainPicSrc){
		var mainPic = document.getElementById("main-pic");
		var lightboxImage = document.getElementById("lightbox-image");
		mainPic.src = localStorage.mainPicSrc;
		lightboxImage.src = localStorage.mainPicSrc;
	}
}

function chooseImage(src){
	localStorage.mainPicSrc = src;
	document.location.replace("index.html");
	console.log(localStorage.mainPicSrc);
}

function savePics(){
	var pics = document.querySelectorAll('.pic');
	var picsSrc = [];
	pics.forEach(function(pic){
		picsSrc.push(pic.src);
	});
	localStorage.picsSrc = picsSrc;
}

var picsSrc = [];
var index;

function openSlider(){
	picsSrc = localStorage.picsSrc.split(',');

	var mainPic = document.getElementById("main-pic");
	var lightbox = document.getElementById("lightbox");
    mainPic.onclick = function(){
	lightbox.classList.add('show-it');
	}

	defineCurIndex(mainPic.src);
}

function defineCurIndex(curSrc){
	for(index = 0; index < picsSrc.length; index++){
		if(curSrc == picsSrc[index]){
			break;
		}
	}
	console.log(index);
}

function closeSlider(){
	lightbox.classList.remove('show-it');
}

function slide(direction){
	index += direction;

	if(index < 0){
		index = picsSrc.length - 1;
	}

	if(index > picsSrc.length - 1){
		index = 0;
	}

	var lightboxImage = document.getElementById("lightbox-image");
	lightboxImage.src = picsSrc[index];
	localStorage.mainPicSrc = picsSrc[index];
	loadImage();
}
