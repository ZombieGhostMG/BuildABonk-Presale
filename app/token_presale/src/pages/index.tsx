import React from 'react'
import AnimatedPage from '../components/animated/AnimatedPage';
import FaqSection from '../components/faq/FaqSection';
import Footer from '../components/basic/BasicFooter';
import Navbar from '../components/basic/BasicNavbar';
import ScrollToTop from '../components/other/ScrollToTopButton';
import Head from 'next/head';

function Home() {

  return (
      <>

      <Head>

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Official website of the MoonGhost NFT project." />
      <meta property="og:type" content="website" />
  
      <meta property="og:url" content="https://www.moonghostofficial.com/" />
  
      <meta property="og:title" content="MoonGhost" />
  
      <meta property="og:description" content="Official website of the MoonGhost NFT project." />
  
      <meta property="og:image" content="[https://www.moonghostofficial.com/LinkImg.png](https://www.moonghostofficial.com/LinkImg.png)" />
     
  
      <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      
      <title>BuildABonk!</title>

      </ Head>

      <AnimatedPage>
        <div>
            <Navbar activePage='Home' />
            <FaqSection />
            <Footer />
            <ScrollToTop />
        </div>
      </AnimatedPage>
      </>
  );
}

export default Home;
