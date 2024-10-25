import type { ErrorInterface } from '../../common/error.interface';

import { BaseError } from '../../common/base.error';
import { INTERNAL_ERROR } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

export class InternalError extends BaseError implements ErrorInterface {
  public override code = INTERNAL_ERROR.code;

  public override message = INTERNAL_ERROR.message;

  public override status = getStatus(INTERNAL_ERROR.statusCode);

  public override statusCode = INTERNAL_ERROR.statusCode;

  constructor() {
    super();
    this.name = 'InternalError';
    Error.captureStackTrace(this, this.constructor);
  }
}
