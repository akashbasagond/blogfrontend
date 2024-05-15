import React from "react"
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { RiInstagramFill } from "react-icons/ri"
import "./Footer.css" // Import CSS file for styling

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container flex'>
        <div className='social'>
          <BsFacebook className='icon' />
          <RiInstagramFill className='icon' />
          <AiFillTwitterCircle className='icon' />
          <AiFillLinkedin className='icon' />
        </div>
      </div>
    </footer>
  )
}
