import express from 'express';
import fs from 'fs'
import cors from 'cors';


import { generateProof, verifyProof } from "./lib/generateProof.js";
import errorHandler from "./utils/errorHandler.js";

const app = express()

const port = 8080

const corsOptions = {
  // To allow requests from client
  origin: ['http://13.214.158.13:3000', 'http://localhost:3000'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};
app.use(cors(corsOptions));


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
    const { proof, publicSignals } = await generateProof(creditScore);

    // check if proofJson is null
    if (proof == null) {
      return res.status(400).send('creditScore must more than 5');
    }
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