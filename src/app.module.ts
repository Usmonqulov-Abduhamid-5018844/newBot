import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [ /*MongooseModule.forRoot("mongodb://127.0.0.1:27017/Bot"),*/
    ConfigModule.forRoot({ envFilePath: '.env' }), BotModule],
})
export class AppModule {}
