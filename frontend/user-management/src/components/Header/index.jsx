import {useState} from "react"
import {NavLink, Outlet} from "react-router-dom"
import {FaBars, FaHome} from "react-icons/fa"

import "./index.css"

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div className="home-container">
            <div className="hamburger-menu-card">
                <button type="button" onClick={() => setIsOpen(!isOpen)}>
                    <FaBars/>
                </button>
            </div>
            <div className={`sidebar-container ${isOpen ? "show" : ""}`}>
                <div className="sidebar-logo">
                    <img src="/logo-img.png" alt="website logo" className="website-logo"/>
                    <p className="sidebar-title">User Management</p>
                </div>
                <div className="sidebar-menu-card">
                    <div className="sidebar-menu">
                        <NavLink to="/dashboard">
                            <FaHome/>
                            <span className="menu-name">Dashboard</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default HomePage