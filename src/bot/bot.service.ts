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
      await ctx.reply(`Salom ${ctx.from?.first_name} Botga xush kelibsiz 😊`);
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
  async OnSetings(ctx: MyContext) {
    ctx.answerCbQuery();
    ctx.session.state = null;
    ctx.reply('Setings ⚙️');
  }
  async OnHelp(ctx: MyContext) {
    ctx.answerCbQuery();
    ctx.session.state = null;
    await ctx.reply(
      `🤖 Yordam bo'limi:
      
      1. ChatGPT — sun'iy intellekt bilan suhbat qurish uchun "ChatGPT" tugmasini bosing.  
      2. Menu — botning boshqa imkoniyatlarini ko'rish uchun "Menu" tugmasini bosing.  
      3. Settings — til, bildirishnoma va boshqa sozlamalarni o'zgartirish uchun.  
      4. Savollar — tez-tez beriladigan savollarga javoblar quyida:
      
      📌 Savol: Bu bot nima qila oladi?  
      ➡️ Javob: Sizga har xil savollarga javob beradi, matnlar yozadi, tarjima qiladi va h.k.
      
      📌 Savol: ChatGPT bilan qanday suhbat quraman?  
      ➡️ Javob: "ChatGPT" tugmasini bosing va yozishni boshlang.
      
      ✉️ Aloqa uchun: @Abduhamid_1852
      `,
    );
  }
  async hepl(ctx: MyContext) {
    ctx.session.state = null;
    await ctx.reply(
      `🤖 Yordam bo'limi:
      
      1. ChatGPT — sun'iy intellekt bilan suhbat qurish uchun "ChatGPT" tugmasini bosing.  
      2. Menu — botning boshqa imkoniyatlarini ko'rish uchun "Menu" tugmasini bosing.  
      3. Settings — til, bildirishnoma va boshqa sozlamalarni o'zgartirish uchun.  
      4. Savollar — tez-tez beriladigan savollarga javoblar quyida:
      
      📌 Savol: Bu bot nima qila oladi?  
      ➡️ Javob: Sizga har xil savollarga javob beradi, matnlar yozadi, tarjima qiladi va h.k.
      
      📌 Savol: ChatGPT bilan qanday suhbat quraman?  
      ➡️ Javob: "ChatGPT" tugmasini bosing va yozishni boshlang.
      
      ✉️ Aloqa uchun: @Abduhamid_1852
      `,
    );
  }
  async Info(ctx: MyContext) {
    ctx.session.state = null;
    try {
      if (ctx.from) {
        await ctx.reply(
          `🧾  Foydalanuvchi ma'lumotlari:\n\n` +
            `👤  Ism: ${ctx.from.first_name || "Noma'lum"}\n` +
            `👥  Familya: ${ctx.from.last_name || "Ko'rsatilmagan"}\n` +
            `💬  Username: @${ctx.from.username || "yo'q"}\n` +
            `🆔  Telegram ID: ${ctx.from.id}`,
        );
      }
    } catch (error) {
      ctx.reply(`❌ Xatolik yuz berdi error: ${error.message}`);
    }
  }
  async Menue(ctx: MyContext) {
    ctx.session.state = null;
    await ctx.reply(
      '📋 Menue',
      Markup.inlineKeyboard([
        [Markup.button.callback('🧠  ChatGPT bilan suhbat', 'chat')],
        [Markup.button.callback('📄  Info', 'info')],
        [Markup.button.callback('🙋🏻 Hepl', 'help')],
        [Markup.button.callback('⚙️  Setings', 'setings')],
      ]),
    );
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
                  'Sen senyor developersan. Har doim tushunarli misollar bilan tushuntir.',
              },
              {
                role: 'user',
                content: `${text}`,
              },
            ],
          });
          ctx.reply(response.output_text);
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
      ctx.reply(`❌ Xatolik yuz berdi error: ${error.message}`);
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
