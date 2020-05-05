/// <reference types="spotify-api" />

import { Player } from '../../../store/index.d';

export interface TrackDispatchProps {
  playedTrackId?: string;
  deviceId?: string;
  player?: Player;
}
export interface TrackProps extends TrackDispatchProps {
  themes?: string[];
  track: SpotifyApi.SingleTrackResponse;
  listUris: string[];
  setPlayedTrackId: (id: string) => void;
  play?: (options: AxiosRequestConfig) => void;
  playNext?: (options: AxiosRequestConfig) => void;
  playPrev?: (options: AxiosRequestConfig) => void;
  pause?: (options: AxiosRequestConfig) => void;
}

export type PlayerProps = Player | undefined;
