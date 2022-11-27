import { BaseError } from '../../common/base.error';
import type { IError } from '../../common/error.interface';
import { BAD_REQUEST } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

export class BadRequestError extends BaseError implements IError {
  constructor() {
    super();
    this.name = 'BadRequestError';
    Error.captureStackTrace(this, this.constructor);
  }

  public override code = BAD_REQUEST.code;

  public override statusCode = BAD_REQUEST.statusCode;

  public override message = BAD_REQUEST.message;

  public override status = getStatus(BAD_REQUEST.statusCode);
}
