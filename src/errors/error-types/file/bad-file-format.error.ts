import { BaseError } from '../../common/base.error';
import { getStatus } from '../../utils/get-status';
import { FILE_FORMAT_ERROR } from '../../constants/messages';
import type { ErrorInterface } from '../../common/error.interface';

export class BadFileFormatError extends BaseError implements ErrorInterface {
  public override code = FILE_FORMAT_ERROR.code;

  public override statusCode = FILE_FORMAT_ERROR.statusCode;

  public override message = FILE_FORMAT_ERROR.message;

  public override status = getStatus(FILE_FORMAT_ERROR.statusCode);
}
