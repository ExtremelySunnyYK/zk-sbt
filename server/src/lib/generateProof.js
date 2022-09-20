import * as snarkjs from "snarkjs";

const circuitWasm = "./bin/circuit.wasm";
const finalZkey = "./bin/circuit_0001.zkey";

export async function generateProof(creditScore) {
    try {
        const inputSignal = {
            "threshold": 9,
            "credit_score": creditScore
        };
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            inputSignal,
            circuitWasm,
            finalZkey
        );
        return { proof, publicSignals };
    }
    catch (error) {
        console.log("Error name", error.message);

        // check if it returns Error: Assert Failed.
        if (error.message.includes("Assert Failed")) {
            return { proof: null, publicSignals: null };
        }
    }
}

async function verifyProof(proofJson, publicSignals) {
    const verificationKey = await getVerificationKey();
    const result = await snarkjs.groth16.verify(
        verificationKey,
        publicSignals,
        proofJson
    );

    // Returns true if the proof is valid
    return result;
}

// Verify the proof on chain
async function verifyProofOnchain(publicJson, proofJson) {
    const result = await contract.methods.verifyProof(publicJson, proofJson).call();
    return result;
}

async function getProvingKey() {
    return await fetch("../../circuits/demo/proving_key.json").then(function (res) {
        return res.json();
    });
}

async function getVerificationKey() {
    return await fetch("../../circuits/demo/verification_key.json").then(function (res) {
        return res.json();
    });
}