import type { FastifyReply, FastifyRequest } from "fastify";
import admin from "firebase-admin";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  //const authHeader = request.headers.authorization;
  const authHeader = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjZkZTQwZjA0ODgxYzZhMDE2MTFlYjI4NGE0Yzk1YTI1MWU5MTEyNTAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmllbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMOWlBZXZ0YlNEQUdTTmlMa1B3MU55OUFPOUxOaWpYcUdSUVZsVENZRWVoaDlhazRxLT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9rbmFpcGJpbGxzIiwiYXVkIjoia25haXBiaWxscyIsImF1dGhfdGltZSI6MTc1MzQ2Mzc0MSwidXNlcl9pZCI6InJoemxrWHUxbEJmbHN4bTYzN1NjV0tLemVDNTMiLCJzdWIiOiJyaHpsa1h1MWxCZmxzeG02MzdTY1dLS3plQzUzIiwiaWF0IjoxNzUzNDYzNzQxLCJleHAiOjE3NTM0NjczNDEsImVtYWlsIjoiZGFueWVsa25haXBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDk5NjQ5ODk5MzkyNzMxMDE3OTUiXSwiZW1haWwiOlsiZGFueWVsa25haXBAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.X78kubERPl8fTA4D-O5CGgL3uk7JiIohVRL2CW6gEdIS_T8HB7UMnmQlOQAhcrb4y_sdzQ3WwWHkhsMesJANUXmQgaUOsHpyJgp_goJXvrqeujRjr3mKsXv-2y8Ui2Pp-FmGbArCgvcE8Ti3yCAJt_YQcAEgCiGASaOyunDhZPDP_79BF3QkfZt8FZWiOle2n6Z7cpSozsWiiUIoJ979oBUV98keQ-TZOKF3ieSuAMNxJG2HiWaDy_MKtdk4HM2VnVEJUUCbY5_UgiLOIuZHcHFgAA8yv4ZsaWZxwTtMXuPNqwtA8CEW6tgNH2o3Bg6rAn6-Eh9wxF-V8baKZHOA-w"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    reply.code(401).send({ error: "Token de autorização não fornecido." })
    return
  }

  const token = authHeader.replace("Bearer ", "")

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    request.userId = decodedToken.uid
  } catch (err) {
    request.log.error("Erro ao verificar token.", err)
    reply.code(401).send({ error: "Token inválido ou expirado." })
  }
}