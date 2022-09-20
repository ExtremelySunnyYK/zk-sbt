import * as snarkjs from "snarkjs";

const circuitWasm = "./config/circuit.wasm";
const finalZkey = "./config/circuit_0001.zkey";
const verificationKeyPath = "./config/verification_key.json";

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

export async function verifyProof(proofJson, publicSignals) {
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


async function getVerificationKey() {
    return await fetch(verificationKeyPath).then(function (res) {
        return res.json();
    });
}