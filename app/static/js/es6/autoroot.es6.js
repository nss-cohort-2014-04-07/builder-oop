/* global ajax, forest */

(function(){
  'use strict';

  init();

  function init(){
    $('#autoroot').click(root);
  }

  var isOn = false;
  var timer;

  function root(){
    isOn = !isOn;
    $('#autoroot').toggleClass('on');

    if(isOn){
      start();
    }else{
      clearInterval(timer);
    }
  }

  function start(){
    clearInterval(timer);
    timer = setInterval(rooting, 5000);
  }

  function rooting(){
    ajax(`/trees/${userId}/root`, 'delete', null, ()=>forest());
  }
})();
