/// <reference types="spotify-api" />

export type TTrack = {
  track: SpotifyApi.SingleTrackResponse;
  playedTrackId?: string;
  onPlay: (id: string) => void;
  onPause: () => void;
};
