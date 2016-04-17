'use strict';
$(document).ready(init);

function init() {
  renderContacts();
  $('.glyphicon-plus').click(openModal);
  $(".container").on('click', ".glyphicon-pencil", openModal);
  initPopover();
  $(".container").on('click', ".glyphicon-trash", removeContact);
}
var parentData;
var parentDataIndex;
function openModal() {
  // console.log($(this).attr("button-type"));
  if($(this).attr("button-type") === "add"){
    document.getElementById("myForm").reset();
    $('#addContact').modal('show');
    $("#myForm").one("submit", storeContacts);
  }
  else if($(this).attr("button-type") === "edit"){
    $('#addContact').modal('show');
    parentData = $(this).parent();
    parentDataIndex = parentData.index();
    loadContacts();
    $("#myForm").one("submit", editContact);
  }

}

function loadContacts(){
  $('#name').val(parentData.find('h3').text());
  $('#input-email').val(parentData.find('.glyphicon-comment').attr("data-content"));
  $('#tel').val(parentData.find('.glyphicon-phone').attr("data-content"));
  var imageSrc = parentData.find('img').attr("src");
  if(imageSrc === "http://s3-us-west-1.amazonaws.com/witty-avatars/default-avatar-2-l.jpg") {
    $('#image-url').val("");
  }
  else {
    $('#image-url').val(imageSrc);
  }

}

function editContact(event){
  event.preventDefault();

  var nameVal = $('#name').val();
  var emailVal = $('#input-email').val();
  var phonesVal = $('#tel').val().substring(0, 3) + '-' + $('#tel').val().substring(3, 6) + '-' + $('#tel').val().substring(6);
  var imageurl = $('#image-url').val();
  $('#addContact').modal('hide');

  var contacts = NameStorage.get();

  var newContact = {
    "name": nameVal,
    "email": emailVal,
    "phone": phonesVal,
    "image": imageurl
  };

  contacts[parentDataIndex] = newContact;

  NameStorage.set(contacts);
  renderContacts();
}

function removeContact(event) {
  var contacts = NameStorage.get();
  var index = $(this).parents().index();

  contacts.splice(index, 1);
  NameStorage.set(contacts);
  renderContacts();
}

function initPopover() {
  $('.phone').popover();
}

var NameStorage = {
  get: function() {
    try {
      var contacts = JSON.parse(localStorage.contacts);
    } catch (err) {
      var contacts = [];
    }
    return contacts;
  },
  set: function(contacts) {
    localStorage.contacts = JSON.stringify(contacts);
  }
};


function storeContacts(event) {
  event.preventDefault();
  var nameVal = $('#name').val();
  var emailVal = $('#input-email').val();
  var phonesVal = $('#tel').val().substring(0, 3) + '-' + $('#tel').val().substring(3, 6) + '-' + $('#tel').val().substring(6);
  var imageurl = $('#image-url').val();


  $('#addContact').modal('hide');

  var contacts = NameStorage.get();
  var newContact = {
    "name": nameVal,
    "email": emailVal,
    "phone": phonesVal,
    "image": imageurl
  };
  contacts.push(newContact);
  NameStorage.set(contacts);
  renderContacts();
}

function renderContacts() {

  $('.list-group').empty();
  var contacts = NameStorage.get();

  for (var i = 0; i < contacts.length; i++) {
    var $copyTemplate = $(".template").clone();
    $copyTemplate.removeClass('template');
    $copyTemplate.find('.img-circle').attr("src", contacts[i].image || "http://s3-us-west-1.amazonaws.com/witty-avatars/default-avatar-2-l.jpg");
    $copyTemplate.find('h3').text(contacts[i].name);
    $copyTemplate.find('.glyphicon-phone').attr("data-content", contacts[i].phone);
    $copyTemplate.find('.glyphicon-comment').attr("data-content", contacts[i].email);

    $('.list-group').append($copyTemplate);
    initPopover();
  }

}
