var userId,
    audioChop,
    audioBeanStalk;
function ajax(url, type) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}
function dashboard() {
  'use strict';
  ajax(("/users/" + userId), 'get', null, (function(h) {
    drawDashboard(h);
  }));
}
function drawDashboard(h) {
  'use strict';
  userId = $(h).find('#user').attr('data-id');
  $('#dashboard').empty().append(h);
}
function forest() {
  'use strict';
  ajax(("/trees?userId=" + userId), 'get', null, (function(h) {
    $('#forest').empty().append(h);
  }));
}
(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#sell-wood', sellWood);
    $('#dashboard').on('click', '#purchase-autogrow', purchaseAutoGrow);
    $('#dashboard').on('click', '#purchase-autoseed', purchaseAutoSeed);
    $('#dashboard').on('click', '#purchase-autoroot', purchaseAutoRoot);
    $('#dashboard').on('click', '#purchase-castle', purchaseCastle);
    preloadAssets();
  }
  function preloadAssets() {
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chop.mp3';
    audioBeanStalk = $('<audio>')[0];
    audioBeanStalk.src = '/audios/beanstalk.mp3';
  }
  function purchaseAutoGrow() {
    ajax(("/users/" + userId + "/purchase/autogrow"), 'put', null, (function(h) {
      drawDashboard(h);
      items();
    }));
  }
  function purchaseAutoSeed() {
    ajax(("/users/" + userId + "/purchase/autoseed"), 'put', null, (function(h) {
      drawDashboard(h);
      items();
    }));
  }
  function purchaseAutoRoot() {
    ajax(("/users/" + userId + "/purchase/autoroot"), 'put', null, (function(h) {
      drawDashboard(h);
      items();
    }));
  }
  function purchaseCastle() {
    ajax(("/users/" + userId + "/purchase/castle"), 'put', null, (function(h) {
      drawDashboard(h);
      items();
    }));
  }
  function sellWood() {
    var amount = $('#wood-amt').val();
    ajax(("/users/" + userId + "/sellwood"), 'put', {amount: amount}, (function(h) {
      drawDashboard(h);
    }));
  }
  function chop() {
    audioChop.play();
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/chop/" + userId), 'put', null, (function(h) {
      tree.replaceWith(h);
      dashboard();
    }));
  }
  function grow() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/grow"), 'put', null, (function(h) {
      tree.replaceWith(h);
      if ($(h).hasClass('beanstalk')) {
        audioBeanStalk.play();
      }
    }));
  }
  function plant() {
    ajax('/trees/plant', 'post', {userId: userId}, (function(h) {
      $('#forest').append(h);
    }));
  }
  function items() {
    ajax(("/users/" + userId + "/items"), 'get', null, (function(h) {
      $('#items').empty().append(h);
    }));
  }
  function login() {
    var username = $('#username').val();
    ajax('/login', 'post', {username: username}, (function(h) {
      $('#username').val('');
      drawDashboard(h);
      forest();
      items();
    }));
  }
})();

//# sourceMappingURL=game.map
