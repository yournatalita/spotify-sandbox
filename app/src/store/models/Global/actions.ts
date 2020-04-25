import * as types from './types';
import { DataProps } from './index.d';
import { IReducerReturn } from '../declarations.d';

const setPlayedTrackIdAction = (data: DataProps): IReducerReturn => {
  return {
    type: types.PLAYED_TRACK,
    payload: {
      ...data
    }
  };
};

const setDeviceIdAction = (data: DataProps): IReducerReturn => {
  return {
    type: types.DEVICE_ID,
    payload: {
      ...data
    }
  };
};

export { setPlayedTrackIdAction, setDeviceIdAction };
