import 'express-async-errors';
import express from 'express';

import { handleError } from './middlewares/handleErrors';
import cors from './middlewares/cors';
import router from './routes';

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors);
app.use(router);

app.use(handleError);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
