$(".news-item").click(function(e){
	if ($(this).hasClass('clicked')){
		$(this).removeClass('clicked');
		$('#tiles').removeClass('span8');
		$('#tiles').addClass('span12');
		$('#news-content').addClass('hide');
	}
	else {
		$(this).addClass('clicked');
		$('#tiles').removeClass('span12');
		$('#tiles').addClass('span8');
		$('#news-content').removeClass('hide');
	}
})

$('#change-settings').click(function(e){
	if ($(this).hasClass('clicked')){
		$(this).removeClass('clicked');
		$('#tiles').removeClass('span8');
		$('#tiles').addClass('span12');
		$('#settings').addClass('hide');
	}
	else {
		$(this).addClass('clicked');
		$('#tiles').removeClass('span12');
		$('#tiles').addClass('span8');
		$('#settings').removeClass('hide');
	}
})