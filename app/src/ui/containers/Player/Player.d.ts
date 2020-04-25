/// <reference types="spotify-api" />
/// <reference types="spotify" />

import { StoreInterface } from '../../../store/index.d';
import { Dispatch, AnyAction } from 'redux';

export interface DispatchProps {
  // TODO: Уточнить как типизировать Promise из dispatch
  getToken?: () => any;
  setPlayedTrackId: (id: string) => void;
}

export interface StateProps extends StoreInterface {}

export type SpotifyProps = Spotify;
export type SpotifyPlayerProps = Spotify.SpotifyPlayer;
export type SpotifyInit = Spotify.PlayerInit;
