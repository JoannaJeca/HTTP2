import http, {ServerResponse, IncomingMessage} from "http"

interface iData{
    id:number
    name:string
    class:string
    age:number
}

interface iMessage{
    message:string,
    success:boolean,
    data:null | {} | {}[]
}

let Data:iData[] =[
    {
        id:1,
        name:"Jemima",
        class:"Set08",
        age:25
    },
    {
        id:2,
        name:"Jessica",
        class:"Set08",
        age:27
    },
    {
        id:3,
        name:"Regina",
        class:"Set08",
        age:30
    },
    {
        id:4,
        name:"Joan",
        class:"Set08",
        age:35
    },

] 

const port = 2008
const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {method, url} = req

    let status = 404
    let message:iMessage = {
        message:"Unsuccessful",
        success:false,
        data:null
    }

    const container:any = []

    req 
       .on("data", (chunk:any)=>{
        container.push(chunk)
       })
       .on("end", ()=>{
        //get method 
        if(method ==="GET" && url === "/"){
            status = 200
            message.message="Successfully read"
            message.success=true,
            message.data=Data,
            res.write(JSON.stringify({message, status}))
            res.end()
        }
        //POST method
        if(url === "/" && method ==="POST"){
            const body= JSON.parse(container)
            Data.push(body)
            status = 201
            message.message="SUccessfully created"
            message.success=true,
            message.data=Data
            res.write(JSON.stringify({status, message}))
            res.end()
        }
        //PATCH method
        if(method ==="PATCH"){
            const build = JSON.parse(container)
            let getId:any = url?.split("/")[1]
            let parsing = parseInt(getId)
            
            let findId = Data.some((el:any)=>{
                return el.id === parsing
            })

            if(findId === false){
                status = 404
                message.message="Unsuccessful"
                message.success=false
                message.data=null,
                res.write(JSON.stringify({status, message}))
                res.end()
            }else{
                const updateName = build.name
                Data = Data.map((user:any)=>{
                if(user?.id === parsing){
                    return{
                        id:user?.id,
                        name: updateName,
                        class:user?.class,
                        age:user?.age
                    }
                }return user
                    
                })

                status = 200
                message.message="Successfully changed"
                message.success=true
                message.data=Data
                res.write(JSON.stringify({message, status}))
                res.end()
            }
        }
        //PUT method
        if(method === "PUT"){
            const build = JSON.parse(container)
            const details:any = url?.split("/")[1]
            const parsedDetails = parseInt(details)

            let findId = Data.some((el:any)=>{
                return el.id === parsedDetails
            })
            if(findId === false){
                status = 404
                message.message="Failed in changing"
                message.success=false,
                message.data=null,
                res.write(JSON.stringify({message, status}))
                res.end()
            }else{
                const updateAge = build.age
                const updateClass = build.class

                Data = Data.map((user:any)=>{
                    if(user?.id === parsedDetails){
                        return{
                            id: user?.id,
                            name:user?.name,
                            class: updateClass,
                            age:updateAge
                        }
                    }
                    return user;
                })
                status = 200
                message.message="Succesfully in global changing"
                message.success=true,
                message.data=Data,
                res.write(JSON.stringify({message, status}))
                res.end()
            }
        } 
        
       })
})

server.listen(port, ()=>{
    console.log("Port running on", port)
})