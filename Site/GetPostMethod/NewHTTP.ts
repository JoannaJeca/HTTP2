import http, {ServerResponse, IncomingMessage} from "http"

const port = 2008

interface iMessage{
    message:string
    success:boolean
    data:null | {} | {}[]
}

interface iData{
    id:number
    name:string
    phone:number
    stack:string
}

const set08:iData [] = [
    {
        id: 1,
        name:"Jemima",
        phone:90283645587,
        stack:"Full-stack"
    },
    {
        id: 2,
        name:"Jessica",
        phone:90283645587,
        stack:"Full-stack"
    },
    {
        id: 3,
        name:"Zion",
        phone:90283645587,
        stack:"Full-stack"
    },
    {
        id: 4,
        name:"Ayo",
        phone:90283645587,
        stack:"Full-stack"
    },
    {
        id: 5,
        name:"Stanley",
        phone:90283645587,
        stack:"Full-stack"
    },
    
 ] 

const myServer = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {method, url} = req
    let status:number = 404

    let response:iMessage = {
        message : "failed",
        success : false,
        data : null
    };

    const container:any = [];
    
    req
       .on("data", (chunk:any)=>{
        container.push(chunk);
       })
       .on("end", ()=>{
        //GET method
        if(url === "/" && method === "GET"){
            status = 200;
            response.message = "All set08 data gotten";
            response.success = true;
            response.data = set08;
            res.write(JSON.stringify({response, status}));
            res.end()
        }

        //POST method
        if(url === "/" && method ==="POST"){
            status=201;
            const body = JSON.parse(container);
            set08.push(body);
            response.message = "SUCCESSFULLY created/addded"
            response.success = true;
            response.data = set08;
            res.write(JSON.stringify({response, status}));

            res.end()
        }

       })
    

});
myServer.listen(port, ()=>{
    console.log("Port running on ", port)
})