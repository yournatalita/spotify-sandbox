/// <reference types="spotify-api" />
/// <reference types="spotify" />

import { StoreInterface } from '../../../store/index.d';
import { Dispatch, AnyAction } from 'redux';

export interface DispatchProps {
  // TODO: Уточнить как типизировать Promise из dispatch
  getToken?: () => any;
  setPlayedTrackId?: (id: string) => void;
  setDeviceId: (id: string) => void;
  getState: () => void;
  getRecent: () => void;
  setState: (state: Spotify.PlaybackState) => void;
  play?: (options: AxiosRequestConfig) => void;
  playNext?: (options: AxiosRequestConfig) => void;
  playPrev?: (options: AxiosRequestConfig) => void;
  pause?: (options: AxiosRequestConfig) => void;
  seek?: (options: AxiosRequestConfig) => void;
}

export type ReactStateProps = {
  setPlayedPosition: (time: number) => void;
  playedPosition: number;
}

export type PlayerTrackProps = {
  position: number;
}

export interface StateProps extends StoreInterface {}

export type SpotifyProps = Spotify;
export type SpotifyPlayerProps = Spotify.SpotifyPlayer;
export type SpotifyInit = Spotify.PlayerInit;
