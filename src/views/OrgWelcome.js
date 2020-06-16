import React, { useState, useEffect } from 'react'
import BN from 'bn.js'
import { TokenManager } from '@aragon/connect-thegraph-token-manager'
import 'styled-components/macro'
import environment from '../lib/environment'

export default function OrgWelcome({ daoAddress, tokenManagerAddress }) {
  const [tokenDetails, setTokenDetails] = useState(null)

  useEffect(() => {
    async function getTokenDetails() {
      if (!tokenManagerAddress) {
        return
      }
      try {
        const tokenManager = new TokenManager(
          tokenManagerAddress,
          environment('TOKENS_SUBGRAPH_URL')
        )
        const tokenDetails = await tokenManager.token()
        const tokenHolders = await tokenDetails.holders()
        setTokenDetails({ ...tokenDetails, holders: tokenHolders.length })
      } catch (err) {
        console.err(err)
      }
    }
    getTokenDetails()
  }, [tokenManagerAddress])

  return (
    <div
      css={`
        height: calc(100vh - 86px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <span
        css={`
          font-weight: 800;
        `}
      >
        {daoAddress}
      </span>
      {tokenDetails && (
        <>
          <p
            css={`
              margin-top: 36px;
            `}
          >
            Token: {tokenDetails.name} ({tokenDetails.symbol})
          </p>
          <p
            css={`
              margin-top: 36px;
            `}
          >
            Amount:{' '}
            {new BN(tokenDetails.totalSupply)
              .div(new BN('1000000000000000000'))
              .toString()}
          </p>
          <p
            css={`
              margin-top: 36px;
            `}
          >
            Holders: {tokenDetails.holders}
          </p>
          <p
            css={`
              margin-top: 36px;
            `}
          >
            Transferable: {tokenDetails.transferable ? 'Yes' : 'No'}
          </p>
        </>
      )}
    </div>
  )
}
