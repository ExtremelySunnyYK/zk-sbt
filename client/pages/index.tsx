import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { generateProofUrl, generateCallDataUrl } from '../globals/urlConfig';
import { BigNumber, utils } from 'ethers';
import Link from 'next/link'
import Image from 'next/image'


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


const verifierContractAddress = "0xA5578AF6d7d5dEA23020268004F6c2Fe3C2F0621"


const zksbtContractConfig = {
  addressOrName: '0x51B543C4a9d38E747a3c1963b76E42d8Ad696ef4',
  contractInterface: zkSBTInterface,
};



const Home: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const [totalMinted, setTotalMinted] = React.useState(0);
  const [getHasSoul, setHasSoul] = React.useState(false);
  const { isConnected } = useAccount();
  const [getCreditScore, setCreditScore] = React.useState('');
  const [getVerificationAddress, setVerificationAddress] = React.useState('');
  const [getCallData, setCallData] = React.useState({});
  const [getVerificationStatus, setVerificationStatus] = React.useState(null);


  // get wallet address
  const { address, isConnecting, isDisconnected } = useAccount()

  

  /* Helper Functions */
  // Minting
  const { config: zksbtMintConfig } = usePrepareContractWrite({
    ...zksbtContractConfig,
    functionName: 'mint',
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

  // SBT Data
  const { data: sbtData } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'getSBTData',
    watch: true,
    // wallet address as arg
    args: [address]
  });

  

  const { data: addressVerified } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'validateAttribute',
    // wallet address as arg
    cacheTime: 2_000,
    // enabled: false,
    args: [getVerificationAddress, verifierContractAddress]
  });

  // console.log("sbtArrayData", sbtData[0]);

  // Check if user has SBT
  const { data: hasSoul } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'hasSoul',
    watch: true,
    args: [address]
  });

  const { data: verifyingAddressHasSoul } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'hasSoul',
    watch: true,
    args: [getVerificationAddress]
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

  React.useEffect(() => {
    if (hasSoul) {
      setHasSoul(true);
    } else {
      setHasSoul(false);
    }
  }, [hasSoul]);

  React.useEffect(() => {
      if (getVerificationAddress) {
        setVerificationAddress(getVerificationAddress);
      }
    }
  , [getVerificationAddress]);

  function handleCreditScoreChange(e: any) {
    setCreditScore(e.target.value);
  }
  function handleVerificationAddressChange(e: any) {
    setVerificationAddress(e.target.value);
  }


  /** API Call Functions */

  const getCallDataFromServer = async () => {
    axios.get(`${generateCallDataUrl}?creditScore=${getCreditScore}`)
      .then((response) => {
        const callData = convertCallDataToIntegers(response.data);
        console.log("callData", callData);
        setCallData(callData);
        // setCallData(callData);
        // setCallData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
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
      console.log("Call data minted", getCallData);

      mint?.();
      return
    }
    else {
      alert("Please try clicking the mint button again");
      return
    }
  }

  async function handleVerifyButtonClick() {
    // check if the input is a valid address
    if (!utils.isAddress(getVerificationAddress)) {
      setVerificationStatus(null);
      alert("Please enter a valid address");
      return;
    }
    // // check if the address has a SBT
    if (!verifyingAddressHasSoul) {
      setVerificationStatus(null);
      alert("Address does not have a SBT");
      return;
    }
    
    // check if the address has been verified    
    if (addressVerified) {
      setVerificationStatus(true);
      return;
    }

    else if (!addressVerified) {
      setVerificationStatus(false);
      return;
    }
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
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <div className='md:container md:mx-auto'>
        <h1 className={styles.title}>
            zKSBT Mint Demo by <a href="https://spartanlabs.studio/">Spartan Labs</a>
          </h1>
          <span className='flex items-center justify-center pb-5'>
                       <Image
            className='object-none object-center'
            alt="Spartan Labs Logo"
            src="/favicon.png"
            width={50}
            height={50}
            />
          </span>
        </div>
        <p className={styles.description}>
          {totalMinted} Soul Bound Token minted so far!
        </p>

        <div className={styles.grid}>
          <a href="https://faucet.paradigm.xyz/" target="_blank" className={styles.card} rel="noreferrer">
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

            {mounted && isConnected && getHasSoul && (
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
            <form>
              <label>
                Address to verify:
                <input type="text" 
                placeholder='input address you want to verify'
                required
                value={getVerificationAddress} 
                onChange={handleVerificationAddressChange} />
              </label>
            </form>
              {mounted && isConnected && (
                  <button
                    style={{ marginTop: 2 }}
                    className="button"
                    onClick={handleVerifyButtonClick}
                  >
                    Verify
                  </button>
          )}
          
          <div>
            {(getVerificationStatus === true) && (
              <span>
              <p>Address has a SBT with credit score above 5</p>
              </span>
              
            )}
            {(getVerificationStatus === false) && (
            <p>Address does not have a SBT with credit score above 5</p>
            )}
          </div>

            
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