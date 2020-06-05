import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import 'styled-components/macro'
import { shortenAddress } from './utils'

export default function TopBar({ daoAddress }) {
  const handleShare = useCallback(
    (e) => {
      e.preventDefault()
      navigator.clipboard.writeText(
        `https://pokegon.aragon.org/dao/${daoAddress}`
      )
      alert('DAO link copied to clipboard!')
    },
    [daoAddress]
  )

  return (
    <div
      css={`
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100vw;
        height: 64px;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        box-shadow: 10px 10px 64px 0px rgba(0, 0, 0, 0.11);
        font-family: 'manrope', -apple-system;
      `}
    >
      <Link
        to={`/dao/${daoAddress}`}
        css={`
          font-weight: 800;
        `}
      >
        {shortenAddress(daoAddress)}
      </Link>

      <button
        onClick={handleShare}
        css={`
          background: transparent;
          position: relative;
          padding: 12px 10px 12px 10px;
          border-radius: 16px;
          font-weight: 800;
          cursor: pointer;
          &:relative {
            top: 1;
          }
        `}
      >
        Share this DAO
      </button>
    </div>
  )
}
