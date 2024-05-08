import React from 'react'
import { Outlet } from 'react-router-dom'

function PageContent() {
  return (
    <div className='flex flex-1 overflow-y-auto'>
        <Outlet />
    </div>
  )
}

export default PageContent