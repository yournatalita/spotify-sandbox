import * as types from './types';

import { TReducerReturn, PlayerReducerState } from './index.d';

const INITIAL_STATE: PlayerReducerState = {
  type: ''
};

const reducer = (state: PlayerReducerState = INITIAL_STATE, { type, payload }: TReducerReturn) => {
  switch (type) {
    case types.PLAY:
      return {
        ...state,
        ...payload
      };
    case types.STATE:
      return {
        ...state,
        ...payload
      };
    case types.RECENT:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

export default reducer;
