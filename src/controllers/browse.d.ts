import { Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RecommendationsOptionsObject } from '@types/spotify-api';

type TBrowse = {
  req?: Request;
  res?: Response;
  accessToken?: string;
  params?: RecommendationsOptionsObject;
};
