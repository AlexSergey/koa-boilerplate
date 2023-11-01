import type { IError } from '../../common/error.interface';

import { BaseError } from '../../common/base.error';
import { BAD_REQUEST } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

export class BadRequestError extends BaseError implements IError {
  public override code = BAD_REQUEST.code;

  public override message = BAD_REQUEST.message;

  public override status = getStatus(BAD_REQUEST.statusCode);

  public override statusCode = BAD_REQUEST.statusCode;

  constructor() {
    super();
    this.name = 'BadRequestError';
    Error.captureStackTrace(this, this.constructor);
  }
}
