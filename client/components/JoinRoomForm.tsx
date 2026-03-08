"use client"

import { useState } from "react"
import { UseRoomStore } from "@/store/useRoomStore"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function JoinRoomForm() {
  const router = useRouter();
  const setRoomId = UseRoomStore((state) => state.setRoomId)
  const setUserId = UseRoomStore((state) => state.setUserId)

  const [roomIdInput, setRoomIdInput] = useState("")
  const [usernameInput, setUsernameInput] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!roomIdInput.trim() || !usernameInput.trim()) return
    console.log(usernameInput,roomIdInput)
    setRoomId(roomIdInput)
    setUserId(usernameInput)
    setRoomIdInput("")
    setUsernameInput("")
    router.push("/chat")
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-[380px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Join Chat Room</CardTitle>
          <CardDescription>
            Enter a username and room ID to start chatting
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="e.g. Jhon Doe"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="room">Room ID</Label>
              <Input
                id="room"
                placeholder="e.g. general"
                value={roomIdInput}
                onChange={(e) => setRoomIdInput(e.target.value)}
              />
            </div>

            <Button type="submit" variant={"secondary"} className="w-full">
              Join Room
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}