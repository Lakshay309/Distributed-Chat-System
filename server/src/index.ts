import {createServer} from "node:http";
import express from 'express';
import { Server } from "socket.io";

const app =express();
const PORT = 3001;

const server =createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});
type messageProp ={
  msg:string,
  userId:string,
  roomId:string,
  time:Date,
}
io.on('connection',(socket)=>{
    console.log('a user connected',socket.id)

    socket.on("JoinRoom",async (userId:string,roomId:string)=>{
        console.log(`${userId} join ${roomId}`);
        await socket.join(roomId)

        socket.to(roomId).emit('roomNotice',userId,roomId)
    })
    socket.on("chatMessage",(msg:messageProp)=>{
        console.log(msg)
        socket.to(msg.roomId).emit('chatMessage',msg)
    })
})


app.get('/',(req,res)=>{
    res.send('<h1>hello from server</h1>');
})

server.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
});