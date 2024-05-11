import React from "react"
import logo from "../../assets/images/logo.jpeg"
import "./header.css"
import { User } from "./User"
import { nav } from "../../assets/data/data"
import { Link } from "react-router-dom"

export const Header = () => {
   window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  }) 
  return (
    <>
      <header className='header'>
        <div className='scontainer flex'>
          <div className='logo'>
            <img src={logo} alt='logo' width='50px' />
          </div>
          <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
  {nav.map((link) => (
    <li key={link.id} style={{ borderRadius: '5px', margin: '5px', padding: '5px', transition: 'background-color 0.3s' }}>
      <Link to={link.url} style={{   textDecoration: 'none', display: 'block', width: '100%', transition: 'color 0.3s', ':hover': { color: 'white' } }}>
        {link.text}
        <style>{`
          li:hover {
            background-color: #35CEA0; /* Change background color to #35CEA0 on hover */
            color: white
      
          }
        `}</style>
      </Link>
    </li>
  ))}
</ul>









          </nav>
          <div className='account flexCenter'>
            <User />
          </div>
        </div>
      </header>
    </>
  )
}
