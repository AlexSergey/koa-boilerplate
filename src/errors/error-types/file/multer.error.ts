import { MulterError as MulterBaseError } from 'multer';

import type { IError } from '../../common/error.interface';

import { BaseError } from '../../common/base.error';
import { FILE_FORMAT_ERROR } from '../../constants/messages';
import { Statuses } from '../../utils/get-status';

export class MulterError extends BaseError implements IError {
  public override code = FILE_FORMAT_ERROR.code;

  public override status = Statuses.error;

  public override statusCode = FILE_FORMAT_ERROR.statusCode;

  constructor(e: IError | MulterBaseError) {
    super();

    if (e instanceof MulterBaseError) {
      this.message = e.message;
    } else {
      this.code = e.code;
      this.statusCode = e.statusCode;
      this.status = e.status;
      this.message = e.message;
    }
    this.name = 'MulterError';
    Error.captureStackTrace(this, this.constructor);
  }
}
