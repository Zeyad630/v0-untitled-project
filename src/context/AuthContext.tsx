"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUserProfile: (userData: Partial<User>) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateUserProfile: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  // Simulated login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate a successful login if the email contains "user"

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (email.includes("user")) {
      // Get users from localStorage or use empty array
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Find user with matching email
      const foundUser = users.find((u: any) => u.email === email)

      if (foundUser && foundUser.password === password) {
        // Remove password before storing in state
        const { password, ...userWithoutPassword } = foundUser

        setUser(userWithoutPassword)
        setIsAuthenticated(true)

        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        return true
      }
    }

    return false
  }

  // Simulated signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      return false
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // In a real app, this would be hashed
    }

    // Add to users array
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Log user in
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))

    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Also update in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, ...userData } : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
