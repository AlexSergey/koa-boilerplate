import type { IError } from '../../common/error.interface';

import { BaseError } from '../../common/base.error';
import { INCORRECT_ACCESS } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

/**
 * @openapi
 * components:
 *   errors:
 *     incorrect-access:
 *       description: Incorrect access.
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
 *                 default: 406
 *                 description: 406 statusCode
 *               message:
 *                 type: string
 *                 default: "Incorrect access."
 *                 description: Error message
 *               status:
 *                 type: string
 *                 default: "fail"
 *                 description: Common error status
 */
export class IncorrectAccessError extends BaseError implements IError {
  public override code = INCORRECT_ACCESS.code;

  public override message = INCORRECT_ACCESS.message;

  public override status = getStatus(INCORRECT_ACCESS.statusCode);

  public override statusCode = INCORRECT_ACCESS.statusCode;

  constructor() {
    super();
    this.name = 'IncorrectAccessError';
    Error.captureStackTrace(this, this.constructor);
  }
}
