(function (window) {
  'use strict';

  function Even(config) {
    this.config = config;
  }

  Even.prototype.setup = function() {

    this.navbar();
    this.responsiveTable();

    if (this.config.toc) {
      this.scrollToc();
      this.tocFollow();
    }

    this.backToTop();
  };

  Even.prototype.navbar = function () {
    var $nav = $('#mobile-navbar');
    var $navIcon = $('.mobile-navbar-icon');

    var slideout = new Slideout({
      'panel': document.getElementById('mobile-panel'),
      'menu': document.getElementById('mobile-menu'),
      'padding': 180,
      'tolerance': 70
    });
    slideout.disableTouch();

    $navIcon.click(function () {
      slideout.toggle();
    });

    slideout.on('beforeopen', function () {
      $nav.addClass('fixed-open');
      $navIcon.addClass('icon-click').removeClass('icon-out');
    });

    slideout.on('beforeclose', function () {
      $nav.removeClass('fixed-open');
      $navIcon.addClass('icon-out').removeClass('icon-click');
    });

    $('#mobile-panel').on('touchend', function () {
      slideout.isOpen() && $navIcon.click();
    });
  };

  Even.prototype.responsiveTable = function () {
    var tables = $('.post-content > table')
    tables.wrap('<div class="table-responsive">')
  };

  Even.prototype.scrollToc = function () {
    var SPACING = 20;
    var $toc = $('.post-toc');
    var $footer = $('.post-footer');

    if ($toc.length) {
      var minScrollTop = $toc.offset().top - SPACING;
      $(window).scroll(function () {
        var tocState = {
          start: {
            'position': 'absolute',
            'top': minScrollTop
          },
          process: {
            'position': 'fixed',
            'top': SPACING
          }
        }
        var scrollTop = $(window).scrollTop();
        if (scrollTop < minScrollTop) {
          $toc.css(tocState.start);
        } else {
          $toc.css(tocState.process);
          
          if($(".post-toc").css("display") != "none"){
            var maxTocTop = $footer.offset().top - $toc.height() - SPACING;
            var tocCenterThreshold = document.documentElement.scrollTop + window.innerHeight / 2;
            if ($(".toc-link.active").offset() != undefined && $(".toc-link.active").offset().top > tocCenterThreshold) {
              var distanceBetween = $(".post-toc").offset().top - $(".toc-link.active").offset().top;
              $(".post-toc").offset({
                  top: Math.min(maxTocTop, tocCenterThreshold + distanceBetween),
              });
            }
            if (maxTocTop < $(".post-toc").offset().top) {
              $(".post-toc").offset({ top: maxTocTop });
            }
          }
        }
      })
    }
  };

  Even.prototype.tocFollow = function () {
    var HEADERFIX = 30;
    var $toclink = $('.toc-link'),
      $headerlink = $('.headerlink');

    console.log($toclink)
    $(window).scroll(function () {
      var headerlinkTop = $.map($headerlink, function (link) {
        return $(link).offset().top;
      });
      var scrollTop = $(window).scrollTop();
      for (var i = 0; i < $toclink.length; i++) {
        var isLastOne = i + 1 === $toclink.length,
          currentTop = headerlinkTop[i] - HEADERFIX,
          nextTop = isLastOne ? Infinity : headerlinkTop[i + 1] - HEADERFIX;
        console.log(currentTop, nextTop, scrollTop)
        if (currentTop < scrollTop && scrollTop <= nextTop) {
          $($toclink[i]).addClass('active');
        } else {
          $($toclink[i]).removeClass('active');
        }
      }
    });
  };

  Even.prototype.backToTop = function () {
    var $backToTop = $('#back-to-top');

    $(window).scroll(function () {
      if ($(window).scrollTop() > 100) {
        $backToTop.fadeIn(1000);
      } else {
        $backToTop.fadeOut(1000);
      }
    });

    $backToTop.click(function () {
      $('body,html').animate({ scrollTop: 0 });
    });
  };

  var config = window.config;
  var even = new Even(config);
  even.setup();
}(window))
