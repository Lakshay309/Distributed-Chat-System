import { create } from "zustand"

type useRoomProp = {
    userId: string | null,
    roomId: string | null,
    setRoomId: (id: string) => void,
    setUserId: (id: string) => void,
}

export const UseRoomStore = create<useRoomProp>((set) => ({
    userId: "",
    roomId: "",
    setRoomId: (id) => set({ roomId: id }),
    setUserId: (id) => set({ userId: id }),
}))
