import React from 'react';
import Sidebar from '../Assets/Sidebar';
import Information from './Information';
import BillingInfo from './BillingInfo';
import Appearance from './Appearance';
import NotifySetting from './NotifySetting';

export default function Settings(props) {
  switch (props.Active) {
    case "profile":
      return (
        <div className='setting-wrapper'>
          <Sidebar />
          <Information ShowToast={props.ShowToast}/>
        </div>
      );
    case "customize":
      return (
        <div className='setting-wrapper'>
          <Sidebar />
          <Appearance ShowToast={props.ShowToast} />
        </div>
      );
    case "billing":
      return (
        <div className='setting-wrapper'>
          <Sidebar />
          <BillingInfo />
        </div>
      );
    case "notification":
      return (
        <div className='setting-wrapper'>
          <Sidebar />
          <NotifySetting IsMainSetting={true}/>
        </div>
      );
      default :
      return (
        <div className='setting-wrapper'>
          <Sidebar />
          <Information ShowToast={props.ShowToast} />
        </div>
      );

  }
}
