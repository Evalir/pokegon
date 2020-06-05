import React, { useState, useEffect } from 'react'
import { Voting } from '@aragon/connect-thegraph-voting'
import { useViewport } from 'use-viewport'
import 'styled-components/macro'
import Card from './Card'

const ALL_VOTING_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet'
const VOTING_APP_ADDR = '0x709e31ba29fb84000f20045590ec664bfc3cdc1d'

function Votes() {
  const [votes, setVotes] = useState([])
  const [loading, setLoading] = useState(false)
  const { below } = useViewport()

  useEffect(() => {
    async function getVotes() {
      try {
        setLoading(true)
        const beeVoting = new Voting(VOTING_APP_ADDR, ALL_VOTING_SUBGRAPH_URL)
        const votes = await beeVoting.votes()
        setVotes(
          votes.sort((a, b) => Number(b.startDate) - Number(a.startDate))
        )
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    getVotes()
  }, [])

  if (loading) {
    return <p> loading ... </p>
  }

  return (
    <>
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
        {votes.map((vote, idx) => (
          <Card key={vote.id} vote={{ ...vote, number: 52 - idx }} />
        ))}
      </div>
    </>
  )
}

export default Votes
