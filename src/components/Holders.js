import React, { useState, useEffect } from 'react'
import Box from '3box'
import { useViewport } from 'use-viewport'
import { TokenManager } from '@aragon/connect-thegraph-token-manager'
import 'styled-components/macro'
import HolderCard from './HolderCard'
import environment from '../lib/environment'
import Spinner, { SpinnerWrapper } from './Spinner'

function Holders({ tokenManagerAddress }) {
  const [holders, setHolders] = useState([])
  const [loading, setLoading] = useState(false)
  const { below } = useViewport()

  useEffect(() => {
    async function getVotes() {
      if (!tokenManagerAddress) {
        return
      }
      try {
        setLoading(true)
        const tokenManager = new TokenManager(
          tokenManagerAddress,
          environment('TOKENS_SUBGRAPH_URL')
        )
        const tokenDetails = await tokenManager.token()
        const tokenHolders = await tokenDetails.holders()
        const augmentedHolders = await Promise.all(
          tokenHolders.map(async (holder) => {
            const profile = await Box.getProfile(holder.address)
            return {
              ...holder,
              name: profile.name || 'Unknown',
              symbol: tokenDetails.symbol,
            }
          })
        )
        setHolders(augmentedHolders)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    getVotes()
  }, [tokenManagerAddress])

  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  return (
    <>
      <h1
        css={`
          font-size: 32px;
          font-weight: 800;
          margin-left: 16px;
          margin-bottom: 8px;
        `}
      >
        Token Holders
      </h1>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 64px;
          ${below('medium') &&
          `
            justify-content: center;
          `}
        `}
      >
        {holders.map((holder) => (
          <HolderCard key={holder.address} holder={holder} />
        ))}
      </div>
    </>
  )
}

export default Holders
