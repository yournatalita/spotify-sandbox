/// <reference types="spotify-api" />

import { DataPropsPersonalization } from '../../../store/index.d';
import { IRequest } from '../../../store/models/declarations';
import { ReactIdSwiperProps } from 'react-id-swiper';

type TPersonalizationRequest = (options: IRequest) => {};
type TSliderRenderProps = ReactIdSwiperProps;

export interface TracksListsProps extends DataPropsPersonalization {
  getPersonalization?: TPersonalizationRequest;
  setRangeChosenTracks?: (range: string) => void;
  playedTrackId?: string;
}

export interface ChangeTermEvent {
  getPersonalization?: TPersonalizationRequest;
  term?: string;
}

export interface TrackProps extends SpotifyApi.SingleTrackResponse {};
