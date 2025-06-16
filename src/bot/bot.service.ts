import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Markup } from 'telegraf';
import { MyContext } from 'src/helpers/bot.context';
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.CHAT_API });

@Injectable()
export class BotService {
  constructor(private readonly prismaService: PrismaService) {}

  async Onstart(ctx: MyContext) {
    try {
      await ctx.reply(
        `Salom ${ctx.from?.first_name} Botga xush kelibsiz 😊`,
        Markup.inlineKeyboard([
          [Markup.button.callback('ChatGpt', 'chat')],
          [Markup.button.callback('Menu', 'menu')],
          [Markup.button.callback('Setings', 'setings')],
        ]),
      );
      ctx.session.state = null;
      const data = await this.prismaService.user.findFirst({
        where: { chat_id: ctx.from?.id },
      });
      if (!data && ctx.from?.is_bot == false && ctx.from.id != 5107358906) {
        let newuser = {
          chat_id: ctx.from.id,
          first_name: ctx.from.first_name,
          is_bot: ctx.from.is_bot,
          username: ctx.from?.username ?? '',
        };
        await this.prismaService.user.create({ data: newuser });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async OnChat(ctx: MyContext) {
    ctx.answerCbQuery();
    ctx.session.state = 'chat';
    ctx.reply(
      `Salom ${ctx.from?.first_name}  Chat GPT ga hush kelibsiz yozing...`,
    );
  }

  async OnMenu(ctx: MyContext) {
    ctx.answerCbQuery();
    ctx.session.state = null;
    ctx.reply('Menuga xush kelibsiz');
  }

  async OnSetings(ctx: MyContext) {
    ctx.answerCbQuery();
    ctx.session.state = null;
    ctx.reply('Setings ⚙️');
  }

  async Ontext(ctx: MyContext) {
    try {
      if (ctx.session.state === 'chat') {
        if (ctx.message && 'text' in ctx.message) {
          const text = ctx.message.text;
          const response = await client.responses.create({
            model: 'gpt-4.1',
            input: [
              {
                role: 'developer',
                content:
                  "Sen senyor developersan. Har doim tushunarli misollar bilan tushuntir.",
              },
              {
                role: 'user',
                content: `${text}`,
              },
            ],
          });
          ctx.reply(response.output_text)
        }
      } else {
        const data = await this.prismaService.user.findMany();
        if (data.length) {
          if (ctx.from && ctx.from.id === 5107358906) {
            if (ctx.message && 'text' in ctx.message) {
              for (let user of data) {
                ctx.telegram.sendMessage(
                  user.chat_id.toString(),
                  `Bu ${ctx.from.first_name} dan kelgan xabar ${ctx.message.text}`,
                );
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async OnVideo(ctx: Context) {
    try {
      const data = await this.prismaService.user.findMany();
      if (data.length) {
        if (ctx.from && ctx.from.id === 5107358906) {
          if (ctx.message && 'video' in ctx.message) {
            for (let user of data) {
              ctx.telegram.sendVideo(
                user.chat_id.toString(),
                ctx.message.video.file_id,
              );
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async OnPhoto(ctx: Context) {
    try {
      const data = await this.prismaService.user.findMany();
      if (data.length) {
        if (ctx.from && ctx.from.id === 5107358906) {
          if (ctx.message && 'photo' in ctx.message) {
            for (let user of data) {
              ctx.telegram.sendPhoto(
                user.chat_id.toString(),
                ctx.message.photo[0].file_id,
              );
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async OnVoice(ctx: Context) {
    const data = await this.prismaService.user.findMany();
    if (data.length) {
      if (ctx.from && ctx.from.id === 5107358906) {
        if (ctx.message && 'voice' in ctx.message) {
          for (let user of data) {
            user.chat_id.toString(), ctx.message.voice.file_id;
          }
        }
      }
    }
  }
  async OnAudio(ctx: Context) {
    const data = await this.prismaService.user.findMany();
    if (data.length) {
      if (ctx.from && ctx.from.id === 5107358906) {
        if (ctx.message && 'audio' in ctx.message) {
          for (let user of data) {
            user.chat_id.toString(), ctx.message.audio.file_id;
          }
        }
      }
    }
  }
}
