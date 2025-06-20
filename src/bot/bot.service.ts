import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Markup } from 'telegraf';
import { MyContext } from 'src/helpers/bot.sesion';
import OpenAI from 'openai';
import { Kurslar } from 'src/helpers/ValutaKurs';
const client = new OpenAI({ apiKey: String(process.env.CHAT_API) });

@Injectable()
export class BotService {
  constructor(private readonly prismaService: PrismaService) {}

  async Onstart(ctx: MyContext) {
    try {
      await ctx.reply(
        `Salom ${ctx.from?.first_name} Botga xush kelibsiz 😊\nBotdan foydalanish uchun quyidagi tugmalardan birini tanlayng`,
        Markup.keyboard([['Menu', 'Info', 'Help']])
          .resize()
          .oneTime(),
      );
      ctx.session.state = null;
      ctx.session.Kurses = null;
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
    ctx.session.Kurses = null;
    ctx.session.state = 'chat';
    ctx.reply(
      `Salom ${ctx.from?.first_name}  Chat GPT ga hush kelibsiz yozing...`,
    );
  }

  // async OnSetings(ctx: MyContext) {
  //   ctx.answerCbQuery();
  //   ctx.session.state = null;
  //   ctx.reply('Setings ⚙️');

  // }
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
      }
    } catch (error) {
      return ctx.reply(error.message);
    }
    try {
      if (ctx.session.Kurses) {
        if (ctx.message && 'text' in ctx.message) {
          let amout = parseFloat(ctx.message.text);
          if (isNaN(amout)) {
            ctx.reply('Iltimos faqat raqam kiriting! ');
            return;
          }
          switch (ctx.session.Kurses) {
            case 'usd_uzs':
              let usd = await Kurslar('USD');
              let result = amout * usd;
              await ctx.reply(`${amout} USD  =>  ${result.toFixed(2)} UZS`);
              break;
            case 'usd_eur':
              let usd2 = await Kurslar('USD');
              let eur = await Kurslar('EUR');
              let result2 = (usd2 / eur) * amout;
              await ctx.reply(`${amout} USD  =>  ${result2.toFixed(2)} EUR`);
              break;
            case 'usd_rub':
              let usd3 = await Kurslar('USD');
              let rub = await Kurslar('RUB');
              let result3 = (usd3 / rub) * amout;
              await ctx.reply(`${amout} USD  =>  ${result3.toFixed(2)} RUB`);
              break;

            case 'eur_uzs':
              let eur2 = await Kurslar('USD');
              let result4 = amout * eur2;
              await ctx.reply(`${amout} EUR  =>  ${result4.toFixed(2)} UZS`);
              break;
            case 'eur_usd':
              let usd4 = await Kurslar('USD');
              let eur3 = await Kurslar('EUR');
              let result5 = (eur3 / usd4) * amout;
              await ctx.reply(`${amout} EUR  =>  ${result5.toFixed(2)} USD`);
              break;
            case 'eur_rub':
              let eur4 = await Kurslar('EUR');
              let rub2 = await Kurslar('RUB');
              let result6 = (eur4 / rub2) * amout;
              await ctx.reply(`${amout} EUR  =>  ${result6.toFixed(2)} RUB`);
              break;

            case 'rub_uzs':
              let rub3 = await Kurslar('RUB');
              let result7 = amout * rub3;
              await ctx.reply(`${amout} RUB  =>  ${result7.toFixed(2)} UZS`);
              break;
            case 'rub_usd':
              let usd5 = await Kurslar('USD');
              let rub4 = await Kurslar('RUB');
              let result8 = (rub4 / usd5) * amout;
              await ctx.reply(`${amout} RUB  =>  ${result8.toFixed(2)} USD`);
              break;
            case 'rub_eur':
              let eur5 = await Kurslar('EUR');
              let rub5 = await Kurslar('RUB');
              let result9 = (eur5 / rub5) * amout;
              await ctx.reply(`${amout} RUB  =>  ${result9.toFixed(2)} EUR`);
              break;

            case 'uzs_usd':
              let usd6 = await Kurslar('USD');
              let result10 = amout / usd6;
              await ctx.reply(`${amout} UZS  =>  ${result10.toFixed(2)} USD`);
              break;
            case 'uzs_eur':
              let eur6 = await Kurslar('EUR');
              let result11 = amout / eur6;
              await ctx.reply(`${amout} UZS  =>  ${result11.toFixed(2)} RUR`);
              break;
            case 'uzs_rub':
              let rub6 = await Kurslar('RUB');
              let result12 = amout / rub6;
              await ctx.reply(`${amout} UZS  =>  ${result12.toFixed(2)} RUB`);
              break;

            default:
              await ctx.reply("Noma'lum tanlov  ❌");
              break;
          }
        }
      } else {
        const data = await this.prismaService.user.findMany({});
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
    } catch (error) {}
  }

  async OnHelp(ctx: MyContext) {
    ctx.answerCbQuery();
    ctx.session.state = null;
    ctx.session.Kurses = null;
    await ctx.reply(
      `🤖 Yordam bo'limi:
      
      1. ChatGPT — sun'iy intellekt bilan suhbat qurish uchun "ChatGPT" tugmasini bosing.  
      2. Menu — botning boshqa imkoniyatlarini ko'rish uchun "Menu" tugmasini bosing.  
      3. valyuta kurslari — bu bo'limda siz valyuta kurslarini bilishingiz mumkit.  
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
    ctx.session.Kurses = null;
    await ctx.reply(
      `🤖 Yordam bo'limi:
      
      1. ChatGPT — sun'iy intellekt bilan suhbat qurish uchun "ChatGPT" tugmasini bosing.  
      2. Menu — botning boshqa imkoniyatlarini ko'rish uchun "Menu" tugmasini bosing.  
      3. valyuta kurslari — bu bo'limda siz valyuta kurslarini bilishingiz mumkit.  
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
    ctx.session.Kurses = null;
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
    ctx.session.Kurses = null;
    await ctx.reply(
      '📋 Menue',
      Markup.inlineKeyboard([
        [Markup.button.callback('🧠  ChatGPT bilan suhbat', 'chat')],
        [Markup.button.callback('📄  Info', 'info')],
        [Markup.button.callback('🙋🏻  Hepl', 'help')],
        [Markup.button.callback('💵  Valyuta kurslari', 'kurs')],
        // [Markup.button.callback('⚙️  Setings', 'setings')],
      ]),
    );
  }
  async ortga(ctx: MyContext) {
    if (ctx.session.Kurses) {
      ctx.session.state = null;
      ctx.session.Kurses = null;
      await ctx.deleteMessage();
      return this.onKurs(ctx);
    } else {
      return this.Menue(ctx);
    }
  }

  async onKurs(ctx: MyContext) {
    ctx.session.Kurses = null;
    try {
      ctx.reply(
        '💸 Convertatsiya turini tanlayng',
        Markup.inlineKeyboard([
          [Markup.button.callback('USD   ➡️   UZS', 'usd_uzs')],
          [Markup.button.callback('USD   ➡️   EUR', 'usd_eur')],
          [Markup.button.callback('USD   ➡️   RUB', 'usd_rub')],

          [Markup.button.callback('EUR   ➡️   UZS', 'eur_uzs')],
          [Markup.button.callback('EUR   ➡️   USD', 'eur_usd')],
          [Markup.button.callback('EUR   ➡️   RUB', 'eur_rub')],

          [Markup.button.callback('RUB   ➡️   UZS', 'rub_uzs')],
          [Markup.button.callback('RUB   ➡️   USD', 'rub_usd')],
          [Markup.button.callback('RUB   ➡️   EUR', 'rub_eur')],

          [Markup.button.callback('UZS   ➡️   USD', 'uzs_usd')],
          [Markup.button.callback('UZS   ➡️   EUR', 'uzs_eur')],
          [Markup.button.callback('UZS   ➡️   RUB', 'uzs_rub')],

          [Markup.button.callback('⬅️   Ortga', 'orqaga')],
        ]),
      );
    } catch (error) {
      ctx.reply(`❌  Xatolik yuz berdi: ${error.message}`);
    }
  }

  //############################### KURSLAR ######################################
  async On_usd_uzs(ctx: MyContext) {
    ctx.session.Kurses = 'usd_uzs';
    ctx.reply('USD miqdorini kiriting >>> ');
  }
  async On_usd_eur(ctx: MyContext) {
    ctx.session.Kurses = 'usd_eur';
    ctx.reply('USD miqdorini kiriting >>> ');
  }
  async On_usd_rub(ctx: MyContext) {
    ctx.session.Kurses = 'usd_rub';
    ctx.reply('USD miqdorini kiriting >>> ');
  }

  async On_eur_uzs(ctx: MyContext) {
    ctx.session.Kurses = 'eur_uzs';
    ctx.reply('EUR miqdorini kiriting >>> ');
  }
  async On_eur_usd(ctx: MyContext) {
    ctx.session.Kurses = 'eur_usd';
    ctx.reply('EUR miqdorini kiriting >>> ');
  }
  async On_eur_rub(ctx: MyContext) {
    ctx.session.Kurses = 'eur_rub';
    ctx.reply('EUR miqdorini kiriting >>> ');
  }

  async On_rub_uzs(ctx: MyContext) {
    ctx.session.Kurses = 'rub_uzs';
    ctx.reply('RUB miqdorini kiriting >>> ');
  }
  async On_rub_usd(ctx: MyContext) {
    ctx.session.Kurses = 'rub_usd';
    ctx.reply('RUB miqdorini kiriting >>> ');
  }
  async On_rub_eur(ctx: MyContext) {
    ctx.session.Kurses = 'rub_eur';
    ctx.reply('RUB miqdorini kiriting >>> ');
  }

  async On_uzs_usd(ctx: MyContext) {
    ctx.session.Kurses = 'uzs_usd';
    ctx.reply('UZS miqdorini kiriting >>> ');
  }
  async On_uzs_eur(ctx: MyContext) {
    ctx.session.Kurses = 'uzs_eur';
    ctx.reply('UZS miqdorini kiriting >>> ');
  }
  async On_uzs_rub(ctx: MyContext) {
    ctx.session.Kurses = 'uzs_rub';
    ctx.reply('UZS miqdorini kiriting >>> ');
  }
  //############################### KURSLAR ######################################

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
