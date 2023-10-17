// src/auth/auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado.' });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
      req['user'] = decodedToken; // Almacenar la información del usuario en la solicitud para que los controladores puedan acceder a ella
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token de autenticación no válido.' });
    }
  }
}
