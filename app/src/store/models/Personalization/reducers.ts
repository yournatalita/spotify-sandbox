import * as types from './types';

import { IReducerReturn } from '../declarations.d';

const reducer = (state = {}, { type, payload }: IReducerReturn) => {
  switch (type) {
    case types.ARTISTS:
      return {
        ...state,
        ...payload
      };
    case types.TRACKS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

export default reducer;
