/// <reference types="spotify-api" />

export interface TrackDispatchProps {
  playedTrackId?: string;
}
export interface TrackProps extends TrackDispatchProps {
  track: SpotifyApi.SingleTrackResponse;
  setPlayedTrackId: (id: string) => void;
}
