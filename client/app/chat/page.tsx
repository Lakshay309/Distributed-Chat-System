"use client"
import React, { useEffect, useRef } from 'react'
import { UseRoomStore } from '@/store/useRoomStore'
import { io,Socket } from 'socket.io-client'
function connectWs(){
  return io("http://localhost:3001")
}
export default function page() {
  const { userId, roomId, setUserId, setRoomId } = UseRoomStore();
  const socket =useRef<null|Socket>(null);

  useEffect(()=>{
    if(!userId || !roomId){
      return;
    }
    if(socket.current){
      return
    }
    socket.current=connectWs();
    if(!socket.current){
      return ;
    }
    socket.current.on("connect",()=>{
        socket.current?.emit('JoinRoom',userId,roomId);

        socket.current?.on('roomNotice',(userId,roomId)=>{
          console.log(`${userId} joined ${roomId}`)
        })
    })
  },[])
  
  return (
    <div>page</div>
  )
}
