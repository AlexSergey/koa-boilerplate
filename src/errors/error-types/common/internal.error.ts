import { getStatus } from '../../utils/get-status';
import { INTERNAL_ERROR } from '../../constants/messages';
import { BaseError } from '../../common/base.error';
import type { ErrorInterface } from '../../common/error.interface';

export class InternalError extends BaseError implements ErrorInterface {
  public override code = INTERNAL_ERROR.code;

  public override statusCode = INTERNAL_ERROR.statusCode;

  public override message = INTERNAL_ERROR.message;

  public override status = getStatus(INTERNAL_ERROR.statusCode);
}
