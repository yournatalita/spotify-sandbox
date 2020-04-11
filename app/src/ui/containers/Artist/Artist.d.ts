import * as SpotifyApi from '@types/spotify-api';

import { IRequest } from '../../../store/models/declarations';
import { Video } from '../../../store/models/Video';

declare let ArtistProps: SpotifyApi.ArtistObjectFull;

type TPersonalizationRequest = (options: IRequest) => {};

export interface Video {
  video?: Video;
}

export interface ArtistStateProps {
  artist: ArtistProps;
  getTopVideo?: TPersonalizationRequest;
  getPersonalization?: TPersonalizationRequest;
  setRangeChosenArtists?: (range: string) => {};
  removeTopVideo?: () => {};
  video?: Video;
}
