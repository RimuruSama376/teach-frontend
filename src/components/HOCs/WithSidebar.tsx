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

const Header = styled.div`
  font-family: 'Nunito', sans-serif;
  padding: 10px;
  background-color: #E9ECEF !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px #E9ECEF solid;

  @media (min-width: 801px) {
    display: none !important;
    /* position: absolute;  */
  }
`

interface WithSidebarLayoutProps {}

function withSidebarLayout<P>(WrappedComponent: ComponentType<P>) {
  const WithSidebar: FC<P & WithSidebarLayoutProps> = (props) => {
    return (
      <Container style={{ display: 'flex' }}>
        <Header>
          <img
            src='/schoollogo.png'
            alt=''
            style={{
              height: '50px',
              width: '50px',
              background: '#4b65f6',
              color: 'white',
              borderRadius: '99px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}
          />
          <span
            style={{
              marginLeft: '10px',
              fontSize: '16px',
              lineHeight: '21px',
              textAlign: 'left'
            }}
          >
            {'Chaudhary Chhotu Ram Public School'}
          </span>
        </Header>
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
