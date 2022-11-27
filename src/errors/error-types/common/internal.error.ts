import { BaseError } from '../../common/base.error';
import type { IError } from '../../common/error.interface';
import { INTERNAL_ERROR } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

export class InternalError extends BaseError implements IError {
  constructor() {
    super();
    this.name = 'InternalError';
    Error.captureStackTrace(this, this.constructor);
  }

  public override code = INTERNAL_ERROR.code;

  public override statusCode = INTERNAL_ERROR.statusCode;

  public override message = INTERNAL_ERROR.message;

  public override status = getStatus(INTERNAL_ERROR.statusCode);
}
