import { create } from 'zustand'

interface NewUser {
  id: number
  userName: string
  bio: string
  photoUrl: string
  // signedUpAt: Date
  email: string
}

interface IUser {
  currentUser: NewUser
  setUser: (newUser: NewUser) => void
}

export const useUserStore = create<IUser>((set) => ({
  currentUser: {
    id: 0,
    userName: '',
    bio: '',
    email: '',
    photoUrl: '',
    // signedUpAt: new Date(),
  },
  setUser: (newUser: NewUser) =>
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        ...newUser,
      },
    })),
}))
