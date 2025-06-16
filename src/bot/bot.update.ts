import { Injectable } from '@nestjs/common';
import { Action, Ctx, On, Start, Update } from 'nestjs-telegraf';
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
  @Action('menu')
  onMenu(@Ctx() ctx: MyContext) {
    return this.botService.OnMenu(ctx);
  }
  @Action('setings')
  onSetings(@Ctx() ctx: MyContext) {
    return this.botService.OnSetings(ctx)
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
