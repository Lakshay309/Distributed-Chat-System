import {createServer} from "node:http";
import express from 'express';
import { Server } from "socket.io";
import "dotenv/config";
import { pub,sub } from "./lib/redis.js";

type messageProp ={
  msg:string,
  userId:string,
  roomId:string,
  time:Date,
}


const app =express();
const PORT = process.env.PORT || 3001;

const server =createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

await sub.subscribe("chatMessage",(message)=>{
    const msg:messageProp = JSON.parse(message);
    io.to(msg.roomId).emit("chatMessage",msg);
})

io.on('connection',async (socket)=>{
    console.log('a user connected',socket.id)

    socket.on("JoinRoom",async (userId:string,roomId:string)=>{

        await socket.join(roomId)
        socket.to(roomId).emit('roomNotice',userId,roomId)
    })
    socket.on("chatMessage",async (msg:messageProp)=>{
        console.log(msg);
        await pub.publish("chatMessage",JSON.stringify(msg))
        // socket.to(msg.roomId).emit('chatMessage',msg)
    })
})


app.get('/',(req,res)=>{
    res.send('<h1>hello from server</h1>');
})

server.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
});