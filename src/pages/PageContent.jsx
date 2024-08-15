import { Outlet } from 'react-router-dom'

function PageContent() {
  return (
    <div className='flex flex-1 overflow-y-auto m-4'>
      <Outlet />
    </div>
  )
}

export default PageContent