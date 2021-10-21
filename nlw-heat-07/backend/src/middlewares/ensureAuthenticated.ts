import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: 'token.invalid',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, JWT_SECRET) as IPayload;

    // Adiciona o user id no próximo request
    // Precisa-se sobrescrever as tipagem do express com @types
    request.user_id = sub;

    return next();
  } catch {
    return response.status(401).json({ errorCode: 'token.expired' });
  }
}
