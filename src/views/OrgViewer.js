import React, { useState, useEffect } from 'react'
import { useRouteMatch, Route, Switch } from 'react-router-dom'
import { connect } from '@aragon/connect'
import { Voting } from '@aragon/connect-thegraph-voting'
import 'styled-components/macro'
import TopBar from '../components/TopBar'
import NavTabs from '../components/NavTabs'
import Holders from '../components/Holders'
import environment from '../lib/environment'
import Vote from '../views/Vote'
import Votes from '../views/Votes'
import OrgWelcome from './OrgWelcome'
import Spinner, { SpinnerWrapper } from '../components/Spinner'

export default function OrgViewer() {
  const [box, setBox] = useState(null)
  const [boxSpace, setBoxSpace] = useState(null)
  const [tokenManagerAddress, setTokenManagerAddress] = useState(null)
  const [beeVoting, setBeeVoting] = useState(null)
  const [currentAddress, setCurrentAddress] = useState(null)
  const [loading, setLoading] = useState(false)
  const { params, path } = useRouteMatch()
  const { daoId } = params

  useEffect(() => {
    async function initOrgData() {
      try {
        setLoading(true)
        const org = await connect(daoId, [
          'thegraph',
          { daoSubgraphUrl: environment('DAO_SUBGRAPH_URL') },
        ])
        const apps = await org.apps()

        const tokenManager = apps.find(
          ({ appName }) => appName && appName.startsWith('token-manager')
        )
        const votingApp = apps.find(
          ({ appName }) => appName && appName.toLowerCase().startsWith('voting')
        )
        setTokenManagerAddress(tokenManager.address)
        const voting = new Voting(
          votingApp.address,
          environment('VOTING_SUBGRAPH_URL')
        )
        setBeeVoting(voting)
      } catch (e) {
        console.error('connect error:', e)
      } finally {
        setLoading(false)
      }
    }
    // async function init3Box() {
    // try {
    // setLoading(true)
    // const [currentAddress] = await window.web3.eth.accounts
    // setCurrentAddress(currentAddress)
    // console.log(currentAddress)
    // const box = await Box.openBox(currentAddress, window.ethereum)
    // // This feels a bit slow ,but we gotta wait for the box to sync to avoid any errors when
    // // reading data (even though it's fine by 3box docs)
    // await box.syncDone
    // const space = await box.openSpace(SPACE_NAME)
    // setBox(box)
    // } catch (e) {
    // console.log('rip', e)
    // } finally {
    // setLoading(false)
    // }
    // }
    initOrgData()
    // init3Box()
  }, [daoId])

  return (
    <>
      <TopBar daoAddress={daoId} />
      <NavTabs daoAddress={daoId} />
      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
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
                daoAddress={daoId}
              />
            </Route>
            <Route path={`${path}/votes/`}>
              <Votes beeVoting={beeVoting} />
            </Route>
            <Route path={`${path}/holders/`}>
              <Holders box={box} tokenManagerAddress={tokenManagerAddress} />
            </Route>
            <Route path={`${path}/`}>
              <OrgWelcome
                daoAddress={daoId}
                tokenManagerAddress={tokenManagerAddress}
              />
            </Route>
          </Switch>
        </div>
      )}
    </>
  )
}
