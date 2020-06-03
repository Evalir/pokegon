import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '3box'
import ThreeBoxComments from '3box-comments-react'
import 'styled-components/macro'
import { shortenAddress } from './utils'

const ADDR = '0x702B0507CD44762bd0740Fa76Ed67bC9Fc7495f7'
const BOX_SPACE = `test-beehive-1`

function Vote({ beeVoting, box, boxSpace, currentAddress }) {
  const [vote, setVote] = useState(null)
  const [loading, setLoading] = useState(false)
  const { voteId } = useParams()
  const threadName = `${voteId}-beehive`

  useEffect(() => {
    async function getVote() {
      if (!beeVoting || !currentAddress || !box) {
        return
      }
      setLoading(true)
      try {
        const votes = await beeVoting.votes()
        const desiredVote = votes.find(({ id }) => id === voteId)
        console.log('desired', desiredVote)
        setVote(desiredVote)
      } catch (e) {
        console.log('vote err', e)
      } finally {
        setLoading(false)
      }
    }
    getVote()
  }, [beeVoting, voteId, box, currentAddress])

  if (loading || !vote) {
    return 'Loading...'
  }

  const startDate = new Date(Number(vote.startDate) * 1000)

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        min-height: 100vh;
      `}
    >
      <h2>Vote detail</h2>
      <div
        css={`
          width: 100%;
          background: white;
          corner-radius: 16px;
          padding: 16px;
          margin: 8px;
        `}
      >
        <ul
          css={`
            list-style-type: none;
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
          <ListItem>
            Start Date {startDate.toLocaleDateString('en-US')}
          </ListItem>
        </ul>
      </div>
      {box && currentAddress && (
        <CommentBox
          adminEthAddr={ADDR}
          box={box}
          ethereum={window.ethereum}
          myAddress={currentAddress}
          threadName={threadName}
        />
      )}
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

function CommentBox({ box, ethereum, myAddress, adminEthAddr, threadName }) {
  return (
    <div
      css={`
        display: block;
        max-width: 600px;
      `}
    >
      <ThreeBoxComments
        // required
        spaceName={BOX_SPACE}
        threadName={threadName}
        adminEthAddr={adminEthAddr}
        box={box}
        currentUserAddr={myAddress}
        ethereum={ethereum}
        loginFunction={() => {}}
        // optional
        useHovers
        members={false}
        showCommentCount={10}
        threadOpts={{ firstModerator: ADDR }}
      />
    </div>
  )
}

export default Vote
