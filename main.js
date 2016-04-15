$(document).ready(init);

  function init(){
    $('#save-changes').click(appendContacts);
    initPopover();
  }

  function initPopover() {
    $('.phone').popover();
  }


  function appendContacts(){
    var nameVal = $('#name').val();
    var emailVal = $('#input-email').val();
    var phoneVal = $('#tel').val().substring(0,3) + '-' + $('#tel').val().substring(3,6) + '-' + $('#tel').val().substring(6);
    var imageurl = $('#image-url').val();
    var $copyTemplate = $(".template").clone();
    $('#myForm').trigger('reset');
    $copyTemplate.removeClass('template');
    $copyTemplate.find('.img-circle').attr("src", imageurl);
    $copyTemplate.find('h3').text(nameVal);
    $copyTemplate.find('.glyphicon-phone').attr("data-content", phoneVal);
    $copyTemplate.find('.glyphicon-comment').attr("data-content", emailVal);

    $('.list-group').append($copyTemplate);
    initPopover();

  }
