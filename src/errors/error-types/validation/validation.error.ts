import { getStatus } from '../../utils/get-status';
import { INVALID_REQUEST_BODY_FORMAT } from '../../constants/messages';
import { BaseError } from '../../common/base.error';
import type { ErrorInterface } from '../../common/error.interface';

export class ValidationError extends BaseError implements ErrorInterface {
  constructor(data: Record<string, string>) {
    super();
    this.data = data;
  }

  public override code = INVALID_REQUEST_BODY_FORMAT.code;

  public override statusCode = INVALID_REQUEST_BODY_FORMAT.statusCode;

  public override message = INVALID_REQUEST_BODY_FORMAT.message;

  public override status = getStatus(INVALID_REQUEST_BODY_FORMAT.statusCode);
}
