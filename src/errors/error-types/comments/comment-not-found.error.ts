import { BaseError } from '../../common/base.error';
import type { IError } from '../../common/error.interface';
import { COMMENT_NOT_FOUND } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

/**
 * @openapi
 * components:
 *   errors:
 *     comment-not-found:
 *       description: Comment not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 default: 'BAD_REQUEST'
 *                 description: BAD_REQUEST error code
 *               statusCode:
 *                 type: integer
 *                 default: 400
 *                 description: 400 statusCode
 *               message:
 *                 type: string
 *                 default: "Comment not found."
 *                 description: Error message
 *               status:
 *                 type: string
 *                 default: "fail"
 *                 description: Common error status
 */
export class CommentNotFoundError extends BaseError implements IError {
  constructor() {
    super();
    this.name = 'CommentNotFoundError';
    Error.captureStackTrace(this, this.constructor);
  }

  public override code = COMMENT_NOT_FOUND.code;

  public override statusCode = COMMENT_NOT_FOUND.statusCode;

  public override message = COMMENT_NOT_FOUND.message;

  public override status = getStatus(COMMENT_NOT_FOUND.statusCode);
}
