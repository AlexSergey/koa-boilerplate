import { StatusCodes } from './status-codes';

export const BAD_REQUEST = {
  statusCode: StatusCodes.BAD_REQUEST,
  code: 'BAD_REQUEST',
  message: 'Bad Request. Your browser sent a request that this server could not understand.',
};

export const INCORRECT_ACCESS = {
  statusCode: StatusCodes.NOT_ACCEPTABLE,
  code: 'BAD_REQUEST',
  message: 'Incorrect access.',
};

export const DATABASE_ERROR = {
  statusCode: StatusCodes.BAD_REQUEST,
  code: 'DATABASE_ERROR',
  message: 'Bad Request. Your browser sent a request that this server could not understand.',
};

export const FILE_FORMAT_ERROR = {
  statusCode: StatusCodes.BAD_REQUEST,
  code: 'FILE_FORMAT_ERROR',
  message: 'Only .png, .jpg and .jpeg format allowed.',
};

export const AUTH_REQUIRED = {
  statusCode: StatusCodes.UNAUTHORIZED,
  code: 'AUTH_REQUIRED',
  message: 'Authentication is needed to access the requested endpoint.',
};

export const NOT_FOUND = {
  statusCode: StatusCodes.NOT_FOUND,
  code: 'UNKNOWN_ENDPOINT',
  message: 'The requested endpoint does not exist.',
};

export const UNAUTHORIZED = {
  statusCode: StatusCodes.UNAUTHORIZED,
  code: 'UNAUTHORIZED',
  message: 'You are not authorized in the system.',
};

export const TOKEN_EXPIRED = {
  statusCode: StatusCodes.UNAUTHORIZED,
  code: 'TOKEN_EXPIRED',
  message: 'Session expired, please re-login.',
};

export const USER_NOT_FOUND = {
  statusCode: StatusCodes.UNAUTHORIZED,
  code: 'USER_NOT_FOUND',
  message: 'User is not found, please re-login.',
};

export const WRONG_PASSWORD = {
  statusCode: StatusCodes.UNAUTHORIZED,
  code: 'PASSWORD_IS_NOT_VALID',
  message: 'Wrong password.',
};

export const POST_NOT_FOUND = {
  statusCode: StatusCodes.BAD_REQUEST,
  code: 'BAD_REQUEST',
  message: 'Post not found.',
};

export const COMMENT_NOT_FOUND = {
  statusCode: StatusCodes.BAD_REQUEST,
  code: 'BAD_REQUEST',
  message: 'Comment not found.',
};

export const UNKNOWN_RESOURCE = {
  statusCode: StatusCodes.NOT_FOUND,
  code: 'UNKNOWN_RESOURCE',
  message: 'The specified resource was not found.',
};

export const INVALID_REQUEST_BODY_FORMAT = {
  statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
  code: 'INVALID_REQUEST_BODY_FORMAT',
  message: 'The request body has invalid format.',
};

export const INVALID_REQUEST = {
  statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
  code: 'INVALID_REQUEST',
  message: 'The request has invalid parameters.',
};

export const INTERNAL_ERROR = {
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  code: 'INTERNAL_ERROR',
  message: 'The server encountered an internal error.',
};

export const UNKNOWN_ERROR = {
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  code: 'UNKNOWN_ERROR',
  message: 'The server encountered an unknown error.',
};

export const USER_ALREADY_EXISTS = {
  statusCode: StatusCodes.FORBIDDEN,
  code: 'USER_ALREADY_EXISTS',
  message: 'User already exists.',
};
