$(function () {
  $(window).scroll(function () {
    var $Height = $(window).scrollTop();
    if ($Height === 0) {
      $('.scroll-top').addClass('opacity');
    } else {
      $('.scroll-top').removeClass('opacity');
    }
    if ($Height > 100) {
      $('.scroll-top').fadeIn(500);
    } else {
      $('.scroll-top').fadeOut(500);
    }
  });
  $('.scroll-top').on('click', function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
  });
});
