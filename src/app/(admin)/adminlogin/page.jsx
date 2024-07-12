import React from 'react'
import { AdminLogin } from '@/utilities/Auth/AdminLogin'
export const metadata = {
  title: "Admin Login | DevsIndia LMS",
  description: "Admin access to DevsIndia LMS. Login to manage courses, assignments, and user profiles efficiently.",
  keywords: "admin login, DevsIndia admin access, LMS admin login, manage LMS, admin dashboard"
};

const page = () => {
  return (
    <div>
      <AdminLogin/>
    </div>
  )
}

export default page
