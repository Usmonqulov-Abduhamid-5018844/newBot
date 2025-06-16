import { Injectable } from '@nestjs/common';
import { Ctx, On, Start, Update } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  onstart(@Ctx() ctx: Context) {
    return this.botService.Onstart(ctx);
  }
  @On('text')
  onText(@Ctx() ctx: Context) {
    return this.botService.Ontext(ctx)
  }

  @On("video")
  onVideo(@Ctx() ctx: Context){
    return this.botService.OnVideo(ctx)
  }

  @On("photo")
  onPhoto(@Ctx() ctx: Context){
    return this.botService.OnPhoto(ctx)
  }
  @On("voice")
  onVoce(@Ctx() ctx: Context){
    return this.botService.OnVoice(ctx)
  }

  @On("audio")
  OnAudio(@Ctx() ctx: Context){
    return this.botService.OnAudio(ctx)
  }
}
