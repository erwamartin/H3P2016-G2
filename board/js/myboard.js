applicationCache.update(); // Met à jour le manifest

applicationCache.addEventListener('updateReady',function(){
	applicationCache.swapCache();
},false);

var datas = {};

board.init({
	board : '#board',
	recorded : function(datas){
		this.render(datas);
		$('#map').removeClass('on');
	},
	rendered : function(){
		$('input[name=name]').val('');
		$('input[name=date]').val('');
		$('input[name=address]').val('');
	}
});

localize.init({
	map : '#map div',
	localized : function(position){
		datas.userLoc = {latitude : position.latitude, longitude : position.longitude};
		$('#map').toggleClass('on');
		localize.render(position);
		$('.loader').toggleClass('on');
	},
	found : function(pos){
		datas.destoc = {latitude : pos.latitude, longitude : pos.longitude};
		//datas.destoc = pos;
		console.log(pos);
		if(pos){
			localize.markPos(pos);
		}
	}
});

board.checkout();

$('#addCard').on('submit',function(e){
	e.preventDefault();
	var title = $('input[name=name]').val();
	var date = $('input[name=date]').val();

	if(!title){
		return;
	}
	/*if(!date){
		var newDate = new Date().getTime();
	}else{
		var newDate = new Date(date).getTime();
	}*/
	var newDate = !date?new Date().getTime():new Date(date).getTime();

	datas.title = title;
	datas.date = newDate;

	board.record(datas);
});

$('#addLocation').on('click',function(e){
	e.preventDefault();
	localize.getUserLocation();
	$('.loader').toggleClass('on');
});

$('#geocoder').on('submit',function(e){
	e.preventDefault();
	var address = $('input[name=address]').val();
	if(!address){
		return;
	}
	localize.find(address);
});

$('#board').on('click','.deleteButton',function(e){
	e.preventDefault();

	var key = $(this).data('key');
	board.delete(key);
	$(this).parent('div.card').remove();
})