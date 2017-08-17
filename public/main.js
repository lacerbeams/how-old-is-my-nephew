console.log('hello from main.js');
var $submit = $('.submit');
var today = new Date()
var todaysDate = today.getDate()
var todaysMonth = today.getMonth() + 1
var todaysYear = today.getFullYear()

function renderTable() {
  $('input').val('');
  $.get('/data', function(items) {
    console.log(items)
    // var chunkOfHtml = $('#people-template').html();
    // var template = Handlebars.compile(chunkOfHtml);
    // var html = template({items: items});
    for (var i = 0; i < items.length; i++){
      var person = items[i].person
      var birthDate = items[i].birthdate.split('-');
      var birthDateDisplay = birthDate.join('-');
      var birthMonth = parseInt(birthDate[1]);
      var birthYear = birthDate[0];
      if(todaysMonth === birthMonth && todaysDate >= parseInt(birthDate[2])) {
          var age = todaysYear - birthYear;
        } else if (todaysMonth > birthMonth) {
          var age = todaysYear - birthYear;
        } else {
        var age = todaysYear - birthYear - 1;
      }
      html = `
      <tr>
        <td class="person"> ${person} </td>
        <td class="age"> ${age} </td>
        <td>
          <button id="${items[i]._id}" class="delete">Delete</button>
        </td>
      </tr>
      `
      $('.details').append(html);
    $('.delete').click(function() {
      var button = $(this);
      var id = button.attr('id');
      var tr = button.closest('tr');
      $.post('/people/' + id + '/delete', function(res) {
        tr.remove();
      })
    })
    }
  })
}

$submit.click(function() {
  console.log('clicked')
  if (!$('input').val()) {
    return false
  } else {
    var data = $('#form').serialize();
    data.id = $('#status').attr('class');
    console.log(data);
    $.post('/insert', data);
    location.reload();
  }
});



// $(document).ready(renderTable);

        // <td class="birthdate"> ${birthDateDisplay} </td>
