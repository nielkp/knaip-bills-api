import dotenv from 'dotenv';
import app from './app';
import initializeFirebaseAdmin from './config/firebase';
import { prismaConnect } from './config/prisma';
import { initializeGlobalCategories } from './services/globalCategories.service';

dotenv.config();

const PORT = Number(process.env.PORT);

initializeFirebaseAdmin();

const startServer = async () => {

  try {
    await prismaConnect();

    await initializeGlobalCategories();

    await app.listen({ port: PORT }).then(() => {
      console.log(`Servidor rodando na porta: ${PORT}`);
    });
  } catch (err) {
    console.log(err)
  }
}

startServer()