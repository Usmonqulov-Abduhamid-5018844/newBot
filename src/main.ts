import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const Port = Number(process.env.PORT) || 4000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(Port, ()=>{
    console.log(`Server started on port ${Port}`);
    
  });
}
bootstrap();
