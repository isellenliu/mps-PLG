$(window).ready(function() {
    gameHall_JS();
});

function gameHall_JS() {
	$(function(){
		// ========================
		$(".content-COCKFIGHT").load("content-COCKFIGHT.html");
		$(".content-DICE").load("../src-SICBO/content-SICBO.html");
	});
	// =========================
	// game type content
	$(".content-body").hide();
	$(".content-COCKFIGHT").show(); //預設開啟內容
	$('.arena').addClass('active');

	$('.game-type-list .btn-DICE').on('click', function () {
		$('body').removeClass('COCKFIGHT');
		$('body').addClass('DICE');
		$('.content-body').hide();
		$('.content-DICE').show();
		$('.arena,.arena-betting').removeClass('active');
		$('.video-countdown').hide();
		$('.sicbo-countdown').show();
	});
	$('.game-type-list .btn-COCKFIGHT').on('click', function () {
		$('body').removeClass('DICE');
		$('body').addClass('COCKFIGHT');
		$('.content-body').hide();
		$('.content-COCKFIGHT').show();
		$('.arena').addClass('active');

		$('.video-countdown').show();
		$('.sicbo-countdown').hide();
	});
	// ===========================
	$('.game-type-list li').on('click', function () {
		$('.game-type-list li').removeClass('active');
		$(this).addClass('active');
	});
	$('.arena ul li').on('click', function () {
		$('.arena ul li').removeClass('active');
		$(this).addClass('active');
	});

	
	
	$("sicbo-countdown")   
	.countdown("20", function(event) {   
		$(this).text(   
		event.strftime('%S')   
		);   
	});
	
};