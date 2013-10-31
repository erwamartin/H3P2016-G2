var player = {

	params : {
		video : '#video',
		progress : '#progress',
		buffer : '#control',
		button : '#button',
		loaded : function(){},
		playing : function(){},
		pausing : function(){}
	},

	init : function(options){
		this.property = $.extend(this.params,options);
		this.media = $(this.property.video)[0];
	},

	load : function(){
		this.media.load();
		$(this.property.video).on('canplaythrough',function(){
			player.property.loaded.call(this);
		})
	},

	play : function(){
		this.media.play();
		this.property.playing.call(this);
	},

	pause : function(){},

	setTime : function(){}

};

player.init({
	progress : '.progress',
	buffer : '.buffer',
	control : '.control',
	loaded : function(){
		player.play();
	},
	playing : function(){
		$(player.property.video).addClass('play');
		$(player.property.button).removeClass('loading').addClass('off');
	}
});
player.load();