//------- modal close -------//  
$('[data-btn]').on('click', function () {
  const mask = $('.bgBlack');
  const btn_value = $(this).attr('data-btn');
  $(mask).removeClass('target');
  $('[data-id]').hide();
  $('[data-id="' + btn_value + '"]').fadeIn(0);
});

function closeIFrame() {
  const mask = $('.bgBlack');
  $(mask).addClass('target');
};

$('.bgBlack').on('click', function () {
  closeIFrame();
});

function show_alert() {
  $(function () {
    $('#show-function-alert').on('click', function () {
      $('.function-alert').addClass('show');
      setTimeout(function() {
        $('.function-alert').removeClass("show");
    }, 3000);
    });
  });
}
