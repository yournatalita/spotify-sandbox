import * as SpotifyApi from '@types/spotify-api';

import { IRequest } from '../../../store/models/declarations';
import { Video } from '../../../store/models/Video';

declare let Props: SpotifyApi.ArtistObjectFull;

type TPersonalizationRequest = (options: IRequest) => {};

export interface ArtistStateProps {
  artist?: Props;
  getTopVideo?: TPersonalizationRequest;
  getPersonalization?: TPersonalizationRequest;
  setRangeChosenArtists?: (range: string) => {};
  removeTopVideo?: () => {};
  video?: Video;
}
