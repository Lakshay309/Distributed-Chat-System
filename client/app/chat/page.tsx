"use client"
import React, { useEffect, useRef, useState } from "react"
import { UseRoomStore } from "@/store/useRoomStore"
import { io, Socket } from "socket.io-client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

function connectWs() {
  return io("http://localhost:3001")
}

type messageProp = {
  msg: string
  userId: string
  roomId: string
  time: Date
}

export default function Page() {
  const { userId, roomId } = UseRoomStore()

  const socket = useRef<Socket | null>(null)

  const [messages, setMessages] = useState<messageProp[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (!userId || !roomId) return
    if (socket.current) return

    socket.current = connectWs()

    socket.current.on("connect", () => {
      socket.current?.emit("JoinRoom", userId, roomId)

      socket.current?.on("roomNotice", (userId, roomId) => {
        console.log(`${userId} joined ${roomId}`)
      })

      socket.current?.on("chatMessage", (msg: messageProp) => {
        setMessages((prev) => [...prev, msg])
      })
    })
  }, [userId, roomId])

  const sendMessage = () => {
    if (!userId || !roomId || !currentMessage) return

    const msg: messageProp = {
      msg: currentMessage,
      userId,
      roomId,
      time: new Date(),
    }

    socket.current?.emit("chatMessage", msg)

    setMessages((prev) => [...prev, msg])
    setCurrentMessage("")
  }

  return (
    <div className="flex justify-center items-center h-screen bg-muted">
  <Card className="w-[500px] h-[650px] flex flex-col p-4">

    {/* Chat Header */}
    <div className="text-lg font-semibold border-b pb-2">
      Room: {roomId}
    </div>

    {/* Messages */}
    <ScrollArea className="flex-1 min-h-0 mt-4 pr-4">
      <div className="flex flex-col gap-3">
        {messages.map((message, index) => {
  const isMe = message.userId === userId

  const prevMessage = messages[index - 1]
  const showUser = !prevMessage || prevMessage.userId !== message.userId

  return (
    <div
      key={index}
      className={`flex flex-col ${isMe ? "items-end" : "items-start"} ${showUser ? "mt-2" : "mt-0.5"}`}
    >

      {/* show username only when sender changes */}
      {showUser && (
        <span className="text-xs text-muted-foreground mb-1 px-1">
          {message.userId}
        </span>
      )}

      <div
        className={`max-w-[70%] rounded-xl px-3 py-2 text-sm
        ${isMe
          ? "bg-primary text-white"
          : "bg-secondary text-black"
        }`}
      >
        <div>{message.msg}</div>

        <div className="text-xs opacity-60 mt-1 text-right">
          {new Date(message.time).toLocaleTimeString()}
        </div>
      </div>

    </div>
  )
})}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>

    {/* Input */}
    <div className="flex gap-2 mt-4">
      <Input
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        placeholder="Type a message..."
      />

      <Button onClick={sendMessage}>
        Send
      </Button>
    </div>

  </Card>
</div>
  )
}