import { Request, Response } from 'express';

type ArtistParams = {
  id: string;
};

export type TArtist = {
  req?: Request;
  res?: Response;
  accessToken?: string;
  params?: ArtistParams;
  data?: ArtistParams;
};
