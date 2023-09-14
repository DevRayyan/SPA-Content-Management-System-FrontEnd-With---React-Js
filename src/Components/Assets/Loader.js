import React from 'react';
import { Spin } from 'antd'; // Using Ant Design's Spin component as an example

const Loading = () => {
  return (
    <div className='loading-container'>
      <Spin size="large" />
    </div>
  );
};

export default Loading;