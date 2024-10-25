import type { ErrorInterface } from '../../common/error.interface';

import { BaseError } from '../../common/base.error';
import { TOKEN_EXPIRED } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

/**
 * @openapi
 * components:
 *   errors:
 *     expired-token:
 *       description: Session expired, please re-login.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 default: 'TOKEN_EXPIRED'
 *                 description: TOKEN_EXPIRED error code
 *               statusCode:
 *                 type: integer
 *                 default: 401
 *                 description: 401 statusCode
 *               message:
 *                 type: string
 *                 default: "Session expired, please re-login."
 *                 description: Error message
 *               status:
 *                 type: string
 *                 default: "fail"
 *                 description: Common error status
 */
export class ExpiredTokenError extends BaseError implements ErrorInterface {
  public override code = TOKEN_EXPIRED.code;

  public override message = TOKEN_EXPIRED.message;

  public override status = getStatus(TOKEN_EXPIRED.statusCode);

  public override statusCode = TOKEN_EXPIRED.statusCode;

  constructor() {
    super();
    this.name = 'ExpiredTokenError';
    Error.captureStackTrace(this, this.constructor);
  }
}
