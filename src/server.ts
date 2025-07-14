import dotenv from 'dotenv';
import app from './app';
dotenv.config();

const PORT = Number(process.env.PORT);

const startServer = async () => {

  try {
    await app.listen({ port: PORT }).then(() => console.log(`Servidor rodando na porta: ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

startServer()