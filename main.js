var john = {
  name: 'John',
  birthDate: new Date()
}
john.birthDate.setFullYear(1947, 5, 15)

var claudia = {
  name: 'Claudia',
  birthDate: new Date()
}
claudia.birthDate.setFullYear(1955, 2, 24)

var amanda = {
  name: 'Amanda',
  birthDate: new Date()
}
amanda.birthDate.setFullYear(1981, 9, 7)

var jay = {
  name: 'Jay',
  birthDate: new Date()
}
jay.birthDate.setFullYear(1968, 3, 18)

var michele = {
  name: 'Michele',
  birthDate: new Date()
}
michele.birthDate.setFullYear(1969, 4, 13)

var devyn = {
  name: 'Devyn',
  birthDate: new Date()
}
devyn.birthDate.setFullYear(1997, 2, 4)

var mekenna = {
  name: 'Mekenna',
  birthDate: new Date()
}
mekenna.birthDate.setFullYear(1999, 11, 29)

var tanner = {
  name: 'Tanner',
  birthDate: new Date()
}
tanner.birthDate.setFullYear(2003, 3, 22)

var griffin = {
  name: 'Griffin',
  birthDate: new Date()
}
griffin.birthDate.setFullYear(2004, 7, 27)

var chris = {
  name: 'Chris',
  birthDate: new Date()
}
chris.birthDate.setFullYear(1971, 11, 24)

var regina = {
  name: 'Regina',
  birthDate: new Date()
}
regina.birthDate.setFullYear(1972, 2, 5)

var gabbie = {
  name: 'Gabbie',
  birthDate: new Date()
}
gabbie.birthDate.setFullYear(1994, 0, 29)

var vinny = {
  name: 'Vinny',
  birthDate: new Date()
}
vinny.birthDate.setFullYear(2003, 2, 13)

var denyel = {
  name: 'Denyel',
  birthDate: new Date()
}
denyel.birthDate.setFullYear(1996, 2, 17)

var shannon = {
  name: 'Shannon',
  birthDate: new Date()
}
shannon.birthDate.setFullYear(1967, 1, 3)

var trisha = {
  name: 'Trisha',
  birthDate: new Date()
}
trisha.birthDate.setFullYear(1993, 8, 9)

var gregory = {
  name: 'Gregory',
  birthDate: new Date()
}
gregory.birthDate.setFullYear(2003, 11, 8)

var today = new Date()

var todaysDate = today.getDate()

var todaysMonth = today.getMonth()

var todaysYear = today.getFullYear()

function calcAge(person) {
  var birthMonth = person.birthDate.getMonth() + 1;
  var birthYear = person.birthDate.getFullYear();
  if (todaysMonth >= birthMonth && todaysDate >= person.birthDate.getDate()){
    var age = todaysYear - birthYear;
  } else {
    var age = todaysYear - birthYear - 1;
  }
  var html = `
    <tr>
      <td>${person.name}</td>
      <td>${birthMonth}-${person.birthDate.getDate()}-${person.birthDate.getFullYear()}</td>
      <td>${age}</td>
    </tr>
    `
  $('tbody').append(html);
};

var family =
[
john,
claudia,
amanda,
jay,
michele,
devyn,
mekenna,
tanner,
griffin,
chris,
regina,
gabbie,
vinny,
denyel,
shannon,
trisha,
gregory
];

family.forEach(function(person) {
  calcAge(person);
});






