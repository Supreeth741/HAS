import { Spin } from 'antd';
import React from 'react'

function Spinner() {
  return (
    <div className='spinner-parent'>
        <Spin size='large' />
    </div>
  )
}

export default Spinner;