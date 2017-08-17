console.log('hello from main.js');
var $submit = $('.submit');
var today = new Date()
var todaysDate = today.getDate()
var todaysMonth = today.getMonth() + 1
var todaysYear = today.getFullYear()

function renderTable() {
  $('input').val('');
  var data = {};
  data.name = document.forms[0].elements[0].value;
  data.birthdate = document.forms[0].elements[1].value;
  data.userID = $('#status').attr('class');
  $.ajax({
    url: "/data/"+data.userID,
    type: "get",
    data: data,
    success: function(items) {
    console.log(items)
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
  },
    error: function(xhr) {
      console.log('error');
    }
});

  // $.get('/data', function(items) {
  //   console.log(items)
  //   for (var i = 0; i < items.length; i++){
  //     var person = items[i].person
  //     var birthDate = items[i].birthdate.split('-');
  //     var birthDateDisplay = birthDate.join('-');
  //     var birthMonth = parseInt(birthDate[1]);
  //     var birthYear = birthDate[0];
  //     if(todaysMonth === birthMonth && todaysDate >= parseInt(birthDate[2])) {
  //         var age = todaysYear - birthYear;
  //       } else if (todaysMonth > birthMonth) {
  //         var age = todaysYear - birthYear;
  //       } else {
  //       var age = todaysYear - birthYear - 1;
  //     }
  //     html = `
  //     <tr>
  //       <td class="person"> ${person} </td>
  //       <td class="age"> ${age} </td>
  //       <td>
  //         <button id="${items[i]._id}" class="delete">Delete</button>
  //       </td>
  //     </tr>
  //     `
  //     $('.details').append(html);
  //   $('.delete').click(function() {
  //     var button = $(this);
  //     var id = button.attr('id');
  //     var tr = button.closest('tr');
  //     $.post('/people/' + id + '/delete', function(res) {
  //       tr.remove();
  //     })
  //   })
  //   }
  // })
}

$submit.click(function() {
  console.log('clicked')
  if (!$('input').val()) {
    return false
  } else {
    var data = {};
    data.name = document.forms[0].elements[0].value;
    data.birthdate = document.forms[0].elements[1].value;
    data.userID = $('#status').attr('class');
    console.log(data);
    $.post('/insert', data);
    // location.reload();
    renderTable();
  }
});



// $(document).ready(renderTable);

        // <td class="birthdate"> ${birthDateDisplay} </td>
