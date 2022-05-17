import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started'); 
})

