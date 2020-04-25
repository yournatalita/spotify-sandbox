/// <reference types="spotify-api" />

import { Request, Response } from 'express';

type TTracksParams = {
  id: string;
  market: string;
};

type TrackProps = SpotifyApi.SingleTrackResponse;

type TTracks = {
  req?: Request;
  res?: Response;
  accessToken?: string;
  params?: TTracksParams;
};
