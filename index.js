function pressViewContacts() {
  document.querySelector("#viewContacts").style.display = "block";
  document.querySelector("#buttons").style.display = "none";
}

function pressAddContact() {
  document.querySelector("#contacts").style.display = "block";
  document.querySelector("#buttons").style.display = "none";
}

function exitButton() {
  if (document.querySelector("#editContact").style.display === "block")
  {
    document.querySelector("#editContact").style.display = "none";
    document.querySelector("#buttons").style.display = "none";
    document.querySelector("#viewContacts").style.display = "block";
  }
  else {
    document.querySelector("#contacts").style.display = "none";
    document.querySelector("#viewContacts").style.display = "none";
    document.querySelector("#editContact").style.display = "none";
    document.querySelector("#buttons").style.display = "block";
  }
}

class contact{
  constructor(name, lastName, birthDate, number, email, address)
  {
    this.name = name;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.number = number;
    this.email = email;
    this.address = address;
  }
}
function setContact(c)
{
  var a;
  if (localStorage.getItem('contact')=== null)
  {
    a = [];
  }
  else{
    a = JSON.parse(localStorage.getItem('contact'));
  }
  a.push(c);
  localStorage.setItem('contact', JSON.stringify(a));
  //alert('Contact has been added succesfully');
}
document.getElementById('contacts').addEventListener('submit', () => {

  const name = document.getElementById('name').value;
  const lastName = document.getElementById('lastName').value;
  const birthDate = document.getElementById('dateOfBirth').value;
  const number = document.getElementById('phoneNumber').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const a = JSON.parse(localStorage.getItem('contact'));

  if (a != null)
  {
    for (var i = 0; i != a.length; ++i)
    {
      if (a[i].email === email || a[i].phoneNumber === number)
      {
        alert("Contact already exists");
        return;
      }
    }
  }
  const person = new contact(name, lastName, birthDate, number, email, address);
  setContact(person);
})
function display(){
  const elements = JSON.parse(localStorage.getItem('contact'));
  var table = document.getElementById('displayContacts');
  var newRow;
  if (elements != null && table.rows.length === 1)
  {
    for (var i = 0; i != elements.length; i++)
    {
      newRow = table.insertRow(1);
      newRow.id = i+'id';

      newRow.insertCell(0).innerHTML = elements[i].name;
      newRow.insertCell(1).innerHTML = elements[i].lastName;
      newRow.insertCell(2).innerHTML = elements[i].birthDate;
      newRow.insertCell(3).innerHTML = elements[i].number;
      newRow.insertCell(4).innerHTML = elements[i].email;
      newRow.insertCell(5).innerHTML = elements[i].address;
      newRow.insertCell(6).innerHTML = '<button class="exit btn" type="button" name="exit" onclick="deleteContact(this)"> X </button>'
      newRow.insertCell(7).innerHTML = '<button class="edit btn" name="edit" onclick="editContent(this)">EDIT</button>'
    }
  }
}
function deleteContact(element){
  element.parentNode.parentNode.remove(); //first parentNode -> td, second -> tr, which has to be deleted
  var index = element.parentNode.parentNode.id[0];
  const elements = JSON.parse(localStorage.getItem('contact'));
  //console.log(elements[index].name);
  elements.splice(index, 1);
  localStorage.setItem('contact', JSON.stringify(elements));
}
function editContent(element){

  document.querySelector("#editContact").style.display = "block";
  document.querySelector("#viewContacts").style.display = "none";

  var index = element.parentNode.parentNode.id[0];
  var elements = JSON.parse(localStorage.getItem('contact'));


  document.getElementById('ename').value = elements[index].name;
  document.getElementById('elastName').value = elements[index].lastName;
  document.getElementById('edateOfBirth').value = elements[index].birthDate;
  document.getElementById('ephoneNumber').value = elements[index].number;
  document.getElementById('eemail').value = elements[index].email;
  document.getElementById('eaddress').value = elements[index].address;

  document.querySelector('#editbtn').addEventListener('click', () => {
    elements[index].name = document.getElementById('ename').value;
    elements[index].lastName = document.getElementById('elastName').value;
    elements[index].birthDate = document.getElementById('edateOfBirth').value;
    elements[index].number = document.getElementById('ephoneNumber').value;
    elements[index].email = document.getElementById('eemail').value;
    elements[index].address = document.getElementById('eaddress').value;

    localStorage.setItem('contact', JSON.stringify(elements));
    location.reload();
  });
}
