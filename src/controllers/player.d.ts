import { Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RecommendationsOptionsObject } from '@types/spotify-api';

type PlayerParams = {
  deviceId?: string;
};

type Offset = {
  position?: number;
  uri?: string;
};

type PlayerData = {
  context_uri?: string;
  uris?: string[];
  offset?: Offset;
  position_ms?: number;
  deviceId?: string;
}

export type TPlayer = {
  req?: Request;
  res?: Response;
  accessToken?: string;
  params?: PlayerParams;
  data?: PlayerData;
};
