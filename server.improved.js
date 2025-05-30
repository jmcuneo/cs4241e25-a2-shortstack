const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [] //object to handle data

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

//data routed to tables.html
const handleGet = function (request, response) {
  if (request.url === "/") {
    sendFile(response, "public/index.html");
  }
  else if (request.url === "/entries") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  } else {
    const filename = dir + request.url.slice(1);
    sendFile(response, filename);
  }
};


const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {

    //submitting data, it also will do calculations for drinkPersona
    if (request.url === "/submit") {
      const customerData = JSON.parse(dataString);
      customerData.id = appdata.length;
      assignDrinkPersona(customerData);
      appdata.push(customerData);

      //indicate that we have successfully submitted, and alerts + console logs are seen
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ status: "success", entry: customerData }));
    }
    //deleting an entry
    else if (request.url === "/delete") {
      const index = JSON.parse(dataString);
      appdata.splice(parseInt(index.id), 1);
      // reassign IDs
      appdata.forEach((entry, i) => entry.id = i);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ status: "deleted" }));
    }
    //it did not work
    else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: "Invalid POST route" }));
    }
  });
};


// This is my derived field function which uses firstName. The alphabet is split into 4 ways, and so using the first character of their first name,
// I created a mini persona for them for fun.
function assignDrinkPersona(item) {
  const firstChar = item.firstName[0].toUpperCase();
  if (firstChar >= 'A' && firstChar <= 'F') item.persona = "Strawberry Matcha";
  else if (firstChar >= 'G' && firstChar <= 'L') item.persona = "Brown Sugar Cold Brew";
  else if (firstChar >= 'M' && firstChar <= 'R') item.persona = "Blueberry Matcha";
  else item.persona = "Chai Latte";
}


const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
