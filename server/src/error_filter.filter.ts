import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import config from './config';

@Catch(UnauthorizedException)
export class ErrorFilterFilter<T> implements ExceptionFilter {
  private logger = new Logger('FILTER');
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.log(config);
    this.logger.debug(request.headers);

    response.json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
