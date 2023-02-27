import { BlsWalletWrapper } from 'bls-wallet-clients'
import BlsAccount from './BlsAccount'
import type Account from './interfaces/Account'

export async function createAccount (accountType: string, privateKey?: string): Promise<Account> {
  if (accountType === BlsAccount.accountType) {
    return await BlsAccount.createAccount(privateKey)
  }
  throw new Error('Unsupported account type')
}

export async function generatePrivateKey (): Promise<string> {
  return await BlsWalletWrapper.getRandomBlsPrivateKey()
}
