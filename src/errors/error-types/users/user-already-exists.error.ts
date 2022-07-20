import { getStatus } from 'errors/utils/get-status';

import { BaseError } from '../../common/base.error';
import type { IError } from '../../common/error.interface';
import { USER_ALREADY_EXISTS } from '../../constants/messages';

export class UserAlreadyExistsError extends BaseError implements IError {
  constructor() {
    super();
    this.name = 'UserAlreadyExistsError';
  }

  public override code = USER_ALREADY_EXISTS.code;

  public override statusCode = USER_ALREADY_EXISTS.statusCode;

  public override message = USER_ALREADY_EXISTS.message;

  public override status = getStatus(USER_ALREADY_EXISTS.statusCode);
}
