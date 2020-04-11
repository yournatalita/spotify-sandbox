/// <reference types="spotify-api" />

import { IRequest } from '../../../store/models/declarations';
import { Video } from '../../../store/models/Video';

type TPersonalizationRequest = (options: IRequest) => {};

export type Video = {
  video?: Video;
};

export interface StateProps {
  video?: Video;
}

export interface ArtistStateProps {
  artist: SpotifyApi.SingleArtistResponse;
  video?: Video;
}

export interface DispatchProps {
  getTopVideo?: TPersonalizationRequest;
  getPersonalization?: TPersonalizationRequest;
  setRangeChosenArtists?: (range: string) => {};
  removeTopVideo?: () => {};
}
