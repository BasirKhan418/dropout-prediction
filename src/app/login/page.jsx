import React from 'react'
import { Login } from '@/utilities/Auth/Login'
export const metadata = {
  title: "Login to Your Account | DevsIndia LMS",
  description: "Access your DevsIndia LMS account. Login to continue your learning journey with our extensive library of courses, assignments, and projects.",
  keywords: "login, user login, DevsIndia LMS login, access account, online learning login"
};

const Page = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default Page
