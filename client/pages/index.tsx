import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import Link from 'next/link';
import { generateProofUrl, generateCallDataUrl } from '../globals/urlConfig';

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

// Contracts
import verifierInterface from '../abi/verifier.json';
import zkSBTInterface from '../abi/zksbt.json';
import Router from 'next/router';


const verifierContractConfig = {
  addressOrName: '0x03bDcf58fd0E6047E10206FB655A5BDFd724df6F',
  contractInterface: verifierInterface,
};


const zksbtContractConfig = {
  addressOrName: '0x7EE2a483341C2c73CD66Fa1b1342eEeE93b93c6d',
  contractInterface: zkSBTInterface,
};



const Home: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useAccount();
  const [getCreditScore, setCreditScore] = React.useState('');
  const [getHashedCreditScore, setHashedCreditScore] = React.useState('');
  const [getProof, setProof] = React.useState('');
  const [getPublicSignals, setPublicSignals] = React.useState('');
  const [getCallData, setCallData] = React.useState({});

  // call data
  // const {getA, getB, getC, getInputs} = useContractRead(zksbtContractConfig);
  const {getA, setA} = React.useState([]);
  const {getB, setB} = React.useState([]);
  const {getC, setC} = React.useState([]);
  const {getInputs, setInputs} = React.useState([]);

  // get wallet address
  const { address, isConnecting, isDisconnected } = useAccount()

  

  /* Helper Functions */

  // Minting
  const { config: zksbtMintConfig } = usePrepareContractWrite({
    ...zksbtContractConfig,
    functionName: 'mint',
    args: [],
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(zksbtMintConfig);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess;


  // Total Supply
  const { data: totalSupplyData } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'totalSBT',
    watch: true,
  });

  // // SBT Data
  // const { data: sbtData } = useContractRead({
  //   ...zksbtContractConfig,
  //   functionName: 'getSBTData',
  //   watch: true,
  //   // wallet address as arg
  //   args: [address]
  // });

  // Check if user has SBT
  const { data: hasSoul } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'hasSoul',
    watch: true,
    args: [address]
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

  function handleCreditScoreChange(e: any) {
    setCreditScore(e.target.value);
  }

  const getCallDataFromServer = async () => {
    axios.get(`${generateCallDataUrl}?creditScore=${getCreditScore}`)
      .then((response) => {
        setCallData(response.data);
        console.log(getCallData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /** Event Handler */
  async function handleMintButtonClick() {
    // check if credit score is valid
    if (isNaN(parseInt(getCreditScore))) {
      alert("Please enter a valid credit score");
      return;
    }
    // if (hasSoul){
    //   alert("Address already minted a SBT");
    //   return;
    // }
    await getCallDataFromServer();
    setA(getCallData.a);
    setB(getCallData.b);
    setC(getCallData.c);
    setInputs(getCallData.inputs);
    console.log(getA);
    console.log(getB);
    console.log(getC);
    console.log(getInputs);

    
    // Get call data
    
    // Mint with call data
    // mint?.();

      // redirect to proof page in a new tab
      // window.open(`/proof?creditScore=${getCreditScore}`, "_blank");
  }

  async function handleVerifyButtonClick(address: string) {
    // Get Call Data onchain

    // call verifyProof Function with data
  }



  /* Render */
  return (
    <div className={styles.container}>
      <Head>
        <title>zKSBT App</title>
        <meta
          name="zkSBT Demo"
          content="by @spartan-labs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          zKSBT Mint Demo by <a href="https://spartanlabs.studio/">Spartan Labs</a> 
        </h1>

        <p className={styles.description}>
          {totalMinted} Soul Bound Token minted so far!
        </p>

        <div className={styles.grid}>
          <a href="https://faucet.paradigm.xyz/" className={styles.card}>
            <h2>1. Get some Testnet ETH &rarr;</h2>
            <p>Before you do anything, you need some Goerlli ETH from Faucet🚰</p>
          </a>

          <div className={styles.card}>
            <h2>2. Mint zkSBT with credit score &rarr;</h2>
            <p>Generate zk Proofs and mint SBT with credit score 🤫 </p>
              <form>
              <label>
                Credit Score:
                <input type="text" 
                placeholder='input credit score'
                required
                value={getCreditScore} 
                onChange={handleCreditScoreChange} />
              </label>
            </form>
               <div style={{ flex: '1 1 auto' }}>
              <div style={{ padding: '12px 12px 12px 0' }}>

                {mintError && (
                  <p style={{ marginTop: 2, color: '#FF6257' }}>
                    Error: {mintError.message}
                  </p>
                )}
                {txError && (
                  <p style={{ marginTop: 2, color: '#FF6257' }}>
                    Error: {txError.message}
                  </p>
                ) }

                {mounted && isConnected && !isMinted && (
                  <button
                    style={{ marginTop: 2 }}
                    disabled={isMintLoading || isMintStarted}
                    className="button"
                    data-mint-loading={isMintLoading}
                    data-mint-started={isMintStarted}
                    onClick={() => handleMintButtonClick()}
                  >
                    {isMintLoading && 'Waiting for approval'}
                    {isMintStarted && 'Minting...'}
                    {!isMintLoading && !isMintStarted && 'Mint'}
                  </button>
                )}
              </div>
            </div>
          </div>


          <a
            className={styles.card}
          >
            <h2>3. View SBT details &rarr;</h2>
            <p>View your SBT details 🧐</p>
            {mounted && isConnected && (
              // <p>SBT Details: {sbtData}</p>
              <p>SBT Details</p>
            )}
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>4. Verification of SBT &rarr;</h2>
            <p>Input in any address to get the SBT data of their Soul. </p>
            <p>
              Verify if their credit score is above 5
            </p>
          </a>
        </div>
        <div>
        <p>Contracts are deployed at:</p>
          <a href="https://goerli.etherscan.io/address/0x03bDcf58fd0E6047E10206FB655A5BDFd724df6F"><p>Verifier.sol</p></a>
          <a href="https://goerli.etherscan.io/address/0x2915b6F8d2A21CD1574dAB785710CDB1E987a7b2"><p>zkSBT.sol</p></a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://spartanlabs.studio/" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at Spartan Labs
        </a>
      </footer>
    </div>
  );
};

export default Home;
