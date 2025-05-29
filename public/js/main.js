// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#yourname" ),
        json = {  yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  }).then(function (response) {
    console.log(response.text())
  })
}

//because this is a simple form, we don't need an id for the button since there will just be one
window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}