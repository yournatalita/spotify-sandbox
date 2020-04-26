import * as types from './types';
import { TTrack } from './index.d';
import { IReducerReturn } from '../declarations.d';

const playAction = (track: TTrack): IReducerReturn => {
  return {
    type: types.PLAY,
    payload: {
      track
    }
  };
};

const getStateAction = (track: TTrack): IReducerReturn => {
  return {
    type: types.STATE,
    payload: {
      track
    }
  };
};

const getRecentAction = (track: TTrack): IReducerReturn => {
  return {
    type: types.RECENT,
    payload: {
      track
    }
  };
};

export { playAction, getStateAction, getRecentAction };
