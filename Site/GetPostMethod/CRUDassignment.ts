import http, { IncomingMessage, ServerResponse } from "http"
import { isNull } from "util"

interface iData{
    id:number,
    name:string,
    age:number
}

interface iMessage{
    message:string
    success:boolean,
    data:null | {} | {}[]
}


let User:iData[] =[
    {
        id:1,
        name:"Ekene",
        age:22,
    },
    {
        id:2,
        name:"Ekene",
        age:22,
    },
    {
        id:3,
        name:"Ekene",
        age:22,
    },
    {
        id:4,
        name:"Ekene",
        age:22,
    },
] 


const port = 2008
const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {url, method} = req

    let status:number = 404

    let response:iMessage ={
        message:"Failed",
        success:false,
        data:null
    }
    
    let container:any = []

    req
       .on("data", (chunk:any)=>{
        container.push(chunk)
       })
       .on("end", ()=>{
        //PATCH method
        if(method === "PATCH"){
            const build = JSON.parse(container)
            User.push(build)
            let details:any = url?.split("/")[1]
            let detailsValue = parseInt(details)

            let findObject = User.some((el:any)=>{
                return el.id === detailsValue
            })

            if(findObject === false){
                status = 404
                response.message="Unsuccessful"
                response.success=false,
                response.data=null,
                res.write(JSON.stringify({response, status}))
                res.end()
            }else{
                const UpdateUserName = build.name;
                
                User = User.map((user:any)=>{
                    if(user?.id === detailsValue){
                        return{
                            id: user?.id,
                            name:UpdateUserName,
                            age:user?.age
                        }
                    }
                    return user;
                })

                status = 200
                response.message="User succesfully edited",
                response.success=true,
                response.data= User,
                res.write(JSON.stringify({response, status}))
                res.end()
            }
        }


        //PUT method
        if(method ==="PUT"){
            const build = JSON.parse(container)
            let details:any = url?.split("/")[1]
            let detailsValue =  parseInt(details)

            let findObject = User.some((el:any)=>{
                return el.id === detailsValue
            })
            if(findObject === false){
                status = 404
                response.message="Unsuccessful"
                response.success=false,
                response.data=null
            }else{
                const UpdateUserName = build.name
                const UpdateUserAge = build.age
                
                User = User.map((user:any)=>{
                    if(user?.id === detailsValue){
                        return{
                            id: user?.id,
                            name : UpdateUserName,
                            age : UpdateUserName
                        }

                    }
                    return user
                })

                status = 200
                response.message="Successfull updated all"
                response.success= true,
                response.data= User,
                res.write(JSON.stringify({response, status}))
                res.end()
            }
        }

       })

});




server.listen(port, ()=>{
    console.log("Port running on", port)
})