import { Statuses } from '../utils/get-status';

import { ErrorInterface } from './error.interface';

type PureErrorType = {
  code: string;
  statusCode: number;
  message: string;
  data?: unknown;
  status: Statuses;
};

export class BaseError extends Error implements ErrorInterface {
  public code: string;

  public statusCode: number;

  public override message: string;

  public data?: unknown;

  public status: Statuses;

  get(): PureErrorType {
    const err: PureErrorType = {
      code: this.code,
      statusCode: this.statusCode,
      status: this.status,
      message: this.message,
    };
    if (this.data) {
      err.data = this.data;
    }
    return err;
  }
}
