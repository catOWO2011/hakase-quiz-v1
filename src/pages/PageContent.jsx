import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const StyledAppContainer = styled.div`
  height: calc(100vh - 50px);
`;

function PageContent() {
  return (
    // <div className='flex flex-1 overflow-y-auto m-4'>
    //   <Outlet />
    // </div>
    <StyledAppContainer>
      <Outlet />
    </StyledAppContainer>
  )
}

export default PageContent