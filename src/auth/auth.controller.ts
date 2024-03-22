import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      const { username, password } = req.body;

      const token = await this.service.login({
        username: username,
        password: password,
      });

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Welcome back',
        token,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'unauthorized',
        message: error.message,
      });
    }
  }

  @Post('register')
  async register(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.service.signUp({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        created_at: new Date(),
      });

      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'success register user',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'failed',
        message: 'Failed Register user',
        error: error,
      });
    }
  }
}
