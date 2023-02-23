import { BlsWalletWrapper } from 'bls-wallet-clients'
import { ethers } from 'ethers'
import { NETWORKS } from './constants'

export default class Account {
  address: string
  private readonly privateKey: string | Promise<string>
  private readonly wallet: BlsWalletWrapper

  private constructor (privateKey: string, wallet: BlsWalletWrapper) {
    this.privateKey = privateKey
    this.wallet = wallet
    this.address = wallet.address
  }

  static async createAccount (privateKey?: string): Promise<Account> {
    const pk = privateKey ?? await BlsWalletWrapper.getRandomBlsPrivateKey()

    const wallet = await BlsWalletWrapper.connect(
      pk,
      NETWORKS.localhost.verificationGateway, // TODO: make this a configurable
      new ethers.providers.JsonRpcProvider(NETWORKS.localhost.rpcUrl)
    )

    return new Account(pk, wallet)
  }
}
