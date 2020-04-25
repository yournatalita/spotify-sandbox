import * as types from './types';
import { TTrack } from './index.d';
import { IReducerReturn } from '../declarations.d';

const playAction = (track: TTrack): IReducerReturn => {
  return {
    type: types.PLAY,
    payload: {
      ...track
    }
  };
};

export { playAction };
