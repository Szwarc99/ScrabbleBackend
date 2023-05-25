import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { findPossibleWords } from './word-composer';

dotenv.config();


const app: Express = express();
const port = 8000;

app.get('/', (req: Request, res: Response) => {
  const start = performance.now()
  var list = findPossibleWords('asdkpolty');
  const end = performance.now()
  console.log(`done in ${end-start} ms`);
  console.log(list);
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});