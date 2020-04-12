/// <reference types="spotify-api" />

import { Personalization } from '../../../store/index.d';
import { IRequest } from '../../../store/models/declarations';
import { ReactIdSwiperProps } from 'react-id-swiper';

type TPersonalizationRequest = (options: IRequest) => {};
type TSliderRenderProps = ReactIdSwiperProps;

export interface TracksListsProps extends Personalization {
  getPersonalization?: TPersonalizationRequest;
  setRangeChosenTracks?: (range: string) => {};
}

export interface ChangeTermEvent {
  getPersonalization?: TPersonalizationRequest;
  term?: string;
}

export type TTrack = SpotifyApi.SingleTrackResponse;
