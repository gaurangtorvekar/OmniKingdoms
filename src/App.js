import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import React, { useState, useEffect } from 'react';

import Action from './game/action';
import Mint from './game/mint';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import StickyFooter from './components/StickyFooter';

import { ethers } from "ethers";
import { Spinner } from 'react-bootstrap';

import './App.css'

function App() {

  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);

  const web3Handler = async () => {
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    // Setup event listeners for metamask
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    })
    window.ethereum.on('accountsChanged', async () => {
      setLoading(true)
      web3Handler()
    })
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get signer
    // const signer = provider.getSigner()
    // loadContract(signer)
  };

  useEffect(() => {
    web3Handler();
  }, []);



  return (
    <HashRouter>
      <div className="App">
        <div>
          <ResponsiveAppBar login={web3Handler} account={account} />
        </div>

        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (         
            <Routes>
              <Route path="/" element={
                <Action />
              } />
              <Route path="/mint" element={
                <Mint />
              } />
            </Routes>
          )}
        </div>
        <div>
          <StickyFooter />
        </div>
      </div>
    </HashRouter>

  );
}

export default App;
