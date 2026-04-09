$(function () {
  $(window).scroll(function () {
    let $Height = $(window).scrollTop();
    if ($Height === 0) {
      $('.back-btn').removeClass('hidden');
      $('.scroll-top').addClass('opacity');
    } else {
      $('.back-btn').addClass('hidden');
      $('.scroll-top').removeClass('opacity');
    }
    if ($Height > 100) {
      $('.back-btn').fadeOut(500);
      $('.scroll-top').fadeIn(500);
    } else {
      $('.back-btn').fadeIn(500);
      $('.scroll-top').fadeOut(500);
    }
  });
  $('.scroll-top').on('click', function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
  });
  $('.back-btn').on('click', function () {
    const targetUrl = window.location.origin;
    window.location.href = targetUrl;
  });
});
