import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav({setIsLogin}) {
    let isDarkMode=true;


    const logoutSubmit = () =>{
        localStorage.clear()
        setIsLogin(false)
        isDarkMode=true;
    }

    function handleCheckboxChange() {
        const element = document.getElementById('app') ;
        element.classList.toggle("dark-mode");
      }

    return (
        <header>
            <div className="logo">
                <h1><Link to="/">Transl8</Link></h1>
            </div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li onClick={logoutSubmit}><Link to="/">Logout</Link></li>
            </ul>
            <label className="switch">
            <input type="checkbox" onChange={handleCheckboxChange} />
        <span className="slider"></span>
        </label>
        </header>
    )

    
}
