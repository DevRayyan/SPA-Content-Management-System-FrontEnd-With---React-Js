import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const [SidebarIsShow, setSidebarIsShow] = useState(true);
    function HandleSidebar() {
        setSidebarIsShow(!SidebarIsShow)
    }
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
    }, [])

    function handleClickOutside(e) {
        const SidebarToggler = document.querySelector(".sidebar_toggler");
        if (SidebarToggler && !SidebarToggler.contains(e.target)) {
            setSidebarIsShow(true)
        }
    }
    return (
        <div className={`sidebar_wrapper ${SidebarIsShow && "hide-sidebar"}`}>
            <div className='sidebar_container'>
                <div className='sidebar_head'>
                    <button className='sidebar_toggler' onClick={HandleSidebar}><i className='fa-solid fa-minus'></i></button>
                    <div className='sidebar_title'>Settings</div>
                </div>
                <ul className='sidebar_links'>
                    <li><NavLink className="sidebar_link" to="/settings/profile">
                        <i className='fa-regular fa-address-card'></i>
                        <span className='sidebar_link_title'>Personal Information</span>
                    </NavLink></li>

                    <li><NavLink className="sidebar_link" to="/settings/notification">
                        <i className='fa-regular fa-bell'></i>
                        <span className='sidebar_link_title'>Notification</span>
                    </NavLink></li>
                    <li><NavLink className="sidebar_link" to="/settings/customize">
                        <i className='fa-regular fa-paintbrush'></i>
                        <span className='sidebar_link_title'>Customizations</span>
                    </NavLink></li>

                    <li><NavLink className="sidebar_link" to="/settings/billing">
                        <i className='fa-regular fa-wallet'></i>
                        <span className='sidebar_link_title'>Billing Information</span>
                    </NavLink></li>
                </ul>
            </div>
        </div >
    )
}
