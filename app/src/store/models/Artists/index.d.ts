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

export type TPlayerState = Spotify.PlaybackState;

export type TTrack = SpotifyApi.SingleTrackResponse;
