import { Injectable } from '@nestjs/common';
import { Action, Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { MyContext } from 'src/helpers/bot.context';

@Update()
@Injectable()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  onstart(@Ctx() ctx: MyContext) {
    return this.botService.Onstart(ctx);
  }
  @Action('chat')
  onChat(@Ctx() ctx: MyContext) {
    return this.botService.OnChat(ctx);
  }
  @Action('info')
  onInfo(@Ctx() ctx: MyContext) {
    return this.botService.Info(ctx);
  }
  @Action('setings')
  onSetings(@Ctx() ctx: MyContext) {
    return this.botService.OnSetings(ctx);
  }

  @Action('help')
  onHelp(@Ctx() ctx: MyContext) {
    return this.botService.OnHelp(ctx);
  }

  @Command('help')
  help(@Ctx() ctx: MyContext) {
    return this.botService.hepl(ctx);
  }
  @Command('menu')
  Menue(@Ctx() ctx: MyContext) {
    return this, this.botService.Menue(ctx);
  }

  @On('text')
  onText(@Ctx() ctx: MyContext) {
    return this.botService.Ontext(ctx);
  }

  @On('video')
  onVideo(@Ctx() ctx: MyContext) {
    return this.botService.OnVideo(ctx);
  }

  @On('photo')
  onPhoto(@Ctx() ctx: MyContext) {
    return this.botService.OnPhoto(ctx);
  }
  @On('voice')
  onVoice(@Ctx() ctx: MyContext) {
    return this.botService.OnVoice(ctx);
  }

  @On('audio')
  OnAudio(@Ctx() ctx: MyContext) {
    return this.botService.OnAudio(ctx);
  }
}
