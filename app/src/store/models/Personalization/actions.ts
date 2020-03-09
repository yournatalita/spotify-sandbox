import * as types from './types';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RecommendationsObject } from '@types/spotify-api';
import { IReducerReturn } from '../declarations.d';

const getPersonalizationArtists = (data: RecommendationsObject): IReducerReturn => ({
  type: types.ARTISTS,
  payload: {
    artists: data
  }
});

const getPersonalizationTracks = (data: RecommendationsObject): IReducerReturn => ({
  type: types.TRACKS,
  payload: {
    tracks: data
  }
});

const setArtistsChosen = (data: RecommendationsObject): IReducerReturn => ({
  type: types.ARTISTS_CHOSEN,
  payload: {
    checkedRange: data
  }
});

export { getPersonalizationArtists, getPersonalizationTracks, setArtistsChosen };
