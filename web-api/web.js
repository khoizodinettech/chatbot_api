let Users = [];
var firstName = document.getElementById("first_name").value;
var lastName = document.getElementById("last_name").value;
var email = document.getElementById("email").value;
var avatar = document.getElementById("avatar").value;

function ShowAllUsers() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://reqres.in/api/users", false);
  xhttp.setRequestHeader("x-api-key", "reqres-free-v1");
  xhttp.send();
  var data = JSON.parse(xhttp.responseText);
  var users = data.data;
  renderHTML(users);
  Users = users;
}

function cleanUSers() {
  document.forms[0].reset();
}

function renderHTML(users) {
  var tbody = document.getElementById("users");
  var html = "";
  users.forEach(function (user) {
    html += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td><img src="${user.avatar}" width="50px"></td>
                    <td>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                        <button onclick="editUser(${user.id})">Edit</button>
                </tr>
            `;
  });
  tbody.innerHTML = html;
}

function creatUser(event) {
  event.preventDefault();
  firstName = document.getElementById("first_name").value;
  lastName = document.getElementById("last_name").value;
  email = document.getElementById("email").value;
  avatar = document.getElementById("avatar").value;

  if (firstName && lastName && email) {
    var newUser = {
      id: Users[Users.length - 1].id + 1,
      first_name: firstName,
      last_name: lastName,
      email: email,
      avatar: avatar,
    };
    Users.push(newUser);
    renderHTML(Users);
  } else {
    alert("All fields are required");
  }
  cleanUSers();
}

function deleteUser(id) {
  Users = Users.filter((user) => user.id !== id);
  renderHTML(Users);
}

function editUser(id) {
  var user = Users.find((user) => user.id === id);
  var newFirtName = document.getElementById("first_name").value;
  var newLastName = document.getElementById("last_name").value;
  var newEmail = document.getElementById("email").value;
  var newAvatar = document.getElementById("avatar").value;
  if (user) {
    document.getElementById("first_name").value = user.first_name;
    document.getElementById("last_name").value = user.last_name;
    document.getElementById("email").value = user.email;
    document.getElementById("avatar").value = user.avatar;
    if(newFirtName && newLastName && newEmail && newAvatar) {
      user.first_name = newFirtName;
      user.last_name = newLastName;
      user.email = newEmail;
      user.avatar = newAvatar;
      renderHTML(Users);
      cleanUSers();
    }
  } else {
    alert("User not found");
  }
}

ShowAllUsers();
document.getElementById("form").onsubmit = creatUser;
