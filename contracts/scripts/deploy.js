const { ethers } = require("hardhat");

async function main() {

	// Deploy Verifier Contract
  const VerifierContract = await ethers.getContractFactory("Verifier");
	console.log("\nDeploying Verifier contract...");
	const verifier = await VerifierContract.deploy();
	console.log("Verifier contract deployed to:", verifier.address);

	// Deploy zkSBT Contract
	const zkSBTContract = await ethers.getContractFactory("zkSBT");
	console.log("\nDeploying zkSBT contract...");
	const zkSBT = await zkSBTContract.deploy("Spartan Labs ZK SBT", "zkSBT");
	console.log("zkSBT contract deployed to:", zkSBT.address);


}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});