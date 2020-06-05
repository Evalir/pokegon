import React from 'react'
import { useViewport } from 'use-viewport'
import 'styled-components/macro'

export default function Welcome() {
  const { below } = useViewport()

  return (
    <div
      css={`
        width: 100vw;
        min-height: 100vh;
        color: white;
        display: grid;
        grid-template-columns: 1fr 1fr;
        ${below('medium') &&
        `
          grid-template-columns: 1fr;
        `}
      `}
    >
      <div
        css={`
          width: 100%;
          height: 100vh;
          background: #3b8aff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-left: 32px;
        `}
      >
        <h1
          css={`
            font-size: 32px;
            font-weight: 800;
          `}
        >
          Pokegon{' '}
          <span role="img" aria-label="Eagle">
            🦅
          </span>
        </h1>
        <h3
          css={`
            font-size: 28px;
            font-weight: 600;
            margin-top: 12px;
          `}
        >
          Inspect awesome communities from your Pocket
        </h3>
        <p
          css={`
            margin-top: 12px;
            font-size: 24px;
          `}
        >
          Pokegon is a mobile-first frontend for Aragon DAOs, in which you can
          see essential information such as Votes and Token Holders.
        </p>

        <p
          css={`
            margin-top: 32px;
            font-family: monospace;
          `}
        >
          Example url: https://pokegon.aragon.org/dao/address
        </p>
      </div>
      <div
        css={`
          width: 100%;
          height: 100vh;
          display: flex;
          background: #ffcd7b;
          color: black;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-left: 32px;
        `}
      >
        <h1
          css={`
            font-size: 32px;
            font-weight: 800;
          `}
        >
          Want to find more Aragon DAOs?{' '}
          <span role="img" aria-label="Thinking">
            🤔
          </span>
        </h1>
        <p
          css={`
            margin-top: 20px;
            font-size: 24px;
          `}
        >
          Discover more DAOs with{' '}
          <a
            href="https://apiary.1hive.org/orgs"
            css={`
              text-decoration: underline;
            `}
          >
            Apiary
          </a>
          , the original DAO indexer, which also supports DAO Profiles.
        </p>
      </div>
    </div>
  )
}
