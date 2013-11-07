var localize = {
	defaults : {
		zoom : 17,
		center : {
			latitude : 48.857713,
			longitude : 2.347271
		},
		map : '',
		localized : function(){},
	},

	init : function(options){
		this.params = $.extend(this.defaults,options);
	},

	getUserLocation : function(){
		navigator.geolocation.getCurrentPosition(
			function(position){
				localize.params.localized.call(this,position.coords);
			},
			function(){
				localize.params.localized.call(this,null);
			},
			{enableHighAccuracy:true}
		);
	},

	render : function(position){
		var latlng = typeof(position==='object')?new google.maps.LatLng(position.latitude,position.longitude):new google.maps.LatLng(position.params.center.latitude,position.params.center.longitude);
		
		var settings = {
			zoom : this.params.zoom,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			center : latlng
		}

		console.log(this.params);

		new google.maps.Map(document.querySelector(this.params.map),settings);
	}
};

localize.init({
	map : '#map div',
	localized : function(position){
		localize.render(position);
		$('#map').toggleClass('on');
	}
});