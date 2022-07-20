import { Statuses } from '../utils/get-status';

import { IError } from './error.interface';

type PureErrorType = {
  code: string;
  statusCode: number;
  message: string;
  data?: unknown;
  status: Statuses;
};

export class BaseError extends Error implements IError {
  constructor() {
    super();
    this.name = 'BaseError';
  }

  public code: string;

  public statusCode: number;

  public override message: string;

  public data?: unknown;

  public status: Statuses;

  get(): PureErrorType {
    const err: PureErrorType = {
      code: this.code,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
    if (this.data) {
      err.data = this.data;
    }

    return err;
  }
}
