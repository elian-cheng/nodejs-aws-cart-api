import { Request } from 'express';

import { User } from '../../users';

import httpStatusCode from '../../types/httpStatusCode';

export interface AppRequest extends Request {
  user?: User;
  status: httpStatusCode;
}
