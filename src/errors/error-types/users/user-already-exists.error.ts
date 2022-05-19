import { getStatus } from 'errors/utils/get-status';

import { USER_ALREADY_EXISTS } from '../../constants/messages';
import { BaseError } from '../../common/base.error';
import type { ErrorInterface } from '../../common/error.interface';

export class UserAlreadyExistsError extends BaseError implements ErrorInterface {
  public override code = USER_ALREADY_EXISTS.code;

  public override statusCode = USER_ALREADY_EXISTS.statusCode;

  public override message = USER_ALREADY_EXISTS.message;

  public override status = getStatus(USER_ALREADY_EXISTS.statusCode);
}
