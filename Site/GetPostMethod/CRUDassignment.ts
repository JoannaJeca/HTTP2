import http, {ServerResponse, IncomingMessage} from "http"

interface iData{
    id:number
    name:string
    class:string
    
}

interface iReply{
    message:string,
    success:boolean,
    data:null | {} | {}[]
}

let User:iData[] =[
    {
        id:1,
        name:"Ayo",
        class:"Set08",
       
    },
    {
        id:2,
        name:"Tobi",
        class:"Set08",
        
    },
    {
        id:3,
        name:"Habeeb",
        class:"Set08",
        
    },
    {
        id:4,
        name:"Wisdom",
        class:"Set08",
        
    },

] 

const port = 2008
const myServer = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {url, method} = req

    let status = 404
    let reply:iReply={
        message:"Unsuccessful!",
        success:false,
        data:User
    }

    const container:any = []

    req 
       .on("data", (chunk:any)=>{
        container.push(chunk)
       })
       .on("end", ()=>{
        //PUT method
        if(method === "PUT"){
            const build = JSON.parse(container)
            const deta:any = url?.split("/")[1]
            const parsedDeta = parseInt(deta)

            let findObject = User.some((el:any)=>{
                return el.id === parsedDeta
            })
            if(findObject === false){
                status = 404
                reply.message="Unsuccesful",
                reply.success=true,
                reply.data=null,
                res.write(JSON.stringify({reply, status}))
                res.end()
            }else{
                const updateName = build.name
                const updateClass = build.class
                User = User.map((user:any)=>{
                    if(user?.id === parsedDeta){
                        return{
                            id:user?.id,
                            name:updateName,
                            class: updateClass
                        }
                    }return user
                })
                status = 200
                reply.message="Succesful",
                reply.success=true,
                reply.data=User,
                res.write(JSON.stringify({reply, status}))
                res.end()
            
            }
        }
         //PUT method
        if(method === "PATCH"){
            const build = JSON.parse(container)
            const deta:any = url?.split("/")[1]
            const parsedDeta = parseInt(deta)

            let findObject = User.some((el:any)=>{
                return el.id === parsedDeta
            })
            if(findObject === false){
                status = 404
                reply.message="Unsuccesful",
                reply.success=true,
                reply.data=null,
                res.write(JSON.stringify({reply, status}))
                res.end()
            }else{
                
                const updateClass = build.class
                User = User.map((user:any)=>{
                    if(user?.id === parsedDeta){
                        return{
                            id:user?.id,
                            name:user?.name,
                            class: updateClass
                        }
                    }return user
                })
                status = 200
                reply.message="Succesful",
                reply.success=true,
                reply.data=User,
                res.write(JSON.stringify({reply, status}))
                res.end()
            
            }
        }
       })
})
myServer.listen("Port", ()=>{
    console.log("Port running on", port)
})