import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModelonModuleServoce } from './Bot.onModule.service';

@Module({
  providers: [BotModelonModuleServoce],
  exports: [BotModelonModuleServoce],
  imports: [TelegrafModule],
})
export class BotModelonModule {}
