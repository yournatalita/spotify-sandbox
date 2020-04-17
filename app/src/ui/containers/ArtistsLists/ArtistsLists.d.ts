// @ts-ignore
import { SpotifyApi } from '@types/spotify-api';

import { DataPropsPersonalization, Video } from '../../../store/index.d';
import { IRequest } from '../../../store/models/declarations';
import { ReactIdSwiperProps } from 'react-id-swiper';

type TPersonalizationRequest = (options: IRequest) => {};
type TSliderRenderProps = ReactIdSwiperProps;

export interface ArtistsListProps extends DataPropsPersonalization {
  getTopVideo?: TPersonalizationRequest;
  getPersonalization?: TPersonalizationRequest;
  setRangeChosenArtists?: (range: string) => {};
  video?: Video;
}

export type ArtistsProps = SpotifyApi.ArtistObjectFull;

export interface ChangeTermEvent {
  getPersonalization?: TPersonalizationRequest;
  term?: string;
}
