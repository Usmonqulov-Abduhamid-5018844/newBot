import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TelegrafModule.forRoot({
    token: "8005337694:AAHQdkeu_jcK_d8H5SDKcCqOel_aYuDI6b4"
  }),
    ConfigModule.forRoot({ envFilePath: '.env' }), BotModule, PrismaModule],
})
export class AppModule {}
