import type { IError } from '../../common/error.interface';

import { BaseError } from '../../common/base.error';
import { INVALID_REQUEST_BODY_FORMAT } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

export class ValidationError extends BaseError implements IError {
  public override code = INVALID_REQUEST_BODY_FORMAT.code;

  public override message = INVALID_REQUEST_BODY_FORMAT.message;

  public override status = getStatus(INVALID_REQUEST_BODY_FORMAT.statusCode);

  public override statusCode = INVALID_REQUEST_BODY_FORMAT.statusCode;

  constructor(data: Record<string, string>) {
    super();
    this.data = data;
    this.name = 'ValidationError';
    Error.captureStackTrace(this, this.constructor);
  }
}
