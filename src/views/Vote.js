import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ThreeBoxComments from '3box-comments-react'
import 'styled-components/macro'
import Spinner, { SpinnerWrapper } from '../components/Spinner'
import { shortenAddress } from '../lib/utils'

const ADDR = '0x702B0507CD44762bd0740Fa76Ed67bC9Fc7495f7'
const SPACE_NAME = 'test-pokegon-comments-1'

function Vote({ beeVoting, box, boxSpace, currentAddress, daoAddress }) {
  const [vote, setVote] = useState(null)
  const [loading, setLoading] = useState(false)
  const { voteId } = useParams()
  const threadName = `${voteId}-pokegon-test`

  useEffect(() => {
    async function getVote() {
      setLoading(true)
      try {
        const votes = await beeVoting.votes()
        const orderedVotes = votes.sort(
          (a, b) => Number(b.startDate) - Number(a.startDate)
        )
        const augmentedVotes = orderedVotes.map((vote, idx) => ({
          ...vote,
          number: votes.length - idx - 1,
        }))
        const desiredVote = augmentedVotes.find(({ id }) => id === voteId)
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
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  const startDate = new Date(Number(vote.startDate) * 1000)

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        min-height: 100vh;
      `}
    >
      <h2
        css={`
          margin-left: 8px;
          font-weight: 800;
        `}
      >
        Vote {vote.number} detail
      </h2>
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
          {vote.metadata && <ListItem>Reason: {vote.metadata}</ListItem>}
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
      {box && currentAddress ? (
        <CommentBox
          adminEthAddr={ADDR}
          box={box}
          ethereum={window.ethereum}
          myAddress={currentAddress}
          threadName={threadName}
          spaceName={SPACE_NAME}
        />
      ) : (
        <h2>
          It seems 3Box couldn't initialize properly. Please, go back to the
          start and reload the page.
        </h2>
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

function CommentBox({
  box,
  ethereum,
  myAddress,
  adminEthAddr,
  threadName,
  spaceName,
}) {
  console.log(myAddress)
  return (
    <ThreeBoxComments
      // required
      spaceName={spaceName}
      threadName={threadName}
      adminEthAddr={adminEthAddr}
      box={box}
      currentUserAddr={myAddress}
      ethereum={ethereum}
      // optional
      useHovers
      members={false}
      showCommentCount={10}
      threadOpts={{ firstModerator: ADDR }}
    />
  )
}

export default Vote
