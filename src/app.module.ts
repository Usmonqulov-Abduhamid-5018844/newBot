import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { PrismaModule } from './prisma/prisma.module';
import { session } from 'telegraf';
import { BotModelonModule } from './util/bot_util/Bot.onModule.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: String(process.env.BOT_TOKEN),
      middlewares: [session()],
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    BotModule,
    PrismaModule,
    BotModelonModule,
  ],
})
export class AppModule {}
