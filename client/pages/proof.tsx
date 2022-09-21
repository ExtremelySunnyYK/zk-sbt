import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { getProofUrl } from '../globals/urlConfig';
import { useRouter } from 'next/router'


import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import zkSBTInterface from '../abi/zksbt.json';

const zksbtContractConfig = {
  addressOrName: '0x2915b6F8d2A21CD1574dAB785710CDB1E987a7b2',
  contractInterface: zkSBTInterface,
};

const Proof: NextPage = (Proof) => {

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useAccount();
  const [isLoading, setLoading] = React.useState(false)
  const [proof, setProof] = React.useState(null)
  const router = useRouter()
  const {creditScore} = router.query;


  // get wallet address
  const { address, isConnecting, isDisconnected } = useAccount()

  const getProof = () => {
    axios.get(`${getProofUrl}?creditScore=${creditScore}`)
      .then((response) => {
        console.log(response.data);
        setProof(response.data);
        setLoading(false)
      })
      .catch((error) => {
        // TODO: handle when its below 10
        console.log(error);
        setProof
      });
  }

  /* Helper Functions */
    React.useEffect(() => {
    setLoading(true)
    getProof()
  }, [])



  // Total Supply
  const { data: totalSupplyData } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'totalSBT',
    watch: true,
  });


  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);


  if (isLoading) return <p>Loading...</p>

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

        {/* Display Proof in Json Format */}
        <div>
          <h2>Proof</h2>
          <pre>{JSON.stringify(proof, null, 2)}</pre>
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

export default Proof;
