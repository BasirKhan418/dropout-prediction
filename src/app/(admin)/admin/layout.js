import React from 'react'
export const metadata = {
    title: "Admin Panel | RadSab LMS",
    description: "Manage and oversee all aspects of RadSab LMS from the admin panel. Control users, courses, assignments, and more.",
    keywords: "admin panel, LMS admin, manage LMS, RadSab LMS admin, admin dashboard"
  };
  
const layout = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default layout
