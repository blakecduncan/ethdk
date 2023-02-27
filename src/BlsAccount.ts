import { BlsWalletWrapper, Aggregator } from 'bls-wallet-clients'
import { ethers } from 'ethers'
import { NETWORKS } from './constants'
import type Account from './interfaces/Account'
import type SendTransactionParams from './interfaces/SendTransactionParams'

export default class BlsAccount implements Account {
  public static accountType: string = 'bls'

  address: string
  private readonly privateKey: string | Promise<string>
  private readonly wallet: BlsWalletWrapper

  private constructor (privateKey: string, wallet: BlsWalletWrapper) {
    this.privateKey = privateKey
    this.wallet = wallet
    this.address = wallet.address
  }

  static async createAccount (privateKey?: string): Promise<BlsAccount> {
    const pk = privateKey ?? await BlsWalletWrapper.getRandomBlsPrivateKey()

    const wallet = await BlsWalletWrapper.connect(
      pk,
      NETWORKS.localhost.verificationGateway, // TODO: make this a configurable
      new ethers.providers.JsonRpcProvider(NETWORKS.localhost.rpcUrl)
    )

    return new BlsAccount(pk, wallet)
  }

  async sendTransaction (params: SendTransactionParams[]): Promise<string> {
    const actions = params.map((tx) => ({
      ethValue: tx.value ?? '0',
      contractAddress: tx.to,
      encodedFunction: tx.data ?? '0x'
    }))

    const { verificationGateway, aggregatorUrl } = NETWORKS.localhost
    const nonce = (
      await BlsWalletWrapper.Nonce(
        this.wallet.PublicKey(),
        verificationGateway, // TODO: make this a configurable
        new ethers.providers.JsonRpcProvider(NETWORKS.localhost.rpcUrl)
      )
    ).toString()
    const bundle = this.wallet.sign({ nonce, actions })

    const agg = new Aggregator(aggregatorUrl)
    const result = await agg.add(bundle)

    if ('failures' in result) {
      throw new Error(JSON.stringify(result))
    }

    return result.hash
  }

  async setTrustedAccount (salt: string, trustedAccountAddress: string): Promise<string> {
    const bundle = await this.wallet.getSetRecoveryHashBundle(
      salt,
      trustedAccountAddress
    )

    const { aggregatorUrl } = NETWORKS.localhost
    const agg = new Aggregator(aggregatorUrl)
    const result = await agg.add(bundle)

    if ('failures' in result) {
      throw new Error(JSON.stringify(result))
    }

    return result.hash
  }
}
