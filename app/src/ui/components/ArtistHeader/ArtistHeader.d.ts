import { Video } from '../../../store/index.d';

export type ArtistProps = {
  artist: SpotifyApi.ArtistObjectFull;
  video?: Video;
  onVideoStop: () => void;
  onVideoError: () => void;
  onVideoPlay: () => void;
};
