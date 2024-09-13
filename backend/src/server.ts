import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import { router } from './routes';

const app = express();
app.use(cors());

app.use(router);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.get('/', (req: Request, res: Response) => {
  return res.send('Hello, world!');
});

app.listen(3332, () => {
  console.log('Servidor online');
});
