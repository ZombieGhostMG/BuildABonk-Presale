import React from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import { WalletConnectProvider } from '../components/WalletConnectProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectProvider>
      <Component {...pageProps} />
    </WalletConnectProvider>
  );
}

export default MyApp;