import styled, { keyframes } from 'styled-components'

const donutSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 256px);
  margin: 0 auto;
  margin-top: 64px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spinner = styled.div`
  position: relative;
  z-index: 1;
  display: block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #cb2fcd;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${donutSpin} 1.2s linear infinite;
`

export default Spinner
