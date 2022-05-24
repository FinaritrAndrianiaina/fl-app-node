import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './authz/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from './authz/interfaces/JwtPayload';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtGuard)
  @Get('/profile')
  getProfile(@Req() req: Request & { user: JwtPayload }) {
    return req.user;
  }
}
