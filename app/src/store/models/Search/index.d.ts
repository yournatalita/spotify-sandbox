/// <reference types="spotify-api" />
/// <reference types="spotify" />
import { StoreInterface } from '../../index.d';

export type ArtistProps = SpotifyApi.ArtistObjectFull;

export type TReducerReturn = {
  type: string;
  payload: StoreInterface;
};

export interface PlayerReducerState {
  type: string;
}

export type DispatchOptions = {
  toVideo?: boolean;
};

export type SearchParams = {
  q: string;
  id?: string;
  type: string;
  market?: string;
  limit?: number;
  offset?: number;
};
