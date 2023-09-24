import http, { IncomingMessage, ServerResponse } from "http"
const port = 2007;

interface iData{
    id:number,
    name:string,
    age:number;
};

interface iResponse{
    message:string,
    success:boolean,
    data: null | {} | {}[];
};

let myData:iData[] =[
    {
        id:1,
        name:"Daniel",
        age:22,
    },{
        id:2,
        name:"Jemima",
        age:28,
    },{
        id:3,
        name:"Daniel",
        age:22,
    },{
        id:4,
        name:"Nzube",
        age:22,
    },
] 

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")

    const {url, method} = req

    let status = 404

    let feedback:iResponse ={
        message:"Success",
        success:false,
        data:null
        
    };

    const Container:any = []

    req
       .on("data", (chunk:any)=>{
        Container.push(chunk)
       })
       .on("end", ()=>{
        //GET method
        if(url === "/" && method === "GET"){
            let status = 200
            feedback.message="Succesfully read"
            feedback.success= true
            feedback.data= myData
            res.write(JSON.stringify({feedback, status}))
            res.end()
        }

        //POST method
           
           if(url ==="/" && method ==="POST"){
            let status = 201
            const body = JSON.parse(Container)
            myData.push(body)
            feedback.message="Success in creating"
            feedback.success=true
            feedback.data=myData
            res.write(JSON.stringify({feedback, status}))
            res.end()
           }

           //UPDATE(Patch) method
           const build = JSON.parse(Container)
           let details:any = url?.split("/")[1]
           let detailsValue = parseInt(details)

        //    let findObject = myData.some((el)=>{
        //     el.id === detailsValue
        //    })
        //    if(findObject === false){
        //     status = 404;
        //     feedback.message="Not found"
        //     feedback.success=false
        //     feedback.data=null
        //     res.write(JSON.stringify({feedback, status}))
        //     res.end()
        //    }else{
        //     const updateUserName = build.name;
        //     myData = myData.map((user:any)=>{
        //         if(user.id = detailsValue){
        //             return{
        //                 id:user?.id,
        //                 name:updateUserName,
        //                 age:user?.age
        //             }
        //         }
        //         return user;
        //         status=200;
        //         feedback.message="user updated"
        //         feedback.success=true
        //         feedback.data=myData
        //         res.write(JSON.stringify({feedback, status}))
        //         res.end()
        //     })
        //    }

           //DELETE method
           let holder = JSON.parse(Container)
            let detail:any = url?.split("/")[1]
            let transformer = parseInt(detail)

            let removeObject = myData.some((el:any)=>{
                el.id === transformer
            })
           if(removeObject === false){
            status = 404;
            feedback.message="Not found"
            feedback.success=false
            feedback.data=null
            res.write(JSON.stringify({feedback, status}))
            res.end()
           }else{
            myData = myData.map((el:any)=>{
                if(el?.id === transformer){
                    el = null
                }
                return el
            })
           }
           feedback.message="user updated"
                feedback.success=true
                feedback.data=myData
                res.write(JSON.stringify({feedback, status}))
                res.end()
       })

    
})

server.listen(port, ()=>{
    console.log("Port running on ", port);
    
})