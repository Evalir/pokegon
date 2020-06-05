import React, { useState, useEffect } from 'react'
import { Voting } from '@aragon/connect-thegraph-voting'
import { useViewport } from 'use-viewport'
import 'styled-components/macro'
import Card from './Card'
import Spinner, { SpinnerWrapper } from './Spinner'

function Votes({ beeVoting }) {
  const [votes, setVotes] = useState([])
  const [loading, setLoading] = useState(false)
  const { below } = useViewport()

  useEffect(() => {
    async function getVotes() {
      if (!beeVoting) {
        return
      }
      try {
        setLoading(true)
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
  }, [beeVoting])

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
        Votes
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
        {votes.map((vote, idx) => (
          <Card
            key={vote.id}
            vote={{ ...vote, number: votes.length - idx - 1 }}
          />
        ))}
      </div>
    </>
  )
}

export default Votes
