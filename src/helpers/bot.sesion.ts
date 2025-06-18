import { Context } from 'telegraf';

export interface SessionData {
  state?: string | null;
  Kurses?: string | null
}

export interface MyContext extends Context {
  session: SessionData;
}
