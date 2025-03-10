import { UsersService } from './../users/users.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from 'src/users/users.service';

export interface ExpressRequest extends Request {
  user?: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = undefined;
      next();
      return;
    }

    const token = req.headers['authorization'].split(' ')[1];

    try {
      const decode = verify(token, process.env.JWT_SECRET as string) as {
        email: string;
      };
      const user = await this.usersService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (e) {
      req.user = undefined;
      next();
      return;
    }
  }
}
