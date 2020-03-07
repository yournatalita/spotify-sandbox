import * as types from './types';

import { IReducerReturn } from '../declarations.d';

const reducer = (state = {}, { type, payload }: IReducerReturn) => {
  switch (type) {
    case types.ARTISTS:
      return {
        ...state,
        ...payload,
        isLoaded: true
      };
    case types.TRACKS:
      return {
        ...state,
        ...payload,
        isLoaded: true
      };
    default:
      return state;
  }
};

export default reducer;
