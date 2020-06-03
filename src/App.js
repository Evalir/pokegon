import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Box from '3box'
import { Voting } from '@aragon/connect-thegraph-voting'
import TopBar from './TopBar.js'
import Vote from './Vote'
import Votes from './Votes'
import './App.css'

const ADDR = '0x702B0507CD44762bd0740Fa76Ed67bC9Fc7495f7'
const BOX_SPACE = `test-beehive-1`

const ALL_VOTING_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet'
const VOTING_APP_ADDR = '0x709e31ba29fb84000f20045590ec664bfc3cdc1d'

function App() {
  const [beeVoting, setBeeVoting] = useState(null)
  const [box, setBox] = useState(null)
  const [boxSpace, setBoxSpace] = useState(null)
  const [currentAddress, setCurrentAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function init3Box() {
      try {
        setLoading(true)
        const [currentAddress] = await window.web3.eth.accounts
        setCurrentAddress(currentAddress)
        const box = await Box.openBox(ADDR, window.ethereum)
        // This feels a bit slow ,but we gotta wait for the box to sync to avoid any errors when
        // reading data (even though it's fine by 3box docs)
        await box.syncDone
        console.log(await box.public.all())
        setBox(box)
        const space = await box.openSpace(BOX_SPACE)
        setBoxSpace(space)
        const beeVoting = new Voting(VOTING_APP_ADDR, ALL_VOTING_SUBGRAPH_URL)
        setBeeVoting(beeVoting)
      } catch (e) {
        console.log('rip', e)
      } finally {
        setLoading(false)
      }
    }
    init3Box()
  }, [])

  if (loading) {
    return null
  }

  return (
    <>
      <TopBar />
      <div
        css={`
          width: 100%;
          margin-top: 86px;
        `}
      />
      <Router>
        <Switch>
          <Route path="/:voteId">
            <Vote
              beeVoting={beeVoting}
              box={box}
              boxSpace={boxSpace}
              currentAddress={currentAddress}
            />
          </Route>
          <Route path="/">
            <Votes beeVoting={beeVoting} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
