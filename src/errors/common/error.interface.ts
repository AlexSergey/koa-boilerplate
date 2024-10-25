import { Statuses } from '../utils/get-status';

export interface ErrorInterface {
  code: string;
  message: string;
  status: Statuses;
  statusCode: number;
}
