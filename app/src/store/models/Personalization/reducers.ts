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
    case types.ARTISTS:
      return {
        ...state,
        artists: {
          ...state.artists,
          ...payload.artists
        }
      };
    case types.TRACKS:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          ...payload.tracks
        }
      };
    case types.ARTISTS_CHOSEN:
      return {
        ...state,
        artists: {
          ...state.artists,
          ...payload
        }
      };
    case types.TRACKS_CHOSEN:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          ...payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
