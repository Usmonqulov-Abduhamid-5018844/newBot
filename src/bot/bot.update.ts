import { Injectable } from '@nestjs/common';
import { Action, Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { MyContext } from 'src/helpers/bot.sesion';
@Update()
@Injectable()
export class BotUpdate {
  private Admin_id = Number(process.env.ADMIN_ID)
  
  constructor(
    private readonly botService: BotService,
  ) {}

  @Start()
  onstart(@Ctx() ctx: MyContext) {
    if(ctx.from?.id == this.Admin_id){
      return this.botService.onAdminstart(ctx)
    }
    else{
      return this.botService.Onstart(ctx);
    }
  }
  @Action('chat')
  onChat(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    return this.botService.OnChat(ctx);
  }
  @Action('info')
  onInfo(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    return this.botService.Info(ctx);
  }

  @Action("kurs")
  onKurs(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.onKurs(ctx)
  }

  @Action('help')
  onHelp(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    return this.botService.OnHelp(ctx);
  }

  @Command('menu')
  Menue(@Ctx() ctx: MyContext) {
    return this.botService.Menue(ctx);
  }
  @Command('help')
  help(@Ctx() ctx: MyContext) {
    return this.botService.hepl(ctx);
  }
  @Command("ortga")
  ortga(@Ctx() ctx: MyContext){
    return this.botService.ortga(ctx)
  }
  @Hears("Menu")
  startMenu(@Ctx() ctx: MyContext){
    return this.botService.Menue(ctx)
  }

  @Hears("Barcha foydalanuvchilar soni")
  foydalanuvchilar(@Ctx() ctx: MyContext) {
    return this.botService.userAllcount(ctx)
  }

  @Hears("Info")
  startInfo(@Ctx() ctx: MyContext){
    return this.botService.Info(ctx)
  }

  @Hears("Help")
  startHelp(@Ctx() ctx: MyContext){
    return this.botService.hepl(ctx)
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

  //############################### KURSLAR ######################################

  @Action("orqaga")
  onOrqaga(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return  this.botService.Menue(ctx)
  }

  @Action("usd_uzs")
  Onusd_uzs(@Ctx()ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_usd_uzs(ctx)
  }
  @Action("usd_eur")
  Onusd_eur(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_usd_eur(ctx)
  }
  @Action("usd_rub")
  Onusd_rub(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_usd_rub(ctx)
  }

  @Action("eur_usd")
  Oneur_usd(@Ctx()ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_eur_usd(ctx)
  }
  @Action("eur_uzs")
  Oneur_uzs(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_eur_uzs(ctx)
  }
  @Action("eur_rub")
  Oneur_rub(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_eur_rub(ctx)
  }

  @Action("rub_usd")
  Onrub_usd(@Ctx()ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_rub_usd(ctx)
  }
  @Action("rub_uzs")
  Onrub_uzs(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_rub_uzs(ctx)
  }
  @Action("rub_eur")
  Onrub_eur(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_rub_eur(ctx)
  }

  @Action("uzs_usd")
  Onuzs_usd(@Ctx()ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_uzs_usd(ctx)
  }
  @Action("uzs_eur")
  Onuzs_eur(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_uzs_eur(ctx)
  }
  @Action("uzs_rub")
  Onuzs_rub(@Ctx() ctx: MyContext){
    ctx.deleteMessage()
    return this.botService.On_uzs_rub(ctx)
  }

  //############################### KURSLAR ######################################
}
