import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotModelonModuleServoce implements OnModuleInit {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  async onModuleInit() {
    await this.bot.telegram.setMyCommands([
      { command: '/start', description: 'Botni boshlash' },
      { command: '/help', description: 'Yordam olish' },
      { command: '/menu', description: "Asosiy menyuni ko'rish" },
      { command: "/ortga", description: "Ortga qaytish"}
    ]);
  }
}
