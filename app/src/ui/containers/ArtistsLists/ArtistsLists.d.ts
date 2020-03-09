import { Personalization } from '../../../store/index.d';
import { IRequest } from '../../../store/models/declarations';
import { ReactIdSwiperProps } from 'react-id-swiper';

type TPersonalizationRequest = (options: IRequest) => {};
type TSliderRenderProps = ReactIdSwiperProps;

export interface ArtistsListProps extends Personalization {
  getPersonalization?: TPersonalizationRequest;
  setRangeChosenArtists?: (range: string) => {};
}

export interface ChangeTermEvent {
  getPersonalization?: TPersonalizationRequest;
  term?: string;
}
