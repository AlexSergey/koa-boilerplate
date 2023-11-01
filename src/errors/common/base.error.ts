import { Statuses } from '../utils/get-status';
import { IError } from './error.interface';

type PureErrorType = {
  code: string;
  data?: unknown;
  message: string;
  status: Statuses;
  statusCode: number;
};

export class BaseError extends Error implements IError {
  public code: string;

  public data?: unknown;

  public override message: string;

  public status: Statuses;

  public statusCode: number;

  constructor() {
    super();
    this.name = 'BaseError';
  }

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
