import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { generateProofUrl, generateCallDataUrl } from '../globals/urlConfig';
import { BigNumber } from 'ethers';
import Link from 'next/link'

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
  addressOrName: '0x51B543C4a9d38E747a3c1963b76E42d8Ad696ef4',
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
  // const {getA, setA} = React.useState([]);
  // const {getB, setB} = React.useState([]);
  // const {getC, setC} = React.useState([]);
  // const {getInputs, setInputs} = React.useState([]);

  // get wallet address
  const { address, isConnecting, isDisconnected } = useAccount()

  

  /* Helper Functions */
  // Minting
  const { config: zksbtMintConfig } = usePrepareContractWrite({
    ...zksbtContractConfig,
    functionName: 'mint',
    // args: [["1", "2"], [["2", "3"],["3","4"]], ["3","4"], ["4","5"]],
    args: [getCallData.a, getCallData.b, getCallData.c, getCallData.inputs],
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
  const { data: sbtData } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'getSBTData',
    watch: true,
    // wallet address as arg
    args: [address]
  });

  console.log("sbtData", sbtData);

  // console.log("sbtArrayData", sbtData[0]);

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

  /** API Call Functions */

  const getCallDataFromServer = async () => {
    axios.get(`${generateCallDataUrl}?creditScore=${getCreditScore}`)
      .then((response) => {
        const callData = convertCallDataToIntegers(response.data);
        setCallData(callData);
        console.log("RESPONSE",response.data);
        // setCallData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const convertCallDataToIntegers = (responseData) => {
    const a = responseData.a.map((item: any) => BigNumber.from(item));
    // Loop through array in b and convert to BigNumber.from
    const b = responseData.b.map((item: any) => {
      return item.map((subItem: any) => BigNumber.from(subItem));
    });
    const c = responseData.c.map((item: any) => BigNumber.from(item));
    const inputs = responseData.Input.map((item: any) => parseInt(item));
    return { a, b, c, inputs };
  };

  /** Event Handler */
  async function handleMintButtonClick() {
    // check if credit score is valid
    if (isNaN(parseInt(getCreditScore))) {
      alert("Please enter a valid credit score");
      return;
    }
    if (hasSoul){
      alert("Address already minted a SBT");
      return;
    }
    await getCallDataFromServer(); 
    
    // If call data is not empty, mint
    if (Object.keys(getCallData).length !== 0) {
      mint?.();
      console.log(getCallData);
      // alert("Minting SBT");
      return
    }
    else {
      alert("Please try clicking the mint button again");
      return
    }
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
        </div>

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
                )}

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
                {mounted && isConnected && isMinted && (
                  <div>
                  <p>Transaction Minted to</p>
                    <a href={`https://goerli.etherscan.io/tx/${mintData?.hash}`}>{mintData?.hash.slice(0, 3)}...</a>
                  </div>
                )}
              </div>
            </div>
          </div>


          <a 
            className={styles.card}
          >
            <div className="container mx-auto">
              <h2>3. View SBT details &rarr;</h2>
              <p>View your SBT details: </p>

            {mounted && isConnected && (
              // <p>SBT Details: {sbtData}</p>
              <span className="block">{
                sbtData?.map((item, index) => {
                  return (
                    <a target="_blank" href="https://goerli.etherscan.io/address/0x51B543C4a9d38E747a3c1963b76E42d8Ad696ef4#readContract" rel="noreferrer"><p className="font-light break-all" key={index}>{item.toString().slice(0,30)}...</p></a>
                  )
                })}
                </span>
              )}
            </div>
          </a>

          <div className={styles.card} >
            <h2>4. Verification of SBT &rarr;</h2>
            <p>Input in any address to get the SBT data of their Soul. </p>
            <p>
              Verify if their credit score is above 5
            </p>
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
        <div>
        <p>Contracts are deployed at:</p>
          <a href="https://goerli.etherscan.io/address/0x03bDcf58fd0E6047E10206FB655A5BDFd724df6F"><p>Verifier.sol</p></a>
          <a href="https://goerli.etherscan.io/address/0x51B543C4a9d38E747a3c1963b76E42d8Ad696ef4"><p>zkSBT.sol</p></a>
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
