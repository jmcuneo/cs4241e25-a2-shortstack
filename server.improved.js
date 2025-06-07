const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

      // run the server using "npm start" in the terminal
      // open website by going to localhost:3000

// data already in the database
let _nextid = 1;
const spendingdata = [
  { "item": "Laundry Detergent", "price": "$17.23", "discount": "0%", "category": "general", "note": "This was the small tide podes", "id": 0, "date": "6-4-2025", "moneySaved": "$0.00" }
]

// server is created, can handle GET and POST method requests
const server = http.createServer( function( request,response ) {

  if( request.method === "GET" ) {
    handleGet( request, response );
  }else if( request.method === "POST" ){
    handlePost( request, response );
  }else if (request.method === "DELETE") {
    handleDelete( request, response );
  }
})

// handles all GET method requests
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 );

  if( request.url === "/" || request.url === "/index.html" ) {
    sendFile( response, "public/index.html" );
  }else if ( request.url === "/spending-list.html" ) {
    sendFile( response, "public/spending-list.html" );
  }else if (request.url === "/obtainData.json") {
    giveData(response);
  }else{
    // invalid requests are handled by sendFile function
    sendFile( response, filename );
  }
}

// handles all POST method requests
const handlePost = function( request, response ) {
  let dataString = []

  request.on( "data", function( data ) {
      dataString = JSON.parse(data);
      dataString.id = _nextid;
      _nextid++;
      dataString.date = getDate();
      dataString.moneySaved = "$" + calcMoneySaved( parseFloat(dataString.price), parseFloat(dataString.discount) );

      dataString.price = "$" + parseFloat(dataString.price).toFixed(2);
      dataString.discount = "" + dataString.discount + "%";
      spendingdata.unshift(dataString);
  })

  request.on( "end", function() {
    response.writeHead( 200, "OK", {"Content-Type": "application/json" });
    response.url = "public/index.html";
    let body = JSON.stringify( spendingdata );
    response.end(body)
  })
}

const handleDelete = function( request, response ) {
  let dataid = {}
  
  request.on( "data", function( data ) {
      dataid = JSON.parse(data);

      const index = spendingdata.findIndex(item => item.id === dataid.idNumDel);
      if (index === -1) {
        response.writeHeader( 500 );
        response.end( "500 Error: Server Side Error - Could not delete item" );
      } else {
        spendingdata.splice(index, 1);
        response.writeHead( 200, "OK", {"Content-Type": "application/json" });
        let body = JSON.stringify( spendingdata );
        response.end(body)
      }
  })
}

const getDate = function() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${month}-${day}-${year}`;

  return currentDate;
}

const giveData = function(response) {
  response.writeHead( 200, "OK", {"Content-Type": "application/json" });
  let body = JSON.stringify( spendingdata );
  response.end(body)
}

const calcMoneySaved = function(paid, discount) {
  let monCalc = (paid * 100) / (100 - discount);
  return (monCalc - paid).toFixed(2);
}

// for responding to file (page) requests
const sendFile = function( response, filename ) {
   const type = mime.getType( filename );

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type });
       response.end( content );

     }else{

       // file not found, error code 404
       response.writeHeader( 404 );
       response.end( "404 Error: File Not Found" );

     }
   })
}

server.listen( process.env.PORT || port );
