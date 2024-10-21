import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { errorHandler } from './utils/errorHandler';
import { createRouter } from './routes';
import mongoose from 'mongoose';
import './jobs/paymentJob';


const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/default_db';

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

app.use('/public', express.static(path.join(__dirname, 'public'), {
  maxAge: '30d'
}));
const serverRouter = createRouter();

app.use('/api', serverRouter)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
