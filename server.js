const express =require("express") ;
const mongoose= require("mongoose");
const axios= require("axios");
const route=require("./src/user/route.js");
const Chat= require("./src/chat/model.js");
const { decode } = require("jsonwebtoken");
const dotenv= require("dotenv");
const http = require('http');
const WebSocket = require('ws');
const path=require("path");

const app= express();
app.use(express.static(path.join(__dirname,'public')));

dotenv.config();

const server= http.Server(app);
const wss= new WebSocket.Server({server});
const API_KEY= process.env.API_KEY;


wss.on('connection',(ws) =>{

    // const token=req.headers.authorization;
    // if (!token) {
    //     return res.status(401).send({ message: "Access denied.No token provided" });
    // }
    // const user= decode(token);
    // const userId= user.userId;
    // console.log(`user ${userId} connected`);
    console.log('client connected');
    

    ws.on('message',async(message)=>{

        if (Buffer.isBuffer(message)) {
            message = message.toString('utf8');
        }

        console.log(message);
        const cookingKeywords = ['cook','cooking','recipe','recipes','bake','grill','fry','boil','sauté','roast','stew','ingredients','wings','coookies'];
        const check= cookingKeywords.some(keyword => message.toString().toLowerCase().includes(keyword));
        if(!check){
            ws.send('The chatbot only accepts cooking related questions');
        }


        try{

            const response= await axios.post(
                "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct",
                {inputs: message},
                {headers:{Authorization: `Bearer ${API_KEY}`},
                  responseType: 'json'
                } 
            );

            console.log("response:", response.data);
            const reply= response.data[0].generated_text;
            if(!reply){
                ws.send('No response generated');
            }
            ws.send(reply); 

        }catch(err){
            console.log(err);
            
            ws.send('Error processing your request.');
        }

    });


    ws.on('close',()=>{
        console.log("client disconnected");
    })
})



app.use("/user",route);

mongoose.connect(process.env.MONGOOSE_STRING);
const connection= mongoose.connection;
connection.once( "connected" ,()=> console.log("database connected"));
connection.on( "error",(error)=> console.log("database not connected"));


server.listen(7070,()=>{
    console.log('app is listening on port 7070');
    
})