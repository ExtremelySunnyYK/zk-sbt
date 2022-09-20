import express from 'express';
import fs from 'fs'

import { generateProof, verifyProof } from "./lib/generateProof.js";
import errorHandler from "./utils/errorHandler.js";

const app = express()

const port = 8080

app.get('/', (req, res, next) => {
  res.send('Hello World!')
})

app.get('/api/generate-proof', async (req, res, next) => {
  try {
    const creditScore = req.query.creditScore;
    // check if creditScore is a number
    if (isNaN(creditScore)) {
      return res.status(400).send('creditScore must be a number');
    }

    console.log(creditScore);
    const { proof, publicSignals } = await generateProof(creditScore);

    // check if proofJson is null
    if (proof == null) {
      return res.status(400).send('creditScore must be less than 5');
    }
    console.log(proof);
    return res.status(200).json({ proof, publicSignals });

  } catch (error) {
    console.log(`Error Message ${error.message}`);
    next(error);
  }
})

app.post('/api/verify-proof', async (req, res, next) => {
  try {
    const { proof, publicSignals } = req.body;
    const result = await verifyProof(proof, publicSignals);
    return res.status(200).json({ result });
  } catch (error) {
    console.log(`Error Message ${error.message}`);
    next(error);
  }
})


app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})