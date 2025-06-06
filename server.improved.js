const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [
  { "id": 1, "compInfo": "San Francisco Classic 2021", "level": "Platinum", "vaultScore": 8.9, "barScore":  9.1, "beamScore": 9.25, "floorScore": 8.925, "totalScore": 36.175 },
  { "id": 2, "compInfo": "Region 1 Regionals 2018", "level": "Gold", "vaultScore": 9.3, "barScore":  9.225, "beamScore": 9.5, "floorScore": 9.375, "totalScore": 37.4 },
  { "id": 3, "compInfo": "Worcester Invitational 2022", "level": "Diamond", "vaultScore": 8.9, "barScore":  9.1, "beamScore": 9.25, "floorScore": 8.925, "totalScore": 36.175 }
]

let nextID = 4;

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else if ( request.url === "/loadData" ) {
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end( JSON.stringify(appdata) )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    const data = JSON.parse( dataString )
    console.log( data )

    // ... do something with the data here!!!
    if ( data.compInfo && data.level && data.vaultScore && data.barScore && data.beamScore && data.floorScore ) {
      const totalScore = Number(data.vaultScore) + Number(data.barScore) + Number(data.beamScore) + Number(data.floorScore)
      data.totalScore = Math.round(totalScore * 1000) / 1000

      if ( data.id ) {
        appdata[data.id - 1] = data;
      } else {
        let finalData = {"id": nextID, ...data}
        appdata.push( finalData );

        nextID += 1;
      }

      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end( JSON.stringify(appdata) )
    } else if ( Number(data) < nextID) {
      appdata.splice( Number(data.toDel), 1 )

      appdata.forEach((entry, index) => {
        entry.id = index + 1;
      });

      nextID -= 1;

      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end( JSON.stringify(appdata) )
    } else {
      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end( JSON.stringify(appdata) )
    }
  })
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