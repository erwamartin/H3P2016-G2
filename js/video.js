var player = function(params){

	var _this = this;
	_this.video = document.querySelector(params.video);
	_this.video.load();

	_this.playPause = function(){
		if(_this.video.paused){
			_this.video.play();
			if(typeof(params.played)=='function'){
				params.played.call();
			}
		}else{
			_this.video.pause();
			if(typeof(params.paused)==='function'){
				params.paused.call();
			}
		}
	}

	_this.video.addEventListener('canplaythrough',function(){
		if(typeof(params.loaded)==='function'){
			params.loaded.call(this,_this);
		}
	},false);

}