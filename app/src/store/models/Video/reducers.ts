import * as types from './types';

import { TReducerReturn, PersonalizationReducerState } from './index.d';

const INITIAL_STATE: PersonalizationReducerState = {
  type: ''
};

const reducer = (
  state: PersonalizationReducerState = INITIAL_STATE,
  { type, payload }: TReducerReturn
) => {
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
    default:
      return state;
  }
};

export default reducer;
