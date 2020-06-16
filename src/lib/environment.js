export const ENV_VARS = {
  ADMIN_ADDR_3BOX: [
    process.env.THREAD_ADMIN_ADDR,
    '0x702B0507CD44762bd0740Fa76Ed67bC9Fc7495f7',
  ],
  SPACE_NAME_3BOX: [process.env.SPACE_NAME_3BOX, 'test-pokegon-comments-1'],
  DAO_SUBGRAPH_URL: [
    process.env.DAO_SUBGRAPH_URL,
    'https://api.thegraph.com/subgraphs/name/aragon/aragon-mainnet',
  ],
  VOTING_SUBGRAPH_URL: [
    process.env.VOTING_SUBGRAPH_URL,
    'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet',
  ],
  TOKENS_SUBGRAPH_URL: [
    process.env.TOKENS_SUBGRAPH_URL,
    'https://api.thegraph.com/subgraphs/name/aragon/aragon-tokens-mainnet',
  ],
}

export function fullEnvironment() {
  return Object.fromEntries(
    Object.keys(ENV_VARS).map((key) => [key, environment(key)])
  )
}

export default function environment(name) {
  const envVar = ENV_VARS[name]
  if (!envVar) {
    return null
  }
  return envVar[0] === undefined ? envVar[1] : envVar[0].trim()
}
