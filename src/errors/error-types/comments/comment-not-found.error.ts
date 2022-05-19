import { getStatus } from '../../utils/get-status';
import { COMMENT_NOT_FOUND } from '../../constants/messages';
import { BaseError } from '../../common/base.error';
import type { ErrorInterface } from '../../common/error.interface';

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
export class CommentNotFound extends BaseError implements ErrorInterface {
  public override code = COMMENT_NOT_FOUND.code;

  public override statusCode = COMMENT_NOT_FOUND.statusCode;

  public override message = COMMENT_NOT_FOUND.message;

  public override status = getStatus(COMMENT_NOT_FOUND.statusCode);
}
