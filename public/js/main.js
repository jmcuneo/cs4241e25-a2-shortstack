// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const item = document.querySelector( "#item" ),
        price = document.querySelector( "#price" ),
        category = document.querySelector( "#category" ),
        note = document.querySelector( "#note" ),
        json = { "item": item.value, "price": price.value, "category": category.value, "note": note.value },
        body = JSON.stringify( json )

  const response = await fetch( "spending-list.html", {
    method:"POST",
    body 
  })
  /* .then( function(response) {
      return response.json()
  }).then ( function(json) {
      //console.log(json)
      
      json.forEach( item => {

        const p = document.createElement('p')
        p.innerText = JSON.stringify(item)
        document.body.appendChild(p)

      })
  }) */

  const text = await response.text()

  window.location.href = "" + response.url

  console.log( "text:", text )
}

window.onload = function() {
  if (window.location.pathname === "/spending-list.html") {
    const button = document.getElementById("sending");
    button.onclick = submit;
  }
  
};