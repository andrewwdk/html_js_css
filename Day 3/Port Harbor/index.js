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
var index, nextIndex, previousIndex;
var animationStyle = 3;

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
	var lightboxImage = document.getElementById("lightbox-image");

	nextIndex = correctIndex(index + 1);
	previousIndex = correctIndex(index - 1);

	switch(animationStyle){
		case 3:
			verticalMoving(lightboxImage, direction);
			break;
		case 2:
			horizontalMoving(lightboxImage, direction);
			break;
		default:
			fading(lightboxImage, direction);
	}	
}

function verticalMoving(lightboxImage, direction){
	 var lightboxImageBox = document.getElementById("lightbox-image-box");
	 lightboxImageBox.style.flexDirection = "column";

	if(direction == 1){
				var nextLightboxImage = document.getElementById("next");
				nextLightboxImage.src = picsSrc[nextIndex];
				nextLightboxImage.classList.add("next-vertical-animation");
			}else{
				var previousLightboxImage = document.getElementById("previous");
				previousLightboxImage.src = picsSrc[previousIndex];
				previousLightboxImage.classList.add("previous-vertical-animation");
			}

	sleep(1000).then(() => {
			index = correctIndex(index + direction);
			lightboxImage.src = picsSrc[index];
			localStorage.mainPicSrc = picsSrc[index];
			loadImage();

			if(direction == 1){
				nextLightboxImage.classList.remove("next-vertical-animation");
			}else{
				previousLightboxImage.classList.remove("previous-vertical-animation");
			}

			 lightboxImageBox.style.flexDirection = "row";
	});
}

function horizontalMoving(lightboxImage, direction){
	if(direction == 1){
				var nextLightboxImage = document.getElementById("next");
				nextLightboxImage.src = picsSrc[nextIndex];
				nextLightboxImage.classList.add("next-horizontal-animation");
			}else{
				var previousLightboxImage = document.getElementById("previous");
				previousLightboxImage.src = picsSrc[previousIndex];
				previousLightboxImage.classList.add("previous-horizontal-animation");
			}

	sleep(1000).then(() => {
			index = correctIndex(index + direction);
			lightboxImage.src = picsSrc[index];
			localStorage.mainPicSrc = picsSrc[index];
			loadImage();

			if(direction == 1){
				nextLightboxImage.classList.remove("next-horizontal-animation");
			}else{
				previousLightboxImage.classList.remove("previous-horizontal-animation");
			}
	});
}

function fading(lightboxImage, direction){
	lightboxImage.classList.add('fade-in');

			sleep(1500).then(() => {
				lightboxImage.classList.remove('fade-in');
				lightboxImage.classList.add('fade-out');
				index = correctIndex(index + direction);
				lightboxImage.src = picsSrc[index];
				localStorage.mainPicSrc = picsSrc[index];
				loadImage();
				sleep(1500).then(() => {
					lightboxImage.classList.remove('fade-out');
				});
			});
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function correctIndex(index){
	if(index < 0){
		return picsSrc.length - 1;
	}

	if(index > picsSrc.length - 1){
		return 0;
	}

	return index;
}