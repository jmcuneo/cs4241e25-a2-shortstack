// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  //each data entry goes through this object
  const data = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    phoneNumber: document.querySelector("#phoneNumber").value
  };

  const body = JSON.stringify(data)

  const response = await fetch( "/submit", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body 
  })

  console.log("it worked main.js")
  const result = await response.json();
  console.log(result)
  alert("Thank you! You've been added to the waitlist.");
  document.getElementById("ourForm").reset();
}


// Loads data into the table on the admin page
const loadTableData = async function () {
  const response = await fetch("/entries");
  const data = await response.json();

  const tbody = document.getElementById("customerDataBody");
  tbody.innerHTML = ""; // clear previous content

  data.forEach(entry => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.firstName}</td>
      <td>${entry.lastName}</td>
      <td>${entry.email}</td>
      <td>${entry.phoneNumber || ""}</td>
      <td>${entry.persona}</td>
      <td><button onclick="deleteEntry(${entry.id})">Delete</button></td>
    `;

    tbody.appendChild(row);
  });
};

// Delete a specific entry
const deleteEntry = async function (id) {
  await fetch("/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  await loadTableData(); // Refresh the table
};

window.onload = function() {
   const button = document.getElementById("submitButton");
  document.getElementById("submitButton").addEventListener("submit", submit);
  button.onclick = submit;

  const customerDataTable = document.getElementById("customerDataTable");
  if (customerDataTable) {
    loadTableData(); // Only call this on tables.html
  }

}