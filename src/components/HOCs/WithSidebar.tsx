import { ComponentType, FC } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

import Sidebar from '../Sidebar'

const { Content } = Layout

const StyledLayout = styled(Layout)`
  max-height: 100vh;
  background-color: white !important;
`

interface WithSidebarLayoutProps {}

function withSidebarLayout<P>(WrappedComponent: ComponentType<P>) {
  const WithSidebar: FC<P & WithSidebarLayoutProps> = (props) => {
    return (
      <StyledLayout>
        <Sidebar />
        <Content
          style={{
            minHeight: 280,
            background: 'white',
            borderRadius: 0,
          }}
        >
          <WrappedComponent {...props} />
        </Content>
      </StyledLayout>
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
