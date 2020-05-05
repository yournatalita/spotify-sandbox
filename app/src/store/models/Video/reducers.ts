import * as types from './types';

import { TReducerReturn, VideoReducerState } from './index.d';

const INITIAL_STATE: VideoReducerState = {
  top: null
};

const reducer = (state: VideoReducerState = INITIAL_STATE, { type, payload }: TReducerReturn) => {
  switch (type) {
    case types.GET_TOP:
      return {
        ...state,
        ...payload
      };
    case types.REMOVE_TOP:
      return {
        ...state,
        ...payload
      };
    case types.GET_VIDEO_TRACK:
      return {
        ...state,
        top: {
          ...state.top,
          ...payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
