const http =require("http");
const fs =require("fs");
var requests= require("requests");
const homefile= fs.readFileSync("home.html","utf-8");
const replaceval=(tempval,orgval)=>{

    let temp=tempval.replace("{%tempval%}",orgval.main.temp);
    temp=temp.replace("{%tempvalmin%}",orgval.main.temp_min);
    temp=temp.replace("{%tempvalmax%}",orgval.main.temp_max);
    temp=temp.replace("{%location%}",orgval.name);
    temp=temp.replace("{%country%}",orgval.sys.country);
    temp=temp.replace("{%tempstatus%}",orgval.weather[0].main);
    return temp;
};
const server= http.createServer((req,res)=>{
    if(req.url="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=pune&appid=a964a802b211e20ba3a5593134366e34")
        .on("data",(chunk)=>{
            console.log(chunk);
           const objdata=JSON.parse(chunk);
           const arrdata=[objdata];
           const realtimedata=arrdata.map((val)=>replaceval(homefile,val)).join("");
          res.write(realtimedata);
        })
        .on("end",(err)=>{
            if(err){
        return console.log("connection closed due to error",err);
        
        }
        console.log("end");
         res.end();
        });
    }
});
server.listen(8000,"127.0.0.1");