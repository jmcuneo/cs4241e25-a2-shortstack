const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = []

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
  } else if (request.url === "/tasks") {
    sendFile( response, "public/tasks.html" )
  } else if (request.url === "/entries") {
    response.writeHead( 200, { "Content-Type": "application/json" })
    response.end(JSON.stringify(appdata))
  } else {
    const fileName = dir + request.url.slice( 1 );
    sendFile( response, fileName );
  }
};

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )

    if (request.url === "/submit") {
      const taskData = JSON.parse( dataString );
      taskData.id = appdata.length;
      taskData.originalPriority = taskData.taskPriority;
      taskData.taskDeadline = calculateDeadline(taskData);
      appdata.push(taskData);

      response.writeHead( 200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ status: "success", entry: taskData }));
    } else if (request.url === "/complete") {
      const { id, completed } = JSON.parse(dataString);
      const task = appdata.find(task => task.id === id);
      if (task) {
        task.completed = completed;
        if (completed) {
          task.taskPriority = "past";
        } else {
          task.taskPriority = task.originalPriority || "Low";
        }
      }
      response.writeHead( 200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ status: "success" }));
    } else {
      response.writeHead( 404, { "Content-Type": "text/plain" });
      response.end("404 Error: Endpoint Not Found");
      return;
    }
  })
}

function calculateDeadline( data ) {
  const today = new Date();
  const deadline = new Date(data.taskDueDate);
  const timeDiff = deadline - today;
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
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
