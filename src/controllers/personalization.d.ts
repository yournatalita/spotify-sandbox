import { Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RecommendationsOptionsObject } from '@types/spotify-api';

type TPersonalizationOptions = {
  typePath: 'artists' | 'tracks';
};

type TPersonalizationParams = {
  limit?: string;
  offset?: number;
  time_range?: 'long_term' | 'medium_term' | 'short_term';
};

type TPersonalization = {
  req?: Request;
  res?: Response;
  accessToken?: string;
  params?: TPersonalizationParams;
  options: TPersonalizationOptions;
};
