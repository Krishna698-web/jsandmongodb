const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const content = document.getElementById("content");

const addContentHandler = (data) => {
  let html =
    `<div id=${data._id}>` +
    `<ul>` +
    `<li>${data.name}</li>` +
    `<li>${data.email}</li>` +
    `<li>${data.password}</li>` +
    `</ul>` +
    `<button>Edit</button>` +
    `</div>`;

  // console.log(html);
  return html;
};

window.onload = async () => {
  const response = await fetch("http://localhost:3001/upload");
  const data = await response.json();
  const displayHTML = data.map((d) => addContentHandler(d));
  content.innerHTML = displayHTML;
};

// data is been posted to database
form.onsubmit = async (e) => {
  e.preventDefault();

  let user = {
    name: username.value,
    email: email.value,
    password: password.value,
  };

  const response = await fetch("http://localhost:3001/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
};
