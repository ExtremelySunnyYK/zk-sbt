pragma circom 2.0.6;

include "circomlib/poseidon.circom";

template Example () {
    signal input threshold;
    signal input credit_score;
    signal output c;
    
    c <== credit_score - threshold;

    assert(credit_score > 2);
    assert(c >= 0 );
    
    component hash = Poseidon(2); // generates hash using poseidon function from circom library
    hash.inputs[0] <== threshold;
    hash.inputs[1] <== credit_score;

    log("hash", hash.out);
}

component main { public [ threshold  ] } = Example();

/* INPUT = {
    "threshold": "5",
    "credit_score": "77"
} */