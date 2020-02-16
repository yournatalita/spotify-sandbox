import * as types from './types';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RecommendationsObject } from '@types/spotify-api';
import { IReducerReturn } from '../declarations.d';

const getRecommendations = (data: RecommendationsObject): IReducerReturn => ({
  type: types.RECOMMENDATIONS,
  payload: {
    data
  }
});

export { getRecommendations };
