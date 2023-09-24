const http = require ("http")

// const PORT = 2007

// const myServer = http.createServer((request, response)=>{
//     response.writeHead(200)
//     response.write("server is up and running 😍✔")
//     response.end()
// })

// myServer.listen(PORT, ()=>{
//     console.log("Port is running")
// } )




const port = 2008
const server = http.createServer((req, res)=>{
    if (req.url === "/"){
        res.writeHead(200, {"content-type": "text/html"})
        res.write(`<html><body><p>This is Home page</p></body></html>`)
    }else if (req.url === "/about"){
        res.write(`<html><body><p>This is About page</p></body></html>`)
    }else if (req.url === "/contacts"){
        res.write(`<html><body><p>This is Contact page</p></body></html>`)
        res.end()
    }else res.end("Invalid Request" )
    }
) 

server.listen(port, ()=>{
    console.log("Port working", port)
}) 