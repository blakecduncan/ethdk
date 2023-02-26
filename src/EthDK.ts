import { BlsWalletWrapper } from 'bls-wallet-clients'
import Account from './Account'

export default class Ethdk {
  public walletType: string

  constructor (walletType: string) {
    if (walletType !== 'bls') {
      throw new Error('Unsupported wallet type')
    }
    this.walletType = walletType
  }

  static async createAccount (privateKey?: string): Promise<Account> {
    return await Account.createAccount(privateKey)
  }

  static async generatePrivateKey (): Promise<string> {
    return await BlsWalletWrapper.getRandomBlsPrivateKey()
  }
}
