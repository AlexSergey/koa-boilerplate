import { injectable } from 'inversify';
import { DefaultContext } from 'koa';

@injectable()
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
