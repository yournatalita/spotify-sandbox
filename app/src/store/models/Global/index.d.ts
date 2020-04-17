import { StoreInterface } from '../../index.d';

export type DataProps = {
  playedTrackId?: string;
}

export type TReducerReturn = {
  type: string;
  payload: StoreInterface;
};

export interface GlobalReducerState extends Personalization {
  type: string;
}
