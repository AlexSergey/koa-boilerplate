import { getStatus } from '../../utils/get-status';
import { NOT_FOUND } from '../../constants/messages';
import { BaseError } from '../../common/base.error';
import type { ErrorInterface } from '../../common/error.interface';

export class NotFoundError extends BaseError implements ErrorInterface {
  public override code = NOT_FOUND.code;

  public override statusCode = NOT_FOUND.statusCode;

  public override message = NOT_FOUND.message;

  public override status = getStatus(NOT_FOUND.statusCode);
}
