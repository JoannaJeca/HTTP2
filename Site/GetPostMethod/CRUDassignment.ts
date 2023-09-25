import http , {ServerResponse, IncomingMessage} from 'http'

interface iMessage{
    response :string
    success:boolean
    data:null | {} | {}[]
}

interface iData{
    id:number,
    name:string,
    age:number,
    class:string
}

let Data:iData[] =[
    {
        id:1,
        name:"Rufai",
        age:19,
        class:"Class08"
    }, {
        id:2,
        name:"Elijah",
        age:19,
        class:"Class08"
    }, {
        id:3,
        name:"Eronmonsele",
        age:19,
        class:"Class08"
    }, {
        id:4,
        name:"Peters",
        age:19,
        class:"Class08"
    }, {
        id:5,
        name:"Adisa",
        age:19,
        class:"Class08"
    },
] 



const port = 2008
const myServer = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {method, url} = req
    let status = 404

    let feedback:iMessage={
        response:"Unsuccessful",
        success:false,
        data:null
    }

    const container:any = []

    req
       .on("data", (chunk:any)=>{
        container.push(chunk)
       })
       .on("end", ()=>{
        //GET method
        if(url ==="/" && method=== "GET"){
            status = 200
            feedback.response="Successsfully read"
            feedback.success=true,
            feedback.data=Data
            res.write(JSON.stringify({feedback, status}))
            res.end()
        }
        //POST method
        if(url ==="/" && method ==="POST"){
            const body = JSON.parse(container)
            Data.push(body)
            status = 201
            feedback.response="Successfully created!"
            feedback.success=true,
            feedback.data=Data
            res.write(JSON.stringify({feedback, status}))
            res.end()
        }
        //PATCH method 
        if(method ==="PATCH"){
            const build = JSON.parse(container)
            let details:any = url?.split("/")[1]
            let dataValue = parseInt(details)

            let findObject = Data.some((el:any)=>{
                return el.id === dataValue
            })
            if(findObject=== false){
                status = 404
                feedback.response="Unsuccessful"
                feedback.success=false
                feedback.data=null
                res.write(JSON.stringify({feedback, status}))
                res.end()
            }else{
                const updateAge = build.age
                Data = Data.map((user:any)=>{
                    if(user?.id === dataValue){
                        return{
                            id : user?.id,
                            name : user?.name,
                            class: user?.class,
                            age: updateAge
                        }
                    }
                    return user
                })
                status = 200
                feedback.response="Successfully changed a value"
                feedback.success=true,
                feedback.data= Data,
                res.write(JSON.stringify({feedback, status}))
                res.end()
            }
        }
        //PUT method
        if(method ==="PUT"){
            const build= JSON.parse(container)
            let dataValue:any =  url?.split("/")[1]
            let parsedData = parseInt(dataValue)

            let updater = Data.some((el:any)=>{
                return el.id=== parsedData
            })
            if(updater === false){
                status = 404
                feedback.response="Unsucessfully"
                feedback.success=false
                feedback.data = null
                res.write(JSON.stringify({status, feedback}))
                res.end()
            }else{
                const updateName = build.name
                const updateClass = build.class
                Data = Data.map((user:any)=>{
                    if(user?.id===parsedData){
                        return{
                            id : user?.id,
                            name: updateName,
                            class:updateClass,
                            age:user?.age
                        }
                    }
                    return user
                })
                status = 200
                feedback.response="Successfully changed globally"
                feedback.success=true,
                feedback.data=Data
                res.write(JSON.stringify({feedback, status}))
                res.end()
            }
        }
       })
})

myServer.listen(port, ()=>{
    console.log("Port running on", port)
})