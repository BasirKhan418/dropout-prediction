import React from 'react'
export const metadata = {
    title: "Admin Panel | DevsIndia LMS",
    description: "Manage and oversee all aspects of DevsIndia LMS from the admin panel. Control users, courses, assignments, and more.",
    keywords: "admin panel, LMS admin, manage LMS, DevsIndia LMS admin, admin dashboard"
  };
  
const layout = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default layout
