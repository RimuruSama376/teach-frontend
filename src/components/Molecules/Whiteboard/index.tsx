import styled from 'styled-components'
import { Excalidraw } from '@excalidraw/excalidraw'
import { useRef } from 'react'

const Container = styled.div`
  display: flex;
  flex: 2;
  margin-left: 10px;
  @media (min-width: 1280px) {
    border-left: 2px #cccccc solid;
  }
`
const StyledButton = styled.button`
  height: fit-content;
  padding: 8px;
  padding-bottom: 6px;
  position: absolute;
  z-index: 99;
  background-color: #ececf4;
  border: 1px #f1f0ff solid;
  border-radius: 12px;
  &:hover {
    background-color: #f1f0ff;
  }
  bottom: 55px;
  right: 18px;

  @media (max-width: 1800px) {
    /* padding: ; */
    /* background-color: white; */
    bottom: 18px;
    right: 80px;
    border: 0;
  }
`

function Whiteboard() {
  const excalidrawRef = useRef<HTMLDivElement>(null)

  const toggleFullScreen = () => {
    if (excalidrawRef.current) {
      if (!document.fullscreenElement) {
        excalidrawRef.current.requestFullscreen().catch((err) => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
        })
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }
  }
  return (
    <Container ref={excalidrawRef}>
      <StyledButton onClick={toggleFullScreen}>
        <svg
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.75 15.75L11.25 11.25M15.75 15.75V12.15M15.75 15.75H12.15M2.25 12.15V15.75M2.25 15.75H5.85M2.25 15.75L6.75 11.25M15.75 5.85V2.25M15.75 2.25H12.15M15.75 2.25L11.25 6.75M2.25 5.85V2.25M2.25 2.25H5.85M2.25 2.25L6.75 6.75'
            stroke='#8C8C8C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </StyledButton>
      {/* <div ref={excalidrawRef}> */}
      <Excalidraw />
      {/* </div> */}
    </Container>
  )
}

export default Whiteboard
