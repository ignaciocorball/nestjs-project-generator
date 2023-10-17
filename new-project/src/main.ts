import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // Enable CORS
  const corsOptions: CorsOptions = {
    origin: '*', // This will allow requests from all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Set this to true if you want to allow credentials (cookies, HTTP authentication) to be included in CORS requests
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}
main();
