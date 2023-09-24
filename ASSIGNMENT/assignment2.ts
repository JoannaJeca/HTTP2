import http, { IncomingMessage, ServerResponse } from "http"
import os from "os"



 const port = 2007

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.writeHead(200)
    let name = os.hostname()
    let props = os.cpus()[0].model
    let browserName = req.rawHeaders[7].split(" ").splice(2, 2)

    if(req.url ==="/" && res.statusCode === 200 && req.method === "GET"){
    res.setHeader("Content-type", "text/html")
    res.write(`<html><body><h3>Hey there! <p>You are using ${browserName} to access me from ${name}, ${props}</p></h3></body></html>`)
    res.end()
    }else{
        res.end()
    }
});

server.listen(port, ()=>{
    console.log("Port running on", port)
})



