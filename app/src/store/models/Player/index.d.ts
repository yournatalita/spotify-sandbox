/// <reference types="spotify-api" />
import { StoreInterface } from '../../index.d';

export type DataProps = {
  playedTrackId?: string;
  deviceId?: string;
};

export type TReducerReturn = {
  type: string;
  payload: StoreInterface;
};

export interface PlayerReducerState {
  type: string;
}

export type TTrack = SpotifyApi.SingleTrackResponse;
