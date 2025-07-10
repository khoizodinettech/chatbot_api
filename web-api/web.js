let Users = [];

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

ShowAllUsers();
function creatUser(event) {
  event.preventDefault();
  var firstName = document.getElementById("first_name").value;
  var lastName = document.getElementById("last_name").value;
  var email = document.getElementById("email").value;
  var avatar = document.getElementById("avatar").value;
  if (firstName && lastName && email) {
    var newUser = {
      id: Users.length + 1,
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
document.getElementById("form").onsubmit = creatUser;
function deleteUser(id) {
  Users = Users.filter((user) => user.id !== id);
  renderHTML(Users);
}
function editUser(id) {
  var user = Users.find((user) => user.id === id);
  if (user) {
    var newFirstName = prompt("Enter new first name:", user.first_name);
    var newLastName = prompt("Enter new last name:", user.last_name);
    var newEmail = prompt("Enter new email:", user.email);
    if (newFirstName && newLastName && newEmail) {
      user.first_name = newFirstName;
      user.last_name = newLastName;
      user.email = newEmail;
      user.avatar = prompt("Enter new avatar URL:", user.avatar);
      renderHTML(Users);
    }
  } else {
    alert("User not found");
  }
}
