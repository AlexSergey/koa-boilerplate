import { Statuses } from '../utils/get-status';

export interface ErrorInterface {
  statusCode: number;
  message: string;
  code: string;
  status: Statuses;
}
