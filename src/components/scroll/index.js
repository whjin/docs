$(function () {
  const IDLE_TIME = 6000;
  let idleTimer = null;
  const $scrollTop = $('.scroll-top');
  const $navContainer = $('.nav-container');

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
      $navContainer.removeClass('hidden');
      $scrollTop.addClass('opacity');
    } else {
      $navContainer.addClass('hidden');
      $scrollTop.removeClass('opacity');
    }
    if (scrollHeight > 100) {
      $navContainer.fadeOut(500);
      $scrollTop.fadeIn(500);
    } else {
      $navContainer.fadeIn(500);
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
