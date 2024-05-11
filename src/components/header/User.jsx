import React, { useState } from "react"
 

export const User = () => {
  const user = true
  const [profileOpen, setProfileOpen] = useState(false)
  const close = () => {
    setProfileOpen(false)
  }
  return (
    <>
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
           
            </button>
           
          </>
        ) : (
          <button>My Account</button>
        )}
      </div>
    </>
  )
}
