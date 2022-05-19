import { getStatus } from '../../utils/get-status';
import { BAD_REQUEST } from '../../constants/messages';
import { BaseError } from '../../common/base.error';
import type { ErrorInterface } from '../../common/error.interface';

export class BadRequestError extends BaseError implements ErrorInterface {
  public override code = BAD_REQUEST.code;

  public override statusCode = BAD_REQUEST.statusCode;

  public override message = BAD_REQUEST.message;

  public override status = getStatus(BAD_REQUEST.statusCode);
}
