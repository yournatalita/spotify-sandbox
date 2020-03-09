import { StoreInterface, Personalization } from '../../index.d';

export type TReducerReturn = {
  type: string;
  payload: Personalization;
};

export interface PersonalizationReducerState extends Personalization {
  type: string;
}
