import { Request, Response, NextFunction, request } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){

  // Receber o token
  const authToken = req.headers.authorization;
  //console.log(authToken);

  // Verificar se token está preenchido
  if (!authToken) {
    return res.status(401).end();
  }
  
  const [ , token ] = authToken.split(" ")
  // Split separa em 2 arrays
  // console.log(token)
  

  try {
    // Verificar se token é válido
    // const decode = verify(token, "secret_key");
    // console.log(decode)
    // Recuperar informações do usuário
    const { sub } = verify(token, "secret_key") as IPayload;
    req.user_id = sub;
  } catch (error) {
    return res.status(401).end();
  }
  return next();
}

