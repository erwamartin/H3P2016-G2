var localize = {
	defaults : {
		zoom : 17,
		center : {
			latitude : 48.857713,
			longitude : 2.347271
		},
		map : '',
		localized : function(){},
		found : function(){},
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

		this.map = new google.maps.Map(document.querySelector(this.params.map),settings);
	},

	find : function(address){
		var geocoder = new google.maps.Geocoder;
		geocoder.geocode(
			{
				'address' : address
			},
			function(data,status){
				if(status=='OK'){
					var destPos = data[0].geometry.location;
					localize.params.found.call(this,{latitude : destPos.lat(), longitude : destPos.lng()});
				}else{
					localize.params.found.call(this,null);
				}
			}
		);
	},

	markPos : function(pos){
		var position = new google.maps.LatLng(pos.latitude,pos.longitude);
		this.map.setCenter(position);
		new google.maps.Marker({position : position, map : this.map});
	}
};