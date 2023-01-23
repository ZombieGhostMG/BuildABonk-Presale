
import React from 'react'
import BasicPage from '../components/basic/BasicPage'
import PresaleSection from '../components/presales/PresaleSection';
import usePresale from '../hooks/usePresale'

export default function discover() {
  const { walletConnected, getAllPresales } = usePresale();
  return (
    <BasicPage activePage={'Discover'}>
      {walletConnected ? (
      <PresaleSection presales={getAllPresales}/>

      ) : (
        <div className='flex flex-col items-center justify-center h-full'>
          <h1>Please Connect Wallet</h1>
        </div>
      )
      
    }

    </BasicPage>
  )
}
