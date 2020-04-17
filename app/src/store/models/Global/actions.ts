import * as types from './types';
import { DataProps } from './index.d';
import { IReducerReturn } from '../declarations.d';

const setPlayedTrackIdAction = (data: DataProps): IReducerReturn => {
  return {
    type: types.PLAYED_TRACK,
    payload: {
      ...data
    }
  };
};

export { setPlayedTrackIdAction };
