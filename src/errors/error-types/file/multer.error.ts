import { MulterError as MulterBaseError } from 'multer';

import { FILE_FORMAT_ERROR } from '../../constants/messages';
import { Statuses } from '../../utils/get-status';
import { BaseError } from '../../common/base.error';
import type { ErrorInterface } from '../../common/error.interface';

export class MulterError extends BaseError implements ErrorInterface {
  public override code = FILE_FORMAT_ERROR.code;

  public override statusCode = FILE_FORMAT_ERROR.statusCode;

  public override status = Statuses.error;

  constructor(e: MulterBaseError | ErrorInterface) {
    super();

    if (e instanceof MulterBaseError) {
      this.message = e.message;
    } else {
      this.code = e.code;
      this.statusCode = e.statusCode;
      this.status = e.status;
      this.message = e.message;
    }
  }
}
