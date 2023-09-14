import React from 'react'

export default function NotifySetting({ IsMainSetting = false}) {
    return (
        <>
            <div className={` notify_setting ${IsMainSetting && "main_setting_page personal_pro_wrap"} `}>
                {IsMainSetting == true ? <div className='personal_pro_head'>
                    Notification Settings </div> : <div className='notify_setting_head'>Notification Settings</div>

                }


                <div className='notify_setting_switch'>
                    <div>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div className='notify_setting_title'>
                        <span>Push Notification</span>
                        <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
                    </div>
                </div>
                <div className='notify_setting_switch'>
                    <div>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div className='notify_setting_title'>
                        <span>Push Notification</span>
                        <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
                    </div>
                </div>
                <div className='notify_setting_switch'>
                    <div>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div className='notify_setting_title'>
                        <span>Push Notification</span>
                        <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
                    </div>
                </div>
            </div>
        </>

    )
}
