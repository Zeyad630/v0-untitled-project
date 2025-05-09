"use client"

import { useState } from "react"
import Modal from "../common/Modal"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: "login" | "signup"
}

const AuthModal = ({ isOpen, onClose, initialTab = "login" }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "login" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "signup" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div>{activeTab === "login" ? <LoginForm onSuccess={onClose} /> : <SignupForm onSuccess={onClose} />}</div>
      </div>
    </Modal>
  )
}

export default AuthModal
