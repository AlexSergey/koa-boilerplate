import { BaseError } from '../../common/base.error';
import type { IError } from '../../common/error.interface';
import { WRONG_PASSWORD } from '../../constants/messages';
import { getStatus } from '../../utils/get-status';

/**
 * @openapi
 * components:
 *   errors:
 *     wrong-password:
 *       description: Wrong password.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 default: 'PASSWORD_IS_NOT_VALID'
 *                 description: PASSWORD_IS_NOT_VALID error code
 *               statusCode:
 *                 type: integer
 *                 default: 401
 *                 description: 401 statusCode
 *               message:
 *                 type: string
 *                 default: "Wrong password."
 *                 description: Error message
 *               status:
 *                 type: string
 *                 default: "fail"
 *                 description: Common error status
 */
export class WrongPasswordError extends BaseError implements IError {
  constructor() {
    super();
    this.name = 'WrongPasswordError';
    Error.captureStackTrace(this, this.constructor);
  }

  public override code = WRONG_PASSWORD.code;

  public override statusCode = WRONG_PASSWORD.statusCode;

  public override message = WRONG_PASSWORD.message;

  public override status = getStatus(WRONG_PASSWORD.statusCode);
}
