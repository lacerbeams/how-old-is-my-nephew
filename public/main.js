console.log('hello from main.js');
var $submit = $('.submit');


function renderTable() {
  $('input').val('');
  $.get('/data', function(items) {
    var chunkOfHtml = $('#people-template').html();
    var template = Handlebars.compile(chunkOfHtml);
    var html = template({items: items});
    $('.details').append(html);
    $('.delete').click(function() {
      var button = $(this);
      var id = button.attr('id');
      var tr = button.closest('tr');
      $.post('/people/' + id + '/delete', function(res) {
        tr.remove();
      })
    })
  })
}

$submit.click(function() {
  console.log('clicked')
  if (!$('input').val()) {
    return false
  } else {
  $.post('/insert', $('#form').serialize());
  location.reload();
  }
});


$(document).ready(renderTable);

