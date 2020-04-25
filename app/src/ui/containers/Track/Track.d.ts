/// <reference types="spotify-api" />

export interface TrackDispatchProps {
  playedTrackId?: string;
  deviceId?: string;
}
export interface TrackProps extends TrackDispatchProps {
  track: SpotifyApi.SingleTrackResponse;
  setPlayedTrackId: (id: string) => void;
  play?: (options: AxiosRequestConfig, track: SpotifyApi.SingleTrackResponse) => void;
}
