// @ts-ignore
import { SpotifyApi } from '@types/spotify-api';
import { IRequest } from '../../../store/models/declarations';

export type ArtistsProps = SpotifyApi.ArtistObjectFull;

type TPersonalizationRequest = (options: IRequest) => {};

export interface GetVideoEvent {
  getTopVideo?: TPersonalizationRequest;
  term?: string;
}

export interface ArtistStateProps extends Personalization {
  getTopVideo?: TPersonalizationRequest;
  getPersonalization?: TPersonalizationRequest;
  setRangeChosenArtists?: (range: string) => {};
  video?: Video;
}
