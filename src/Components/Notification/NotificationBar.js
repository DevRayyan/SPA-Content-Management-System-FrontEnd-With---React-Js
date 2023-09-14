import React, { useState } from 'react'
import PostCover from "../../images/browseBanner.jpg";

export default function NotificationBar() {
  const [NotifyMenu, setNotifyMenu] = useState(false);
  function handleNotifyMenu() {
    setNotifyMenu(!NotifyMenu)

}
  return (
    <li>
    <a href="#" className='notify_line'>
      <span className="notify_post_cover">
        <img src={PostCover} alt="" />
      </span>
      <p className='notify_post_title'>rayyanali4422@gmail.com rayyanali4422@gmail.com rayyanali4422@gmail.com rayyanali4422@gmail.comc rayyanali4422@gmail.com  rayyanali4422@gmail.com</p>
    </a>
    <span className='notify_right'>
      <span className='date'>1h ago</span>
      <button className='notify-btn-1' onClick={handleNotifyMenu}><i className="fa-solid fa-ellipsis-vertical"></i></button>

      <div className={`notify_dropdown ${NotifyMenu ? "active" : ""}`} >
        <span><a href=""><i class="fa-regular fa-trash"></i> Delete</a></span>
        <span><a href=""><i class="fa-regular fa-trash"></i> Delete</a></span>
      </div>
    </span>
  </li>  )
}
