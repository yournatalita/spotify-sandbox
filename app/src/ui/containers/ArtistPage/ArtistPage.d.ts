import { Router, Video } from '../../../store/index.d';
import { TopVideoData } from '../../../store/models/Video';
import { SearchParams } from '../../../store/models/Search';

export type DispatchProps = {
  getArtist: (id: string) => void;
  clearArtist: () => void;
  getTopVideo: (data: TopVideoData) => void;
  removeTopVideo?: () => void;
  searchVideoTrack?: (params: SearchParams) => void;
};

export type StateProps = {
  artist?: SpotifyApi.ArtistObjectFull;
  router?: Router;
  video?: Video;
};
