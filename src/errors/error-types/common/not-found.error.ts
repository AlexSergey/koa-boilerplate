import { BaseError } from '../../common/base.error';
import type { IError } from '../../common/error.interface';
import { NOT_FOUND } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

export class NotFoundError extends BaseError implements IError {
  constructor() {
    super();
    this.name = 'NotFoundError';
    Error.captureStackTrace(this, this.constructor);
  }

  public override code = NOT_FOUND.code;

  public override statusCode = NOT_FOUND.statusCode;

  public override message = NOT_FOUND.message;

  public override status = getStatus(NOT_FOUND.statusCode);
}
