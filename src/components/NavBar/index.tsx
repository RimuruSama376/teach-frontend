import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-self: flex-ends;
  @media (min-width: 801px) {
    display: none !important;
    /* position: absolute;  */
  }
`

function NavBar() {
  return <Container>NaasdfasdfasdvBar</Container>
}

export default NavBar
