import React from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { Inbox, Home, User } from 'react-feather'
import 'styled-components/macro'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  border: 0px;
  background: white;
  color: #cb2fcd;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 800px;
`

export default function NavTabs({ daoAddress }) {
  const history = useHistory()
  const match = useRouteMatch()

  return (
    <div
      css={`
        background: white;
        position: fixed;
        z-index: 1;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 64px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        box-shadow: 10px 10px 64px 0px rgba(0, 0, 0, 0.11);
        font-family: 'manrope', -apple-system;
      `}
    >
      <StyledLink to={`/dao/${daoAddress}/votes/`}>
        <Inbox /> <span>Votes</span>
      </StyledLink>
      <StyledLink to={`/dao/${daoAddress}/`}>
        <Home /> <span>Home</span>
      </StyledLink>
      <StyledLink to={`/dao/${daoAddress}/holders`}>
        <User /> <span>Holders</span>
      </StyledLink>
    </div>
  )
}
