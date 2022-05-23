import {
  Controller,
  Get,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LogreqInterceptor } from './logreq.interceptor';
import { JwtGuard } from './authz/jwt.guard';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly http: HttpService,
  ) {}

  private logger = new Logger(' app ');

  @UseGuards(JwtGuard)
  @Get()
  @UseInterceptors(LogreqInterceptor)
  getHello(): string {
    /*this.http
      .get('https://learn-auth-today.eu.auth0.com/.well-known/jwks.json')
      .subscribe(
        (next) => {
          this.logger.debug(next.data);
        },
        (error) => {
          this.logger.error(error);
        },
      );*/
    return this.appService.getHello();
  }
}
