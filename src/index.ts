import express, { Request, Response } from 'express';
const app = express();
const port = 3000;
import router from './router'

app.use(express.json())

app.use(router)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});