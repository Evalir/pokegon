import React from 'react'
import { useHistory } from 'react-router'
import 'styled-components/macro'
import { shortenAddress } from './utils'

export default function Card({ vote }) {
  const history = useHistory()
  const startDate = new Date(Number(vote.startDate) * 1000)
  console.log(vote)

  return (
    <div
      css={`
        width: 300px;
        background: white;
        border-radius: 4px;
        padding: 16px;
        margin: 8px;
        box-shadow: 10px 10px 64px 0px rgba(0, 0, 0, 0.11);
        margin-bottom: 16px;
      `}
    >
      <h3
        css={`
          color: #a0a1b5;
          text-align: center;
        `}
      >
        Vote {vote.number}
      </h3>
      <ul
        css={`
          list-style-type: none;
          padding: 0;
        `}
      >
        <ListItem>Open: {String(!vote.executed)}</ListItem>
        <ListItem>Snapshot block: {vote.snapshotBlock}</ListItem>
        <ListItem>
          Creator:{' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={`https://etherscan.io/address/${vote.creator}`}
          >
            {shortenAddress(vote.creator)}
          </a>
        </ListItem>
        <ListItem>Start Date {startDate.toLocaleDateString('en-US')}</ListItem>
      </ul>
      <div
        css={`
          width: 100%;
          display: flex;
          align-items: center;
          margin-top: 32px;
        `}
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            history.push(`/${vote.id}`)
          }}
          css={`
            border-radius: 4px;
            position: relative;
            margin: 0 auto;
            background: #39ccb7;
            color: white;
            font-weight: 800;
            border: 0;
            padding: 14px 12px 14px 12px;
            cursor: pointer;
            &:active {
              top: 1px;
            }
          `}
        >
          View proposal
        </button>
      </div>
    </div>
  )
}

function ListItem({ children }) {
  return (
    <li
      css={`
        font-weight: 600;
        margin-bottom: 16px;
      `}
    >
      {children}
    </li>
  )
}
