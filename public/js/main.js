// FRONT-END (CLIENT) JAVASCRIPT HERE

clientspendingdata = []

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
  
  const item = document.querySelector( "#item" ),
        price = document.querySelector( "#price" ),
        category = document.querySelector( "#category" ),
        note = document.querySelector( "#note" ),
        json = { "item": item.value, "price": price.value, "category": category.value, "note": note.value },
        body = JSON.stringify( json )
        //console.log(body)
        //console.log(category.value)

  let nexturl = "";

  const response = await fetch( "spending-list.html", {
    method:"POST",
    body 
  }).then( function(serverresponse) {
      nexturl = serverresponse.url;
      return serverresponse.json()
  }).then ( function(json) {
      console.log(json)
      //let receivedData = JSON.parse(json);
      clientspendingdata = json;
      console.log(clientspendingdata)
      
      /* json.forEach( item => {

        const p = document.createElement('p')
        p.innerText = JSON.stringify(item)
        document.body.appendChild(p)

      }) */
  })

  //const text = await response.text();

  window.location.href = nexturl;

  console.log( "text:", text );
}

// fills in the whole table for spending-list.html based on spendingdata in server.improved.js
const populateTable = function() {
  const table = document.getElementById("itemtablebody");
  clientspendingdata.forEach( item => {
    let row = table.insertRow();
    let tdate = row.insertCell(0);
    tdate.innerHTML = item.date
    let titem = row.insertCell(1);
    titem.innerHTML = item.item
    let tprice = insertCell(2);
    tprice.innerHTML = item.price
    let tcategory = insertCell(3);
    tcategory.innerHTML = item.category
    let tnote = insertCell(4);
    tnote.innerHTML = item.note
  });
}

// when window is loaded this will run first
window.onload = function() {
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    const button = document.getElementById("sending");
    button.onclick = submit; // this will call the function submit upon the button being clicked
  }
  
};