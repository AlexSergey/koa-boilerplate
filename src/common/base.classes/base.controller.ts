import { DefaultContext } from 'koa';
import { injectable } from 'inversify';

@injectable()
export class BaseController {
  ok(ctx: DefaultContext, message = 'ok', data?: unknown): void {
    ctx.body = {
      code: 200,
      status: 200,
      statusCode: 200,
      message,
      ...(typeof data === 'object' ? { data } : {}),
    };
  }
}
