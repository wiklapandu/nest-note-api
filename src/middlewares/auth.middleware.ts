import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from 'src/requests/auth.request';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'unauthorized',
        message: 'Token is required',
      });
    }

    try {
      const decode = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      req.user = decode;

      next();
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'unauthorized',
        message: 'Unauthorized token',
      });
    }
  }
}
