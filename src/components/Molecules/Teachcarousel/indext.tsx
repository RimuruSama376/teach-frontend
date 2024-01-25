import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  min-height: 230px !important;
  max-height: 252px;
  border-radius: 12px;
  background-color: #5ab2a6;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`

const Blob = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0, 0) scale(1);
  z-index: 0;
`

const Content = styled.span`
  position: relative;
  z-index: 1;
  color: white;
  text-align: left;
  max-width: 40%;,,
  /* border: 1px red solid; */
  padding-left: 2rem;

  h1 {
    margin: 0.5rem 0;
    font-size: 2rem;
  }

  p {
    margin: 0.5rem 0;
  }

  button {
    color: white;
    background-color: transparent;
    border: 1px white solid;
    border-radius: 9px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    margin-top: 1rem;
    width: 109px;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #fec63d;
    }
  }
`

function TeachCarousel() {
  return (
    <Container>
      {/* <Blob viewBox='01 -10 190 210' xmlns='http://www.w3.org/2000/svg'>
        <path
          fill='#FEC63D'
          d='M35.4,-60.2C45.8,-55.4,54,-45.7,64.2,-34.8C74.4,-24,86.5,-12,83.1,-2C79.7,8,60.8,16.1,51.7,28.8C42.6,41.6,43.3,59,36.4,60.4C29.4,61.7,14.7,47.1,2.8,42.2C-9,37.3,-18.1,42.1,-25.7,41.1C-33.3,40.1,-39.5,33.3,-47.4,25.4C-55.2,17.6,-64.7,8.8,-70.4,-3.3C-76.1,-15.4,-78,-30.8,-69.6,-37.6C-61.2,-44.5,-42.5,-42.8,-29.2,-46C-15.9,-49.1,-7.9,-57,2.3,-61C12.5,-64.9,25.1,-65,35.4,-60.2Z'
          transform='translate(100 100)'
        />
      </Blob> */}
      <Blob
        width='305'
        height='245'
        viewBox='0 0 305 245'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M149.683 20.8365C174.224 23.9443 197.149 1.857 221.189 7.6794C248.755 14.3559 275.597 30.357 289.899 54.7964C304.633 79.9746 298.77 110.889 298.645 140.043C298.501 173.935 318.125 221.567 289.114 239.205C255.879 259.412 215.867 220.856 177.628 213.62C159.411 210.173 141.906 206.229 123.436 207.853C89.1869 210.866 54.3021 243.759 24.2409 227.113C-2.64086 212.227 -0.942706 170.629 0.925197 140.014C2.60473 112.487 23.2898 91.4001 34.0705 66.0052C45.2553 39.6584 38.769 -1.60551 65.475 -12.0392C94.1219 -23.2313 119.163 16.9716 149.683 20.8365Z'
          fill='#FEC63D'
        />
      </Blob>

      <Content>
        <h1>Your Videos</h1>
        <p>
          Lorem ipsum dolor sit amet,
          <br /> consectetur.
        </p>
        <button>Add</button>
      </Content>
      <svg
        width='23'
        height='17'
        viewBox='0 0 23 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ position: 'absolute', top: '234px', left: '290px' }}
      >
        <circle cx='11.5' cy='11.5' r='11.5' fill='#FEC63D' />
      </svg>
      <svg
        width='33'
        height='33'
        viewBox='0 0 33 33'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ position: 'absolute', top: '212px', left: '320px' }}
      >
        <circle cx='16.5' cy='16.5' r='16.5' fill='#FEC63D' />
      </svg>
      <svg
        width='23'
        height='19'
        viewBox='0 0 23 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ position: 'absolute', top: '0px', left: '350px' }}
      >
        <circle cx='11.5' cy='7.5' r='11.5' fill='#FEC63D' />
      </svg>
    </Container>
  )
}

export default TeachCarousel
