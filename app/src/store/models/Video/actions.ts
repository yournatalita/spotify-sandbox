import * as types from './types';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Video } from './index.d';
import { IReducerReturn } from '../declarations.d';

const getTopVideo = (data: Video): IReducerReturn => ({
  type: types.GET_TOP,
  payload: {
    loaded: true,
    top: data
  }
});

const removeTopVideo = (): IReducerReturn => ({
  type: types.GET_TOP,
  payload: {
    loaded: false,
    top: null
  }
});

const getTopVideoTrack = (data: SpotifyApi.TrackObjectFull): IReducerReturn => ({
  type: types.GET_VIDEO_TRACK,
  payload: {
    track: data
  }
});

export { getTopVideo, removeTopVideo, getTopVideoTrack };
