import * as types from './types';

import { TReducerReturn, GlobalReducerState } from './index.d';

const INITIAL_STATE: GlobalReducerState = {
  type: ''
};

const reducer = (state: GlobalReducerState = INITIAL_STATE, { type, payload }: TReducerReturn) => {
  switch (type) {
    case types.PLAYED_TRACK:
      return {
        ...payload
      };
    case types.DEVICE_ID:
      return {
        ...payload
      };
    default:
      return state;
  }
};

export default reducer;
