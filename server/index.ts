import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { findPossibleWords } from './word-composer';
import cors from 'cors';

dotenv.config();

const corsOptions ={
   origin:'http://localhost:3000', 
   methods:'GET',   
   credentials:true,
   optionSuccessStatus:200,
}



const app: Express = express();
const port = 8000;
app.use(cors(corsOptions));

app.get('/', cors(corsOptions), async (req: Request, res: Response) => {
  let letters:string = req.query.letters as string;
  
  try {
  const start = performance.now()
  var list = await findPossibleWords(letters);
  res.send(JSON.stringify(list));
  const end = performance.now()
  console.log(`done in ${end-start} ms`);  
  }
  catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
  
  
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});