import { getStatus } from '../../utils/get-status';
import { POST_NOT_FOUND } from '../../constants/messages';
import { BaseError } from '../../common/base.error';
import type { ErrorInterface } from '../../common/error.interface';

export class PostNotFoundError extends BaseError implements ErrorInterface {
  public override code = POST_NOT_FOUND.code;

  public override statusCode = POST_NOT_FOUND.statusCode;

  public override message = POST_NOT_FOUND.message;

  public override status = getStatus(POST_NOT_FOUND.statusCode);
}
