import { Request, Response } from 'express';

type TUser = {
  req?: Request,
  res?: Response,
  accessToken?: string;
}
