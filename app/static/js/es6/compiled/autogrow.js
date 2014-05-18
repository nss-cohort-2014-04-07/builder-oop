(function() {
  'use strict';
  init();
  function init() {
    $('#autogrow').click(grow);
    displaySlider();
  }
  var isOn = false;
  var timer;
  function grow() {
    isOn = !isOn;
    $('#autogrow').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(growing, 250);
  }
  function growing() {
    $('.alive:not(.beanstalk)').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var tree = $((".tree[data-id=" + v + "]"));
      var height = tree.attr('data-height') * 1;
      var limit = $('#range-slider').val() * 1;
      if (height < limit) {
        ajax(("/trees/" + v + "/grow"), 'put', null, (function(h) {
          tree.replaceWith(h);
          if ($(h).hasClass('beanstalk')) {
            audioBeanStalk.play();
          }
        }));
      } else {
        audioChop.play();
        ajax(("/trees/" + v + "/chop/" + userId), 'put', null, (function(h) {
          tree.replaceWith(h);
          dashboard();
        }));
      }
    }));
  }
  function displaySlider() {
    $('#range-slider').noUiSlider({
      start: 4000,
      range: {
        'min': 4,
        'max': 10000
      },
      serialization: {
        lower: [$.Link({target: $('#range-output')})],
        format: {
          decimals: 0,
          mark: ','
        }
      }
    });
  }
})();

//# sourceMappingURL=autogrow.map
