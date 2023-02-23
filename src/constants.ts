interface NetworkConfigType {
  name: string
  chainId: string
  rpcUrl: string
  aggregatorUrl: string
  verificationGateway: string
}

type NetworksType = Record<string, NetworkConfigType>

export const NETWORKS: NetworksType = {
  localhost: {
    name: 'localhost',
    chainId: '31337',
    rpcUrl: 'http://localhost:8545',
    aggregatorUrl: 'http://localhost:3000',
    verificationGateway: '0x689A095B4507Bfa302eef8551F90fB322B3451c6'
  }
}
