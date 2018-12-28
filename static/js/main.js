;(function ($) {
  $('.navbar-collapse a').on('click', function () {
    $('.navbar-collapse').removeClass('in')
    $('.navbar-collapse').addClass('collapse')
  })

  jQuery('.sponsors-slider').flexslider({
    animation: 'slide',
    directionNav: true,
    controlNav: true,
    pauseOnHover: true,
    slideshowSpeed: 6000,
    direction: 'horizontal' // Direction of slides
  })

  if (Modernizr.mq('screen and (max-width:1024px)')) {
    jQuery('body').toggleClass('body')
  } else {
    var s = skrollr.init({
      mobileDeceleration: 1,
      edgeStrategy: 'set',
      forceHeight: true,
      smoothScrolling: true,
      smoothScrollingDuration: 300,
      easing: {
        WTF: Math.random,
        inverted: function (p) {
          return 1 - p
        }
      }
    })
  }

  // nicescroll
  $('html').niceScroll({
    zindex: 999,
    cursorborder: '',
    cursorborderradius: '2px',
    cursorcolor: '#191919',
    cursoropacitymin: 0.5
  })

  function initNice () {
    if ($(window).innerWidth() <= 960) {
      $('html')
        .niceScroll()
        .remove()
    } else {
      $('html').niceScroll({
        zindex: 999,
        cursorborder: '',
        cursorborderradius: '2px',
        cursorcolor: '#191919',
        cursoropacitymin: 0.5
      })
    }
  }
  $(window).load(initNice)
  $(window).resize(initNice)
})(jQuery)
