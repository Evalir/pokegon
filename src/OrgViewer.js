import React, { useState, useEffect } from 'react'
import { useRouteMatch, Route, Switch } from 'react-router-dom'
import Box from '3box'
import { connect } from '@aragon/connect'
import { Voting } from '@aragon/connect-thegraph-voting'
import 'styled-components/macro'
import TopBar from './TopBar'
import NavTabs from './NavTabs'
import Vote from './Vote'
import Votes from './Votes'
import OrgWelcome from './OrgWelcome'

const ADDR = '0x702B0507CD44762bd0740Fa76Ed67bC9Fc7495f7'
const BOX_SPACE = `test-beehive-1`

const DAO_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/aragon/aragon-mainnet'
const ALL_VOTING_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet'
const VOTING_APP_ADDR = '0x709e31ba29fb84000f20045590ec664bfc3cdc1d'

export default function OrgViewer() {
  const [beeVoting, setBeeVoting] = useState(null)
  const [box, setBox] = useState(null)
  const [boxSpace, setBoxSpace] = useState(null)
  const [tokenManagerAddress, setTokenManagerAddress] = useState(null)
  const [currentAddress, setCurrentAddress] = useState(null)
  const [loading, setLoading] = useState(false)
  const { params, path } = useRouteMatch()
  const { daoId } = params

  useEffect(() => {
    async function initOrgData() {
      const org = await connect(daoId, [
        'thegraph',
        { daoSubgraphUrl: DAO_SUBGRAPH_URL },
      ])
      console.log(org)
      const apps = await org.apps()
      console.log(apps)
      const tokenManager = apps.find(
        ({ appName }) => appName && appName.startsWith('token-manager')
      )
      console.log(tokenManager)
      setTokenManagerAddress(tokenManager.address)
    }
    async function init3Box() {
      try {
        setLoading(true)
        const [currentAddress] = await window.web3.eth.accounts
        setCurrentAddress(currentAddress)
        console.log(currentAddress)
        const box = await Box.openBox(currentAddress, window.ethereum)
        // This feels a bit slow ,but we gotta wait for the box to sync to avoid any errors when
        // reading data (even though it's fine by 3box docs)
        await box.syncDone
        setBox(box)
        const space = await box.openSpace(BOX_SPACE)
        const beeVoting = new Voting(VOTING_APP_ADDR, ALL_VOTING_SUBGRAPH_URL)
        setBeeVoting(beeVoting)
      } catch (e) {
        console.log('rip', e)
      } finally {
        setLoading(false)
      }
    }
    initOrgData()
    init3Box()
  }, [daoId])

  return (
    <>
      <TopBar daoAddress={daoId} />
      <NavTabs daoAddress={daoId} />
      <div
        css={`
          width: 100%;
          margin-top: 86px;
          font-family: 'manrope';
          overflow-x: hidden;
        `}
      >
        <Switch>
          <Route path={`${path}/votes/:voteId`}>
            <Vote
              beeVoting={beeVoting}
              box={box}
              boxSpace={boxSpace}
              currentAddress={currentAddress}
            />
          </Route>
          <Route path={`${path}/votes/`}>
            <Votes beeVoting={beeVoting} />
          </Route>
          <Route path={`${path}/`}>
            <OrgWelcome
              daoAddress={daoId}
              tokenManagerAddress={tokenManagerAddress}
            />
          </Route>
        </Switch>
      </div>
    </>
  )
}
