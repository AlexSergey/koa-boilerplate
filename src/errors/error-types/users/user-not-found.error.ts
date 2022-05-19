import { getStatus } from '../../utils/get-status';
import { USER_NOT_FOUND } from '../../constants/messages';
import { BaseError } from '../../common/base.error';
import type { ErrorInterface } from '../../common/error.interface';

export class UserNotFoundError extends BaseError implements ErrorInterface {
  public override code = USER_NOT_FOUND.code;

  public override statusCode = USER_NOT_FOUND.statusCode;

  public override message = USER_NOT_FOUND.message;

  public override status = getStatus(USER_NOT_FOUND.statusCode);
}
