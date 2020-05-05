import { Request, Response } from 'express';

export type SpotifySearchAnswer = SpotifyApi.SearchResponse;
export type TrackObjectFull = SpotifyApi.TrackObjectFull;
export type ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;

export type SearchParams = {
  q: string;
  id?: string;
  type: string;
  market?: string;
  limit?: number;
  offset?: number;
  count?: number;
};

export type TSearch = {
  req?: Request;
  res?: Response;
  accessToken?: string;
  params?: SearchParams;
  data?: SearchParams;
};
