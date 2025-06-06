// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
  
  const item = document.querySelector( "#item" ),
        price = document.querySelector( "#price" ),
        discount = document.querySelector( "#discount" ),
        category = document.querySelector( "#category" ),
        note = document.querySelector( "#note" ),
        json = { "item": item.value, "price": price.value, "discount": discount.value, "category": category.value, "note": note.value },
        body = JSON.stringify( json )

  const response = await fetch( "/index.html", {
    method:"POST",
    body 
  }).then( function(serverresponse) {
      //serverresponse.json()
      if (serverresponse.status === 200) {
        alert("Item was successfully added!")
      } else {
        alert("Oops, something went wrong!")
      }
  })
  window.location.reload(true);
}

// fills in the whole table for spending-list.html based on spendingdata in server.improved.js
const populateTable = async function() {
  const table = document.getElementById("itemtablebody");

  await fetch( "obtainData.json", {
    method:"GET"
  })
    .then( function(serverresponse) {
      if (serverresponse.status !== 200) {
        alert("Oops, something went wrong and table wasn't able to load!")
      }
      receivedData = serverresponse.json()
      console.log(receivedData);
      return receivedData
  }).then( function(clientspendingdata) {
    clientspendingdata.forEach( item => {
      let row = table.insertRow();
      let tdate = row.insertCell(0);
      tdate.innerHTML = item.date
      let titem = row.insertCell(1);
      titem.innerHTML = item.item
      let tprice = row.insertCell(2);
      tprice.innerHTML = item.price
      let tdiscount = row.insertCell(3);
      tdiscount.innerHTML = item.discount
      let tmoneySaved = row.insertCell(4);
      tmoneySaved.innerHTML = item.moneySaved
      let tcategory = row.insertCell(5);
      tcategory.innerHTML = item.category
      let tnote = row.insertCell(6);
      tnote.innerHTML = item.note
    });
  });

  
}

// when window is loaded this will run first
window.onload = function() {
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    const button = document.getElementById("sending");
    button.onclick = submit; // this will call the function submit upon the button being clicked
  }
  
};