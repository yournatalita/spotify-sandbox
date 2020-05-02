import * as types from './types';
import { ArtistProps } from './index.d';
import { IReducerReturn } from '../declarations.d';

const getArtistAction = (artist: ArtistProps): IReducerReturn => {
  return {
    type: types.GET,
    payload: {
      artist
    }
  };
};

export { getArtistAction };
