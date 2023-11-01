import type { IError } from '../../common/error.interface';

import { BaseError } from '../../common/base.error';
import { FILE_FORMAT_ERROR } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

export class BadFileFormatError extends BaseError implements IError {
  public override code = FILE_FORMAT_ERROR.code;

  public override message = FILE_FORMAT_ERROR.message;

  public override status = getStatus(FILE_FORMAT_ERROR.statusCode);

  public override statusCode = FILE_FORMAT_ERROR.statusCode;

  constructor() {
    super();
    this.name = 'BadFileFormatError';
    Error.captureStackTrace(this, this.constructor);
  }
}
