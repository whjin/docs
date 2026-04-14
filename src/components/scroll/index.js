$(function () {
  const IDLE_TIME = 6000;
  let idleTimer = null;
  const $scrollTop = $('.scroll-top');
  const $backBtn = $('.back-btn');

  function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    $scrollTop.removeClass('opacity');
    idleTimer = setTimeout(() => {
      $scrollTop.addClass('opacity');
    }, IDLE_TIME);
  }

  $(window).scroll(function () {
    const scrollHeight = $(window).scrollTop();

    if (scrollHeight === 0) {
      $backBtn.removeClass('hidden');
      $scrollTop.addClass('opacity');
    } else {
      $backBtn.addClass('hidden');
      $scrollTop.removeClass('opacity');
    }
    if (scrollHeight > 100) {
      $backBtn.fadeOut(500);
      $scrollTop.fadeIn(500);
    } else {
      $backBtn.fadeIn(500);
      $scrollTop.fadeOut(500);
    }

    resetIdleTimer();
  });

  $scrollTop.on('click', function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
  });

  $scrollTop.hover(
    function () {
      if (idleTimer) clearTimeout(idleTimer);
      $(this).removeClass('opacity');
    },
    function () {
      resetIdleTimer();
    },
  );
});
