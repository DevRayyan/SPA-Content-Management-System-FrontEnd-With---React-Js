import React, { useState } from 'react'
import FilterMenu from "../Assets/FilterDropdown"
import NotificationBar from './NotificationBar';
import NotifySetting from '../Settings/NotifySetting';
export default function Notification() {
  const [NotifyMenu, setNotifyMenu] = useState(false);
  const Menu1 = [
    { id: 'notify_menu_1-1', value: 'All' },
    { id: 'notify_menu_1-2', value: 'Read' },
    { id: 'notify_menu_1-3', value: 'Unread' }
  ]
  const Menu2 = [
    { id: 'notify_menu_2-1', value: 'Mark as read' },

  ]
  function handleNotifyMenu() {
    setNotifyMenu(!NotifyMenu)

  }
  return (
    <div className='notify_page_container'>
      <div className='head'><i class="fa-regular fa-bell"></i> Notifications</div>
      <div className='notify_grid'>
        <ul>
          <div className='notify-filter-menu'>
            <FilterMenu Unique="four" List={Menu1} btnTitle="Filter" btnIcon="fa-regular fa-filter-list" />
            <FilterMenu Unique="five" List={Menu2} btnTitle="Actions" btnIcon="fa-regular fa-bolt-lightning" />
            <div className='notify_paginate'>
              <span>1-50 of 980</span>
              <div className='notify_paginate_arrows'>
                <button><i className='fa-solid fa-angle-left'></i></button>
                <button><i className='fa-solid fa-angle-right'></i></button>
              </div>
            </div>
          </div>
          <NotificationBar />
          <NotificationBar />
          <NotificationBar />
          <NotificationBar />
          <NotificationBar />
        </ul>
        <NotifySetting />
      </div>
    </div>
  )
}
