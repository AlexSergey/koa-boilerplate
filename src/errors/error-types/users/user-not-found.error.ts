import type { IError } from '../../common/error.interface';

import { BaseError } from '../../common/base.error';
import { USER_NOT_FOUND } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

export class UserNotFoundError extends BaseError implements IError {
  public override code = USER_NOT_FOUND.code;

  public override message = USER_NOT_FOUND.message;

  public override status = getStatus(USER_NOT_FOUND.statusCode);

  public override statusCode = USER_NOT_FOUND.statusCode;

  constructor() {
    super();
    this.name = 'UserNotFoundError';
    Error.captureStackTrace(this, this.constructor);
  }
}
