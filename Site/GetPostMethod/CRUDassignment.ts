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

let UserInfo:iData[] =[
    {
        id:1,
        name:"Ayo",
        class:"Set08",
        age:25
    },
    {
        id:2,
        name:"Tobi",
        class:"Set08",
        age:27
    },
    {
        id:3,
        name:"Habeeb",
        class:"Set08",
        age:30
    },
    {
        id:4,
        name:"Wisdom",
        class:"Set08",
        age:35
    },

] 

const port = 2008
const mYserver = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {url, method} = req

    let status = 404
    const response:iMessage={
        message:"Failed",
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
            const details:any = url?.split('/')[1]
            const dataValue = parseInt(details)

            let findObject = UserInfo.some((el:any)=>{
                return el.id === dataValue
            })
            if(findObject === false){
                status = 404,
                response.message="Unsuccessful in updating"
                response.success=false,
                response.data=null,
                res.write(JSON.stringify({response, status}))
                res.end()
            }else{
                const updateAge = build.age
                UserInfo = UserInfo.map((user:any)=>{
                    if(user?.id === dataValue){
                        return{
                            id: user?.id,
                            name: user?.name,
                            class:user?.class,
                            age:updateAge
                        }
                    }return user
                })
                status = 200,
                response.message="Successful in updating"
                response.success=true,
                response.data=UserInfo,
                res.write(JSON.stringify({response, status}))
                res.end()
            }
        }
        //PUT method
        if(method === "PUT"){
            const build = JSON.parse(container)
            const details:any = url?.split('/')[1]
            const dataValue = parseInt(details)

            let findObject = UserInfo.some((el:any)=>{
                return el.id === dataValue
            })
            if(findObject === false){
                status = 404,
                response.message="Unsuccessful in updating"
                response.success=false,
                response.data=null,
                res.write(JSON.stringify({response, status}))
                res.end()
            }else{
                const updateAge = build.age
                const updateName = build.name
                const updateClass = build.class

                UserInfo = UserInfo.map((user:any)=>{
                    if(user?.id === dataValue){
                        return{
                            id: user?.id,
                            name: updateName,
                            class:updateClass,
                            age:updateAge
                        }
                    }return user
                })
                status = 200,
                response.message="Successful in updating global"
                response.success=true,
                response.data=UserInfo,
                res.write(JSON.stringify({response, status}))
                res.end()
            }
        }

       })
 })


 mYserver.listen("port", ()=>{
    console.log("Port running on", port)
 })