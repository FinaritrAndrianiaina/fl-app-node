import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
const logger = new Logger("[MAIN APP]");
bootstrap().then(()=>{
  logger.log("App started on localhost:3000 🚀")
});
