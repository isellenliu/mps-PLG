$(window).ready(function() {
	marquee_txt();
    betDesktop();
    bet_function_box();
});

function marquee_txt() {
	$(function(){
        // https://github.com/aamirafridi/jQuery.Marquee
		$('.marquee-txt').marquee({
            //duration in milliseconds of the marquee
            duration: 15000,
            //gap in pixels between the tickers
            gap: 10,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            //'left' or 'right'
            direction: 'left',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true
        });
	});
}

function betDesktop() {
    // setTimeout(function(){$('#meron-win').modal('hide')},3000);

	$(function(){
        $('.msg-meron-win').on('click', function () {
            $('.toast.msg-meron-win').toast('show')
        });
        $('.msg-wala-win').on('click', function () {
            $('.toast.msg-wala-win').toast('show')
        });

        $('.msg-match-ended').on('click', function () {
            $('.toast.msg-match-ended').toast('show')
        });
        $('.msg-no-event').on('click', function () {
            $('.toast.msg-no-event').toast('show')
        });
        $('.msg-streaming').on('click', function () {
            $('.toast.msg-streaming').toast('show')
        });
        $('.msg-suspend').on('click', function () {
            $('.toast.msg-suspend').toast('show')
        });
        $('.msg-betstart').on('click', function () {
            $('.toast.msg-betstart').toast('show')
        });
        $('.msg-close').on('click', function () {
            $('.toast.msg-close').toast('show')
        });
        $('.msg-newmatch').on('click', function () {
            $('.toast.msg-newmatch').toast('show')
        });
        $('.msg-lastcall').on('click', function () {
            $('.toast.msg-lastcall').toast('show')
        });
        $('.msg-success').on('click', function () {
            $('.toast.msg-success').toast('show')
        });
        $('.msg-bet-success').on('click', function () {
            $('.toast.msg-bet-success').toast('show')
        });
        $('.volume').on('click', function () {
            $(this).toggleClass('off');
        });
    });
	$(function(){
        $('.bet-chip').on('click', function () {
            $('.bet-table .selected').removeClass('selected');
            $(this).toggleClass('selected');
            $('.bet-desktop-table').removeClass('bet-draw');
        });
    });
	$(function(){
        $('.bet-chip.draw').on('click', function () {
            $('.bet-desktop-table').toggleClass('bet-draw');
        });
    });
	$(function(){
        $('.chip-number').on('click', function () {
            $('.chip-number.selected').removeClass('selected');
            $(this).toggleClass('selected');
        });
    });
    $(function () {
        $('.bet-sel-chipBox .chipBox,.bet-sel-chipBox .bet-allin').on('click', function () {
            $('.bet-sel-chipBox ul li').removeClass('active');
            $(this).toggleClass('active');
        });
    });

    $(function(){
        $('.demolink .no-draw').on('click', function () {
            $('.main-bet').toggleClass('no-draw');
        });
    });
    $(function () {
        $('.main-bet .main-bet-input').on('click', function () {
            $('.main-bet .main-bet-input').removeClass('on-focus');
            $(this).toggleClass('on-focus');
            $('.btn.btn-primary,.btn.btn-cancel').toggleClass('on-focus');
        }); 

    });
    $('.txt-increase').hide();
    $(function () {
        $('.main-bet-input').on('click', function () {
            $('.main-bet-input.on-focus .txt-increase').show();
        }); 

    });
    $(function () {
        $('.btn-primary').on('click', function () {
            $('.main-bet-input.on-focus .txt-increase').show();
        }); 
    });
    $(function () {
        $('.game-site-tab .item').on('click', function () {
            $('.game-site-tab-content').removeClass('disabled');
            $('.game-site-tab .item').removeClass('is-focus');
            $(this).toggleClass('is-focus');
        }); 
    });
    $(function () {
        $('.is-betting-close,.is-ended,.is-suspend,.is-cancel').on('click', function () {
            $('.game-site-tab-content').addClass('disabled');
        }); 
    });

    // 下方路子
    $(function(){
        $('.road-table-switcher').on('click', function () {

            $('.badge.meron-win-reverse').toggleClass('meron-win');

            $('#bacarat').toggleClass('show');
            $('#rightChart').toggleClass('show');
        });
    });


    $(function(){
        $(".show-alert").click(function(){
            $('.alert').show()
        }); 
        $('.alert .close').click(function () {
            $(this).parent().removeClass('in'); // hides alert with Bootstrap CSS3 implem
        });
    });

    // =========================
    $(function(){
        $(".panel-list-tb .btn btn-game").click(function(){
            $('#history').hide()
        });
    });
    // =========================
    
    var button = document.getElementById("btn")
    var output = document.getElementById("output")
    var number
    var counter
    

    function init() {
    // Convert string to primitve number
    number = parseInt(output.innerText)
    
    /**
     * Start counter by adding any number to start counting.
     * In this case the ouput starts from 0 so to immediately
     * invoke the button to increment the counter add 1 to start 
     * counting in natural
     * number (counting numbers).
     */  counter = number + 1
    
    function increment() {
        // Increment counter
        value = counter++
        output.innerText = value
    }
    
    // Output the increment value for every click
    button.onclick = increment
    }

    window.onload = init
}
