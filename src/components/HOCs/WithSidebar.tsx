import { ComponentType, FC } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

import Sidebar from '../Sidebar'
import NavBar from '../NavBar'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media (min-width: 801px) {
    /* display: none !important; */
    /* position: absolute;  */
  }
`

interface WithSidebarLayoutProps {}

function withSidebarLayout<P>(WrappedComponent: ComponentType<P>) {
  const WithSidebar: FC<P & WithSidebarLayoutProps> = (props) => {
    return (
      <Container style={{ display: 'flex' }}>
        <Container style={{ display: 'flex', flexDirection: 'row' }}>
          <Sidebar />
          <WrappedComponent {...props} />
        </Container>
        <NavBar />
      </Container>
    )
  }

  WithSidebar.displayName = `WithSidebarLayout(${getDisplayName(WrappedComponent)})`
  return WithSidebar
}

// This function helps to get a display name for the wrapped component
function getDisplayName<P>(WrappedComponent: ComponentType<P>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withSidebarLayout
