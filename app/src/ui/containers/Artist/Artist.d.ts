/// <reference types="spotify-api" />
import { IRequest } from '../../../store/models/declarations';
import { Player } from '../../../store/index.d';
import { Video, TopVideoData } from '../../../store/models/Video';

type TPersonalizationRequest = (options: IRequest) => {};

export type Video = {
  video?: Video;
};

export interface StateProps {
  video?: Video;
  player?: Player;
  deviceId?: string;
}

export interface ArtistStateProps {
  artist: SpotifyApi.SingleArtistResponse;
  onHover: () => void;
}

export interface DispatchProps {
  getTopVideo?: (data: TopVideoData) => void;
  getPersonalization?: TPersonalizationRequest;
  setRangeChosenArtists?: (range: string) => void;
  removeTopVideo?: () => void;
  pause?: (options: AxiosRequestConfig) => void;
}
