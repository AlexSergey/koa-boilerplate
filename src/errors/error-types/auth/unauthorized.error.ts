import type { IError } from '../../common/error.interface';

import { BaseError } from '../../common/base.error';
import { UNAUTHORIZED } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

/**
 * @openapi
 * components:
 *   errors:
 *     unauthorized:
 *       description: You are not authorized in the system.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 default: 'UNAUTHORIZED'
 *                 description: UNAUTHORIZED error code
 *               statusCode:
 *                 type: integer
 *                 default: 401
 *                 description: 401 statusCode
 *               message:
 *                 type: string
 *                 default: "You are not authorized in the system."
 *                 description: Error message
 *               status:
 *                 type: string
 *                 default: "fail"
 *                 description: Common error status
 */
export class UnauthorizedError extends BaseError implements IError {
  public override code = UNAUTHORIZED.code;

  public override message = UNAUTHORIZED.message;

  public override status = getStatus(UNAUTHORIZED.statusCode);

  public override statusCode = UNAUTHORIZED.statusCode;

  constructor() {
    super();
    this.name = 'UnauthorizedError';
    Error.captureStackTrace(this, this.constructor);
  }
}
