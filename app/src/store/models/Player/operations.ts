import axios from 'axios';
import { Dispatch } from 'redux';
import { IRequest } from '../declarations';

import { TTrack } from './index.d';

import * as actions from './actions';

const play = (options: IRequest, track: TTrack) => (dispatch: Dispatch) => {
  const { params, data } = options;

  axios({
    url: 'api/play',
    method: 'put',
    params,
    data
  })
    .then(() => {
      dispatch(actions.playAction(track));
    })
    .catch(e => {
      console.error(e);
    });
};

export { play };
