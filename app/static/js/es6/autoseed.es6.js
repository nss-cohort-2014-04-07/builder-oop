/* global ajax, userId */

(function(){
  'use strict';

  init();

  function init(){
    $('#autoseed').click(seed);
  }

  var isOn = false;
  var timer;

  function seed(){
    isOn = !isOn;
    $('#autoseed').toggleClass('on');

    if(isOn){
      start();
    }else{
      clearInterval(timer);
    }
  }

  function start(){
    clearInterval(timer);
    timer = setInterval(seeding, 500);
  }

  function seeding(){
    var growable = $('.alive:not(.beanstalk)').length;

    if(growable < 50){
      ajax('/trees/plant', 'post', {userId:userId}, h=>{
        $('#forest').append(h);
      });
    }
  }
})();
