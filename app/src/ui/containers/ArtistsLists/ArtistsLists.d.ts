import { Personalization } from '../../../store/index.d';
import { IRequest } from '../../../store/models/declarations';

type TPersonalizationRequest = (options: IRequest) => {};

export interface ArtistsListProps extends Personalization {
  getPersonalization?: TPersonalizationRequest;
}

export interface ChangeTermEvent {
  getPersonalization?: TPersonalizationRequest;
  term?: string;
}
