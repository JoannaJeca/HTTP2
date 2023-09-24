import http, { IncomingMessage, ServerResponse } from "http"

interface iData{
    id:number,
    name:string,
    class:string
}

interface iResponse{
    response:string,
    success:boolean
    data:null | {} | {}[]
}

let Data:iData[] =[
    {
        id:1,
        name:"Wisdom",
        class:"Set08"
    },
    {
        id:1,
        name:"Wisdom",
        class:"Set08"
    },
    {
        id:1,
        name:"Wisdom",
        class:"Set08"
    },
    {
        id:1,
        name:"Wisdom",
        class:"Set08"
    },
] 

const port = 2006

const server= http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {url, method} = req

    let status = 404
    let reply:iResponse={
        response:"Failed",
        success:false,
        data:null
    }

    const container:any = []

    req
       .on("data", (chunk:any)=>{
        container.push(chunk)
       })
       .on("end", ()=>{
        //PATCH method

        if(method === "PATCH"){
            const build = JSON.parse(container) 
            let details:any = url?.split("/")[1]
            let detailValue:any = parseInt(details)

            const findObject = Data.some((el:any)=>{
                return el.id === detailValue
            })
            if (findObject === false){
                status = 404
                reply.response = "Unsuccessfully in updating name"
                reply.success=false
                reply.data= null
                res.write(JSON.stringify({reply, status}))
                res.end()
            } else{
            const UpdateUserName = build.name

            Data = Data.map((user:any)=>{
               if(user?.id === detailValue){
                return{
                    id : user?.id,
                    name : UpdateUserName,
                    class: user?.class

                }
               }
               return user
            })

            status = 200
            reply.response = "Successfully in updating name"
                reply.success=true
                reply.data= Data
                res.write(JSON.stringify({reply, status}))
                res.end()
        }
        }
        //PUT method
        const build = JSON.parse(container) 
        let details:any = url?.split("/")[1]
        let detailValue:any = parseInt(details)

        const findObject = Data.some((el:any)=>{
            return el.id === detailValue
        })
        if (findObject === false){
            status = 404
            reply.response = "Unsuccessfully in updating name"
            reply.success=false
            reply.data= null
            res.write(JSON.stringify({reply, status}))
            res.end()
        } else{
        const UpdateUserName = build.name
        const UpdateUserClass = build.class
        

        Data = Data.map((user:any)=>{
           if(user?.id === detailValue){
            return{
                id : user?.id,
                name : UpdateUserName,
                class: UpdateUserClass

            }
           }
           return user
        })

        status = 200
        reply.response = "Successfully in updating name"
            reply.success=true
            reply.data= Data
            res.write(JSON.stringify({reply, status}))
            res.end()
    }
    }
  )

       })
