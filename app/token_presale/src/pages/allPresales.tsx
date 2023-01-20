
import { WalletConnectButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import BasicPage from '../components/basic/BasicPage'

export default function allPresales() {
  return (
    <BasicPage>
        <WalletConnectButton />
    </BasicPage>
  )
}
