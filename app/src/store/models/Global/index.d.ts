import { StoreInterface } from '../../index.d';

export type DataProps = {
  playedTrackId?: string;
  deviceId?: string;
}

export type TReducerReturn = {
  type: string;
  payload: StoreInterface;
};

export interface GlobalReducerState extends Personalization {
  type: string;
}
