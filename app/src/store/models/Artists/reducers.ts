import * as types from './types';

import { TReducerReturn, PlayerReducerState } from './index.d';

const INITIAL_STATE: PlayerReducerState = {
  type: ''
};

const reducer = (state: PlayerReducerState = INITIAL_STATE, { type, payload }: TReducerReturn) => {
  switch (type) {
    case types.GET:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

export default reducer;
