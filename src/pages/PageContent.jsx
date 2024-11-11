import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const StyledAppContainer = styled.div`
  height: calc(100vh - 50px);
  overflow: auto;
  padding: 1rem;
`;

function PageContent() {
  return (
    <StyledAppContainer>
      <Outlet />
    </StyledAppContainer>
  )
}

export default PageContent