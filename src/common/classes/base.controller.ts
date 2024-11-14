import { Injectable } from 'friendly-di';
import { DefaultContext } from 'koa';

@Injectable()
export class BaseController {
  ok(ctx: DefaultContext, message = 'ok', data?: unknown): void {
    ctx.body = {
      code: 200,
      message,
      status: 200,
      statusCode: 200,
      ...(typeof data === 'object' ? { data } : {}),
    };
  }
}
