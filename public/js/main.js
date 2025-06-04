// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  console.log("submit handler called");
  event.preventDefault()
  console.log("event pd called")

  //each data entry goes through this object
  const data = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    phoneNumber: document.querySelector("#phoneNumber").value
  };

  const body = JSON.stringify(data)
  console.log("data collected");

  //Fetch for submitting button
  const response = await fetch( "/submit", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body 
  })

  console.log("Response receieved")
  const result = await response.json();
  console.log(result)
  //Alert to the user and for us on debugging
  alert(`Thank you! You've been added to the waitlist. As part of our personas for a free drink, you are a ${assignDrinkPersona(data.firstName)}!!! Please keep a lookout for our messages! `);
  document.getElementById("ourForm").reset();
}

//This is similar to the server one, just a little different based on the needs
function assignDrinkPersona(firstName) {
  const firstChar = firstName[0].toUpperCase();
  if (firstChar >= 'A' && firstChar <= 'F') return "Strawberry Matcha";
  else if (firstChar >= 'G' && firstChar <= 'L') return "Brown Sugar Cold Brew";
  else if (firstChar >= 'M' && firstChar <= 'R') return "Blueberry Matcha";
  else return "Chai Latte";
}

// Loads data into the table on the admin page
const loadTableData = async function () {
  const response = await fetch("/entries");
  const data = await response.json();

  //id of Table body
  const tbody = document.getElementById("customerDataBody");
  tbody.innerHTML = ""; // clear previous content


  //Mapping over each possible form fillout. It has the base headers
  data.forEach(entry => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.firstName}</td>
      <td>${entry.lastName}</td>
      <td>${entry.email}</td>
      <td>${entry.phoneNumber || ""}</td>
      <td>${entry.persona}</td>
      <td><button style="background-color: #ed4337; color: white; border-radius: 10px; border: none; padding: 10px" onclick="deleteEntry(${entry.id})">Delete</button></td>
    `;

    tbody.appendChild(row); //adding our user data after submitting
  });
};


// Delete a specific entry
const deleteEntry = async function (id) {
  const response = await fetch("/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  console.log("Delete response status:", response.status);

  if (response.ok) {
    await loadTableData(); //rerender for responsiveness
    console.log("Table data reloaded after delete.");
  } else {
    console.error("Failed to delete entry.");
  }
};

window.onload = function () {
  const form = document.getElementById("ourForm");

  //submit logic for index.html
  if (form) {
    form.addEventListener("submit", submit);
  }

  //table data for tables.html
  const customerDataTable = document.getElementById("customerDataTable");
  if (customerDataTable) {
    loadTableData().then();
  }
};
