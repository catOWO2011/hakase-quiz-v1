import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const StyledAppContainer = styled.div`
  height: calc(100vh - 50px);
`;

function PageContent() {
  return (
    <StyledAppContainer>
      <Outlet />
    </StyledAppContainer>
  )
}

export default PageContent