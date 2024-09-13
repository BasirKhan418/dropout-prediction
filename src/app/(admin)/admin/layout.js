import React from 'react'
export const metadata = {
    title: "Admin Panel | DropGuard LMS",
    description: "Manage and oversee all aspects of DropGuard LMS from the admin panel. Control users, courses, assignments, and more.",
    keywords: "admin panel, LMS admin, manage LMS, DropGuard LMS admin, admin dashboard"
  };
  
const layout = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default layout
