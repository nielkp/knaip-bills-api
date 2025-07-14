import app from './app';

const PORT = 3001

const startServer = async () => {

  try {
    await app.listen({ port: PORT }).then(() => console.log(`Servidor rodando na porta: ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

startServer()