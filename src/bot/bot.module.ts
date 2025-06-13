import { Module } from '@nestjs/common';
import { BotService } from './bot.update';


@Module({
  providers: [BotService],
})
export class BotModule {}
