var board = {
	defaults : {
		board : '#boardCanvas',
		recorded : function(){},
		rendered : function(){}
	},

	init : function(options){
		this.params = $.extend(this.defaults,options);
	},

	record : function(datas){
		localStorage.setItem(datas.date,JSON.stringify(datas));
		this.params.recorded.call(this,datas);
	},

	render : function(datas){
		var div = $('<div>').addClass('card');
		var spanDate = $('<span>').addClass('date').html(datas.date);
		var spanTexte = $('<span>').addClass('texte').html(datas.title);
		var aDelete = $('<a>').attr('href','').attr('data-key',datas.date).addClass('deleteButton').text('[delete]');

		div.append(spanDate,spanTexte,aDelete);

		$(this.params.board).append(div);

		this.params.rendered.call(this);
	},

	checkout : function(){
		for(i in localStorage){
			var datas = localStorage.getItem(i);
			this.render(JSON.parse(datas));
		}
	},

	delete : function(key){
		localStorage.removeItem(key);
	}
};