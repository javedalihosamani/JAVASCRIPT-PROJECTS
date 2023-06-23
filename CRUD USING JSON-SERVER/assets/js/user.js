const URL = "http://localhost:3000";

let users = [
  /* {
    username: "John",
    email: "john@gmail.com",
    id: 1,
  },
  {
    username: "raju",
    email: "raju12@gmail.com",
    id: 2,
  }, */
];

// create logic
const form = document.getElementById("myForm");
const user = document.getElementById("user");
const email = document.getElementById("email");
const result = document.getElementById("result");

// INSERT A DATA INTO THE SERVER
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // avoid page refresh

  let newUser = {
    username: user.value,
    email: email.value,
  };
  console.log("new user =", newUser);

  let extUser = users.find((item) => item.email === newUser.email);
  console.log("extUser", extUser);

  if (extUser) {
    alert("User email already registered");
  } else {
    await fetch(`${URL}/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((out) => {
        alert("New user created successfully");
      })
      .catch((err) => console.log(err.message));
  }
});

// READ THE DATA ON PAGE LOAD
(function () {
  fetch(`${URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((out) => {
      console.log("users =", out);
      users = out;
      printData(out);
    })
    .catch((err) => console.log(err.message));
})();

// print data
function printData(data) {
  data.forEach((item) => {
    result.innerHTML += `<tr>
              <td> ${item.id} </td>
              <td> ${item.username} </td>
              <td> ${item.email} </td>
              <td>
                  <a href="update.html?id=${item.id}" class="btn btn-success">Edit</a>
                  <button onclick="deleteUser(${item.id})" class="btn btn-warning">Delete</button>
              </td>
      </tr>`;
  });
}

// to delete item
function deleteUser(id) {
  if (window.confirm(`Are you sure to delete an id = ${id}?`)) {
    fetch(`${URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((out) => out.json())
      .then((res) => {
        alert("user deleted successfully");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  } else {
    alert("delete terminated");
  }
}
