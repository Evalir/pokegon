import React from 'react'
import { useHistory } from 'react-router'
import BN from 'bn.js'
import 'styled-components/macro'
import { shortenAddress } from './utils'
import Blockies from 'react-blockies'

const NUM_BASE = new BN('1000000000000000000')

export default function HolderCard({ holder }) {
  const history = useHistory()

  return (
    <div
      css={`
        width: 300px;
        background: white;
        border: 2px solid rgb(212, 212, 237);
        border-radius: 4px;
        padding: 16px;
        margin: 8px;
        box-shadow: 10px 10px 64px 0px rgba(0, 0, 0, 0.11);
        margin-bottom: 16px;
      `}
    >
      <ul
        css={`
          list-style-type: none;
          padding: 0;
        `}
      >
        <ListItem>
          <Blockies seed={holder.address} />
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={`https://etherscan.io/address/${holder.address}`}
            css={`
              margin-left: 8px;
            `}
          >
            {holder.name}
          </a>
        </ListItem>
        <ListItem>
          Balance: {new BN(holder.balance).div(NUM_BASE).toString()}{' '}
          {holder.symbol}
        </ListItem>
      </ul>
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
