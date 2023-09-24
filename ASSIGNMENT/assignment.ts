import http, {ServerResponse, IncomingMessage} from 'http'
import fs from "fs"
import path from "path"



const port = 2007

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
   res.writeHead(200)
   
   let myLink = "MyCompany/"

   switch(req.url){
   case "/":
    myLink += "home.html";
    res.statusCode = 200;
    break; 
      
    case "/features":
        myLink += "features.html";
        res.statusCode = 200;
        break;
    case "/services":
        myLink += "/services.html"
        res.statusCode = 200;
        break;
    case "/contacts":
        myLink += "contacts.html";
        res.statusCode = 200;
        break;
    default:
        myLink += "404.html";
        res.statusCode = 404;
        break; 
   }  
   fs.readFile(path.join(__dirname, myLink), (error, data)=>{
    if(error){
        console.log("An error occured", error)
    }else {
        res.write(data)
        res.end()
    }
   })
})

server.listen(port, ()=>{
    console.log("port running at", port)
}) 