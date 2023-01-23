
import React from 'react'
import BasicPage from '../components/basic/BasicPage'
import CreatePresaleForm from '../components/presales/CreatePresaleForm'
import usePresale from '../hooks/usePresale'
import InitializeWalletCard from '../components/InitializeWalletCard'
import ConnectWalletCard from '../components/ConnectWalletCard'

export default function allPresales() {
  const { walletConnected, initializedWallet } = usePresale();
  return (
    <BasicPage activePage={'Create'}>

      {!walletConnected &&
        <ConnectWalletCard />
  }

      {walletConnected && !initializedWallet &&
        <InitializeWalletCard />
      }

      { walletConnected && initializedWallet &&
        <CreatePresaleForm /> 
      }


    </BasicPage>
  )
}
