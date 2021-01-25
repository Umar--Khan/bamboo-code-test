import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import appRouter from './routes';

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

app.use('/api', appRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
