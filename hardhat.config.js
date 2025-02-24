require("hardhat-circom");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
  compilers: [
    {
      version: "0.6.11",
    },
    {
      version: "0.8.9",
    },
  ],
},
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP || null,
    enabled: true,
  },
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- 
      chainId: 5,
      accounts: [process.env.PRIVATE_KEY],
   }
  },
  circom: {
  inputBasePath: "./circuits",
    ptau: "https://hermezptau.blob.core.windows.net/ptau/powersOfTau28_hez_final_15.ptau",
      circuits: [
        {
          name: "division",
          // No protocol, so it defaults to groth16
        },
        {
          name: "simple-polynomial",
          // Generate PLONK
          protocol: "plonk",
        },
        {
          name: "hash",
          // Explicitly generate groth16
          protocol: "groth16",
        },
      ],
  },
};
