import * as types from './types';
import { TTrack, TPlayerState } from './index.d';
import { IReducerReturn } from '../declarations.d';

const playAction = (track: TTrack): IReducerReturn => {
  return {
    type: types.PLAY,
    payload: {
      track
    }
  };
};

const pauseAction = (track: TTrack): IReducerReturn => {
  return {
    type: types.PAUSE,
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

const setStateAction = (state: TPlayerState): IReducerReturn => {
  return {
    type: types.SET_STATE,
    payload: {
      state,
      track: state.track_window.current_track
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

export { playAction, getStateAction, getRecentAction, pauseAction, setStateAction };
