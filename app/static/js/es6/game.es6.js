(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#plant').click(plant);
  }

  function plant(){
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId:userId}, h =>{
      $('#forest').append(h);
    });
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username:username}, h =>{
      $('#dashboard').empty().append(h);
    });
  }

  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
    $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
  }
})();
